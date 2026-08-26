export function parseDueAt(dueAt: string): Date {
  return new Date(dueAt);
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

export function formatDateInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function calendarDayDiff(dueAt: string, now: Date): number {
  const dueDay = startOfDay(parseDueAt(dueAt));
  const today = startOfDay(now);
  return Math.round((dueDay.getTime() - today.getTime()) / 86_400_000);
}

export function formatDueTime(dueAt: string): string {
  const date = parseDueAt(dueAt);
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function formatDueDateTime(dueAt: string): string {
  const date = parseDueAt(dueAt);
  return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, "0")}/${String(date.getDate()).padStart(2, "0")} ${formatDueTime(dueAt)}`;
}

export function formatRelativeDueLabel(dueAt: string, now: Date): string {
  const diffDays = calendarDayDiff(dueAt, now);
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

export function formatDetailDue(dueAt: string, now: Date): string {
  return `${formatRelativeDueLabel(dueAt, now)} ${formatDueTime(dueAt)}`;
}

export function formatCountdown(dueAt: string, now: Date): string {
  const due = parseDueAt(dueAt);
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

export function detailDueTone(
  dueAt: string,
  now: Date,
  completed: boolean
): "overdue" | "today" | "later" {
  if (completed) {
    return "later";
  }
  const diff = calendarDayDiff(dueAt, now);
  if (diff < 0) {
    return "overdue";
  }
  if (diff === 0) {
    return "today";
  }
  return "later";
}

export function formatEstimatedMinutes(minutes: number): string {
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
