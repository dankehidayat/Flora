import { COPY, MONTHS } from "../copy";

export interface DeviceClock {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function stamp(clock: DeviceClock): string {
  return `${clock.day} ${MONTHS[clock.month - 1] ?? ""} ${clock.year} · ${pad(clock.hour)}:${pad(clock.minute)}:${pad(clock.second)}`;
}

interface SelvedgeProps {
  clock: DeviceClock | null;
  /** True when the last poll reached the pins. */
  live: boolean;
  /** True before the first poll has settled. */
  waiting: boolean;
}

/**
 * The selvedge: the cloth's own edge, carrying the product's name, the device's
 * own clock, and the weft's colour key. It is not a navbar and has no menu.
 *
 * The key has two states, not three. It used to have a third "waiting" state,
 * but before the first poll every band already reads "waiting" and its warp is
 * undyed, so the mark was repeating what the cloth said four lines below it.
 * Two states also let shape carry the meaning: a filled square when the pins
 * answered, a hollow one when they did not. The filled and hollow marks used to
 * sit within 1.07:1 of each other in tone, which in direct sun is the same
 * colour.
 */
export function Selvedge({ clock, live, waiting }: SelvedgeProps) {
  return (
    <header className="selvedge">
      <span className="selvedge-mark">{COPY.wordmark}</span>
      <span className="leader" aria-hidden="true" />
      <span
        className={live ? "tick tick--live" : "tick tick--idle"}
        role="img"
        aria-label={live ? COPY.connected : COPY.notConnected}
      />
      <span className="selvedge-clock" aria-hidden="true">
        {clock ? stamp(clock) : waiting ? COPY.waiting : COPY.clockUnavailable}
      </span>
      <span className="sr-only">
        {clock
          ? `Device time: ${stamp(clock)}.`
          : waiting
            ? "Waiting for the device."
            : "Device clock unavailable."}
      </span>
    </header>
  );
}
