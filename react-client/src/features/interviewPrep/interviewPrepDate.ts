export function parseScheduledAt(scheduledAt: string): Date {
  return new Date(scheduledAt);
}

export function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatLocalIso(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

export function atDay(now: Date, dayOffset: number, hour: number, minute: number): string {
  const date = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + dayOffset,
    hour,
    minute,
    0
  );
  return formatLocalIso(date);
}

export function calendarDayDiff(scheduledAt: string, now: Date): number {
  const dueDay = startOfDay(parseScheduledAt(scheduledAt));
  const today = startOfDay(now);
  return Math.round((dueDay.getTime() - today.getTime()) / 86_400_000);
}

export function formatClock(scheduledAt: string): string {
  const date = parseScheduledAt(scheduledAt);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

const WEEKDAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"] as const;

export function formatGroupDateHeading(scheduledAt: string, now: Date): string {
  const date = parseScheduledAt(scheduledAt);
  const diff = calendarDayDiff(scheduledAt, now);
  const datePart = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 (${WEEKDAY_LABELS[date.getDay()]})`;
  if (diff === 0) {
    return `今日 ${datePart}`;
  }
  if (diff === 1) {
    return `明日 ${datePart}`;
  }
  return datePart;
}

export function formatScheduleLabel(scheduledAt: string, now: Date): string {
  const diff = calendarDayDiff(scheduledAt, now);
  const time = formatClock(scheduledAt);
  if (diff === 0) {
    return `今日 ${time}`;
  }
  if (diff === 1) {
    return `明日 ${time}`;
  }
  const date = parseScheduledAt(scheduledAt);
  return `${date.getMonth() + 1}/${date.getDate()} ${time}`;
}

export function formatCountdown(scheduledAt: string, now: Date): string {
  const due = parseScheduledAt(scheduledAt);
  const diffMs = due.getTime() - now.getTime();
  if (diffMs < 0) {
    const overdueMin = Math.floor(Math.abs(diffMs) / 60_000);
    if (overdueMin < 60) {
      return `${overdueMin}分超過`;
    }
    const hours = Math.floor(overdueMin / 60);
    if (hours < 24) {
      return `${hours}時間超過`;
    }
    return `${Math.floor(hours / 24)}日超過`;
  }
  const minutes = Math.floor(diffMs / 60_000);
  if (minutes < 60) {
    return `あと${Math.max(minutes, 1)}分`;
  }
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    const rest = minutes % 60;
    return rest === 0 ? `あと${hours}時間` : `あと${hours}時間${rest}分`;
  }
  return `あと${Math.floor(hours / 24)}日`;
}

export function prepPercent(item: {
  commonDone: number;
  commonTotal: number;
  companyDone: number;
  companyTotal: number;
}): number {
  const total = item.commonTotal + item.companyTotal;
  if (total === 0) {
    return 0;
  }
  return Math.round(((item.commonDone + item.companyDone) / total) * 100);
}
