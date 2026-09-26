"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { BandState, PinReadings, SensorResponse } from "@/types/sensor";
import { SoilBand } from "./components/soil-band";
import { WeftStrip } from "./components/weft-strip";
import { Selvedge, type DeviceClock } from "./components/selvedge";
import { Foot } from "./components/foot";
import { COPY } from "./copy";

const POLL_MS = 5000;

/** Soil moisture pins. v4, v5, v6 — the binding firmware pin map. */
const SOIL_PINS = ["v4", "v5", "v6"] as const;

type NumberMap = Record<string, number | null>;

/**
 * Read the device RTC out of pins v10-v15. Returns null unless every field is a
 * finite number inside its real range, so a partially-read clock is never shown
 * as a whole one.
 */
function toDeviceClock(readings: PinReadings | null): DeviceClock | null {
  if (!readings) return null;

  const { v10, v11, v12, v13, v14, v15 } = readings;

  const reported = [v10, v11, v12, v13, v14, v15];
  if (reported.some((value) => typeof value !== "number" || !Number.isFinite(value))) {
    return null;
  }

  const year = v10 as number;
  const month = v11 as number;
  const day = v12 as number;
  const hour = v13 as number;
  const minute = v14 as number;
  const second = v15 as number;

  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;
  if (hour < 0 || hour > 23) return null;
  if (minute < 0 || minute > 59) return null;
  if (second < 0 || second > 59) return null;

  return { year, month, day, hour, minute, second };
}

export default function Dashboard() {
  const [readings, setReadings] = useState<PinReadings | null>(null);
  const [settled, setSettled] = useState(false);
  const [live, setLive] = useState(false);

  /** Has this pin ever reported on this page? Drives drained vs unmeasured. */
  const [everReported, setEverReported] = useState<Record<string, boolean>>({});
  /** The last value each pin actually reported, kept only to draw a ghost. */
  const [lastGood, setLastGood] = useState<NumberMap>({});
  /** Stripes at or above this index arrived on the latest poll. */
  const [newFrom, setNewFrom] = useState<NumberMap>({});
  /** The One Flash Rule: a reading is sumatan for exactly one poll. */
  const [flashing, setFlashing] = useState<Record<string, boolean>>({});

  const previousSoil = useRef<NumberMap>({});
  const clockBase = useRef<{ second: number; at: number } | null>(null);
  const [interpolatedSecond, setInterpolatedSecond] = useState<number | null>(null);

  const poll = useCallback(async () => {
    try {
      const response = await fetch("/api/sensor-data", { cache: "no-store" });
      const body = (await response.json()) as SensorResponse;

      if (!body.success || !body.readings) {
        // The One Flash Rule: a flash expires whether or not the next poll
        // succeeds, so it always lasts exactly one poll and never lingers as a
        // false "just changed".
        setFlashing({});
        setLive(false);
        setSettled(true);
        return;
      }

      const next = body.readings;
      setReadings(next);
      setLive(true);
      setSettled(true);

      setEverReported((prev) => {
        const copy = { ...prev };
        for (const [pin, value] of Object.entries(next)) {
          if (typeof value === "number") copy[pin] = true;
        }
        return copy;
      });

      setLastGood((prev) => {
        const copy = { ...prev };
        for (const [pin, value] of Object.entries(next)) {
          if (typeof value === "number") copy[pin] = value;
        }
        return copy;
      });

      // The signature: a band grows by exactly the stripes the device reported
      // gaining. A falling value loses dye and animates nothing. The flash
      // marks a *change* between two readings, so the page's first reading is
      // never announced as a change and never opens in sumatan.
      const arrived: Record<string, boolean> = {};
      const from: NumberMap = {};
      for (const pin of SOIL_PINS) {
        const value = next[pin];
        const before = previousSoil.current[pin];
        from[pin] = typeof before === "number" ? before : 0;
        if (typeof before === "number" && typeof value === "number" && value !== before) {
          arrived[pin] = true;
        }
      }
      setNewFrom(from);
      setFlashing(arrived);
      previousSoil.current = { v4: next.v4 ?? null, v5: next.v5 ?? null, v6: next.v6 ?? null };

      if (typeof next.v15 === "number") {
        clockBase.current = { second: next.v15, at: Date.now() };
      }
    } catch {
      setFlashing({});
      setLive(false);
      setSettled(true);
    }
  }, []);

  useEffect(() => {
    // The first poll is deferred so the effect body itself never sets state.
    const kickoff = setTimeout(() => void poll(), 0);
    const interval = setInterval(() => void poll(), POLL_MS);
    return () => {
      clearTimeout(kickoff);
      clearInterval(interval);
    };
  }, [poll]);

  // The device seconds field is interpolated between polls, as the product
  // always has. It holds at 59 rather than rolling into a minute the device has
  // not reported yet. Interpolation happens off the render path, so the markup
  // the server sends and the markup the client first paints agree.
  useEffect(() => {
    const interval = setInterval(() => {
      const base = clockBase.current;
      setInterpolatedSecond(
        base ? Math.min(59, base.second + Math.floor((Date.now() - base.at) / 1000)) : null
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const baseClock = toDeviceClock(readings);

  const clock: DeviceClock | null =
    baseClock && interpolatedSecond !== null
      ? { ...baseClock, second: interpolatedSecond }
      : baseClock;

  const stateOf = useCallback(
    (pin: string): BandState => {
      const value = readings?.[pin];
      if (typeof value === "number") return "live";
      // everReported can only be set by a poll that reached a pin, so it implies
      // a settled page; the old `settled &&` conjunct was dead logic.
      if (everReported[pin]) return "drained";
      return "unmeasured";
    },
    [readings, everReported]
  );

  return (
    <div className="cloth">
      <div className="cloth-body">
        <Selvedge clock={clock} live={live} waiting={!settled} />

        <main>
          <h1 className="title">{COPY.title}</h1>

          {SOIL_PINS.map((pin, index) => {
            const value = readings?.[pin] ?? null;
            return (
              <SoilBand
                key={pin}
                index={index + 1}
                value={value}
                state={stateOf(pin)}
                ghost={lastGood[pin] ?? 0}
                newFrom={newFrom[pin] ?? 0}
                flash={Boolean(flashing[pin])}
                pending={!settled}
              />
            );
          })}

          <WeftStrip readings={readings} stateOf={stateOf} pending={!settled} />
        </main>

        <Foot />
      </div>
    </div>
  );
}
