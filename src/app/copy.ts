import type { BandState } from "@/types/sensor";

/**
 * Every user-facing string in Flora lives here.
 *
 * The interface language is plain English. It was Bahasa Indonesia until an
 * explicit user decision reversed the earlier commitment; the reversal is
 * recorded in PRODUCT.md rather than quietly applied.
 *
 * Keeping the copy in one module is not tidiness. The three bands and the four
 * weft rows all render the same three absent states, and when each strip carried
 * its own wording they drifted apart: during the first poll the bands said
 * "waiting" while the weft rows said "not measured", which is two different
 * claims about the same instant. One function now decides the wording, so the
 * strips cannot disagree.
 */

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const COPY = {
  wordmark: "Flora",
  title: "Soil and air",

  waiting: "Waiting…",
  clockUnavailable: "Device clock unavailable",

  connected: "Device connected",
  notConnected: "Device not connected",

  /**
   * The maker's mark at the hem. A kept brand commitment, reproduced verbatim:
   * the cloth is signed, not described, and the sign is all the foot carries.
   */
  attribution: "Flora • By Danke Hidayat",

  notFoundTitle: "Page not found",
  notFoundBody: "That address does not exist. The device reading is on the main page.",

  metadataDescription:
    "A live reading of soil and air from the field monitor. Only numbers the device actually read.",
} as const;

export interface AirReadingCopy {
  pin: string;
  label: string;
  unit: string;
  decimals: number;
}

/**
 * The three conditions of the air. They are peers of one another and nothing
 * else, and they are woven as a closed group.
 */
export const AIR_CONDITIONS: AirReadingCopy[] = [
  { pin: "v0", label: "Air temperature", unit: "°C", decimals: 1 },
  { pin: "v1", label: "Air humidity", unit: "%", decimals: 1 },
  { pin: "v2", label: "Air pressure", unit: "hPa", decimals: 0 },
];

/**
 * Altitude is woven apart from the air, and deliberately.
 *
 * It reads off the same sensor as pressure, but it is a property of *where the
 * device stands*, not a condition of the air, and it is the one reading on the
 * page that does not change between polls. Filing it as a fourth air condition
 * made a fixed fact about the installation look like a fourth thing to judge.
 * The interface says so with position and structure, never by softening the
 * number: a reading the device did report is shown as a reading.
 */
export const ALTITUDE: AirReadingCopy = { pin: "v3", label: "Altitude", unit: "m", decimals: 0 };

export function probeLabel(index: number): string {
  return `Soil ${index}`;
}

/**
 * The wording that stands in for a number the device is not reporting.
 *
 * `pending` is distinct from `unmeasured` on purpose: before the first poll we
 * have not asked yet, and saying "not measured" would claim the device had
 * already failed.
 */
export function absentWording(state: BandState, pending: boolean): string {
  if (pending) return "waiting";
  return state === "drained" ? "no longer reporting" : "not measured";
}

/** The same three facts, spoken. */
export function absentSpoken(state: BandState, pending: boolean): string {
  if (pending) return "Waiting for the device.";
  return state === "drained"
    ? "The device has stopped reporting."
    : "Not measured. The device did not report.";
}
