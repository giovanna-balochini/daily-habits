export function formatDateKey(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getTodayKey(): string {
    return formatDateKey(new Date());
}
export function isSameDay(dateStr1: string, dateStr2: string): boolean {
  return formatDateKey(new Date(dateStr1)) === formatDateKey(new Date(dateStr2));
}

export function getYesterday(date: Date = new Date()): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - 1);
  return d;
}

export function getDayBefore(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 1);
  return formatDateKey(date);
}

export function isWeekdayIncluded(weekday: number, specificDays: number[]): boolean {
  return specificDays.includes(weekday);
}