import type { BandState } from "@/types/sensor";
import { absentSpoken, absentWording, probeLabel } from "../copy";
import { WarpRun } from "./warp-run";

interface SoilBandProps {
  index: number;
  /** The measured percentage, or null when the device did not report. */
  value: number | null;
  state: BandState;
  /** The last value the device did report, kept only to drain a ghost. */
  ghost: number;
  /** Stripes at or above this index arrived on this poll. */
  newFrom: number;
  /** True on the one poll after this reading changed. */
  flash: boolean;
  /** True before the first poll has settled: the cloth is undyed, not slack. */
  pending: boolean;
}

function spoken(index: number, value: number | null, state: BandState, pending: boolean): string {
  if (pending) return `${probeLabel(index)}: waiting for the device.`;
  if (state === "live" && value !== null) return `${probeLabel(index)}: ${value} percent.`;
  return `${probeLabel(index)}: ${absentSpoken(state, pending)}`;
}

/**
 * One probe. Three of these are peers: same band height, same value size, same
 * label size, in the same order every poll. None is a hero and two are not
 * filler.
 */
export function SoilBand({ index, value, state, ghost, newFrom, flash, pending }: SoilBandProps) {
  const isLive = !pending && state === "live" && value !== null;

  return (
    <section className="band">
      <div className="band-head">
        <span className="label" aria-hidden="true">
          {probeLabel(index)}
        </span>
        <span className="leader" aria-hidden="true" />
        {isLive ? (
          <span
            className={flash ? "value value--soil value--flash" : "value value--soil"}
            aria-hidden="true"
          >
            {value}
            <span className="unit">%</span>
          </span>
        ) : (
          <span className="value--absent" aria-hidden="true">
            {absentWording(state, pending)}
          </span>
        )}
      </div>

      {/*
        While waiting the warp is simply undyed: nothing is claimed and nothing
        is counted. An undyed run and a run of zero dyed stripes are the same
        thing, so passing dyed 0 is all it takes — the earlier `newFrom={101}`
        was a magic number standing in for a fact the maths already had.
      */}
      <WarpRun dyed={isLive ? value : 0} state={pending ? "live" : state} ghost={ghost} newFrom={newFrom} />

      <p className="sr-only">{spoken(index, value, state, pending)}</p>
    </section>
  );
}
