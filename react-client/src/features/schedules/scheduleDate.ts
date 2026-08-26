export function parseAt(value: string): Date {
  return new Date(value);
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

export function calendarDayDiff(at: string, now: Date): number {
  const day = startOfDay(parseAt(at));
  const today = startOfDay(now);
  return Math.round((day.getTime() - today.getTime()) / 86_400_000);
}

export function formatClock(at: string): string {
  const date = parseAt(at);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function formatTimeRange(startsAt: string, endsAt: string): string {
  return `${formatClock(startsAt)}-${formatClock(endsAt)}`;
}

export function formatRelativeDayLabel(at: string, now: Date): string {
  const diffDays = calendarDayDiff(at, now);
  if (diffDays === 0) {
    return "今日";
  }
  if (diffDays === 1) {
    return "明日";
  }
  if (diffDays === -1) {
    return "昨日";
  }
  if (diffDays < 0) {
    return `${Math.abs(diffDays)}日前`;
  }
  return `あと${diffDays}日`;
}

export function formatDetailStart(startsAt: string, now: Date): string {
  return `${formatRelativeDayLabel(startsAt, now)} ${formatClock(startsAt)}`;
}

export function formatCountdown(startsAt: string, now: Date): string {
  const start = parseAt(startsAt);
  const diffMs = start.getTime() - now.getTime();
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

export function detailStartTone(
  startsAt: string,
  now: Date,
  completed: boolean
): "overdue" | "today" | "later" {
  if (completed) {
    return "later";
  }
  const diff = calendarDayDiff(startsAt, now);
  if (diff < 0) {
    return "overdue";
  }
  if (diff === 0) {
    return "today";
  }
  return "later";
}

export function durationMinutes(startsAt: string, endsAt: string): number {
  const minutes = Math.round((parseAt(endsAt).getTime() - parseAt(startsAt).getTime()) / 60_000);
  return Math.max(minutes, 0);
}

export function formatDurationMinutes(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}分`;
  }
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (rest === 0) {
    return `${hours}時間`;
  }
  return `${hours}時間${rest}分`;
}
