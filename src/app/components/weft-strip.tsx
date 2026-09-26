import type { BandState } from "@/types/sensor";
import {
  AIR_CONDITIONS,
  ALTITUDE,
  absentSpoken,
  absentWording,
  type AirReadingCopy,
} from "../copy";

interface WeftStripProps {
  readings: Record<string, number | null> | null;
  stateOf: (pin: string) => BandState;
  /** True before the first poll has settled. */
  pending: boolean;
}

interface WeftRowProps {
  reading: AirReadingCopy;
  /** Row class, so the altitude row can differ by structure alone. */
  className: string;
  /** Value class, so each strip of the cloth steps down its own ladder. */
  valueClass: string;
  readings: Record<string, number | null> | null;
  stateOf: (pin: string) => BandState;
  pending: boolean;
}

function format(value: number, decimals: number): string {
  return value.toFixed(decimals);
}

/**
 * One reading on the leader grammar. Every row in the strip is this component,
 * so a row can never acquire an absent state, a fixed place, or a spoken form
 * that the rows around it do not have.
 */
function WeftRow({ reading, className, valueClass, readings, stateOf, pending }: WeftRowProps) {
  const { pin, label, unit, decimals } = reading;

  const value = readings?.[pin] ?? null;
  const state = stateOf(pin);
  const isLive = !pending && state === "live" && value !== null;
  const shown = isLive ? format(value!, decimals) : null;

  return (
    <div className={className}>
      <span className="label" aria-hidden="true">
        {label}
      </span>
      <span className="leader" aria-hidden="true" />
      {isLive ? (
        <span className={valueClass} aria-hidden="true">
          {shown}
          <span className="unit">{unit}</span>
        </span>
      ) : (
        <span className="value--absent" aria-hidden="true">
          {absentWording(state, pending)}
        </span>
      )}
      <span className="sr-only">
        {isLive ? `${label}: ${shown} ${unit}.` : absentSpoken(state, pending)}
      </span>
    </div>
  );
}

/**
 * The weft strip, woven in two lengths.
 *
 * First the three conditions of the air, packed tight and closed by a seam
 * heavier than any rule inside them: the boundary between the answer and the
 * context is one rule, in one place, in the tone that separates rather than
 * points.
 *
 * Then the altitude, alone below that group, carrying no rule under it and set
 * a rung down the value ladder in the quiet half of the measurement dye. The
 * page therefore descends — 39 for the soil, 21 for the air, 18 for the place,
 * 13 for the sign — and the eye is never asked to treat a fixed fact as a
 * fourth thing to judge.
 *
 * The strip states what the air is doing and where the device stands, never how
 * the transport is doing. It is not a scale: no thresholds, no verdicts, no
 * colour key for the soil. Kebom is not used here. And it is not a second copy
 * of the bands' absent machinery — it asks the shared copy module for its
 * wording, so the two strips cannot drift apart about the same instant.
 */
export function WeftStrip({ readings, stateOf, pending }: WeftStripProps) {
  return (
    <div className="weft">
      <div className="weft-group">
        {AIR_CONDITIONS.map((reading) => (
          <WeftRow
            key={reading.pin}
            reading={reading}
            className="weft-row"
            valueClass="value value--weft"
            readings={readings}
            stateOf={stateOf}
            pending={pending}
          />
        ))}
      </div>

      <WeftRow
        reading={ALTITUDE}
        className="weft-row alt-row"
        valueClass="value value--alt"
        readings={readings}
        stateOf={stateOf}
        pending={pending}
      />
    </div>
  );
}
