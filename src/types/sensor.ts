/**
 * Pin readings as reported by the device.
 *
 * A `null` value means the pin did not report: the fetch failed, timed out, or
 * returned something that is not a finite number. `null` is deliberately never
 * coerced to `0`, because a transport failure and a real reading of zero are
 * different facts and the interface must be able to tell them apart.
 */
export type PinReadings = Record<string, number | null>;

export interface SensorResponse {
  success: boolean;
  /** Present when `success` is true. Missing pins are `null`, not absent. */
  readings?: PinReadings;
  /** When the route assembled this payload. */
  measuredAt: string;
  error?: string;
}

/**
 * The three states a countable band can be in.
 *
 * - `live`        the device reported a value on the latest poll
 * - `unmeasured`  the device did not report, and never has on this page
 *                 (rendered slack, in ash, carrying nothing)
 * - `drained`     the device reported before and has now stopped
 *                 (rendered drained, keeping only a ghost of the last dye)
 */
export type BandState = "live" | "unmeasured" | "drained";
