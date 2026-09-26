import type { BandState } from "@/types/sensor";

/** Ten decades of ten: one stripe is one percentage point, exactly. */
const DECADES = 10;
const PER_DECADE = 10;

interface WarpRunProps {
  /** Stripes dyed on the latest poll. Only meaningful when `state` is live. */
  dyed: number;
  state: BandState;
  /** How far the cloth was last dyed, used for the drain ghost. */
  ghost: number;
  /** Stripes at or above this index arrived on this poll and settle in. */
  newFrom: number;
}

/**
 * The countable band. The run is decorative for assistive technology: the
 * value is always also present as real text, so nothing is counted by eye only.
 */
export function WarpRun({ dyed, state, ghost, newFrom }: WarpRunProps) {
  const warpClass =
    state === "unmeasured" ? "warp warp--slack" : state === "drained" ? "warp warp--drained" : "warp";

  const decades = Array.from({ length: DECADES }, (_, decade) => decade);

  return (
    <div className={warpClass} aria-hidden="true">
      {decades.map((decade) => (
        <div className="decade" key={decade}>
          {Array.from({ length: PER_DECADE }, (_, slot) => {
            const index = decade * PER_DECADE + slot;

            if (state === "unmeasured") {
              return <span className="stripe" key={index} />;
            }

            if (state === "drained") {
              return index < ghost ? (
                <span className="stripe stripe--ghost" key={index} />
              ) : (
                <span className="stripe" key={index} />
              );
            }

            const isDyed = index < dyed;
            if (!isDyed) return <span className="stripe" key={index} />;

            const isNew = index >= newFrom;
            return (
              <span
                className={isNew ? "stripe stripe--dyed stripe--new" : "stripe stripe--dyed"}
                key={index}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
