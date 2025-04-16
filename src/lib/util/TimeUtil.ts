import { DateAndTime } from "../types/api";

/**
 * Converts a Date object to an ISO-8601 string (yyyy-MM-dd'T'HH:mm:ss.SSSZ).
 * @param date - The Date object to convert.
 * @returns The ISO-8601 formatted string.
 */
export function toISO8601(date: Date): DateAndTime {
  return date.toISOString();
}

/**
 * Converts an ISO-8601 string (yyyy-MM-dd'T'HH:mm:ss.SSSZ) to a Date object.
 * @param isoString - The ISO-8601 formatted string.
 * @returns The corresponding Date object.
 */
export function fromISO8601(isoString: DateAndTime): Date {
  return new Date(isoString);
}
