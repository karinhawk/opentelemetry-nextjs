export function caclulateTimeFromString(time: string): string {
  return new Date(Date.parse(time)).toLocaleTimeString("en-GB");
}

export function findTimeDifference(startDate: number, endDate: number): number {
  const millis = Math.abs(endDate - startDate);
  const diff = Math.floor(millis / (1000 * 60));

  return diff;
}
