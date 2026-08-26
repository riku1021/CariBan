import { toDateLabel } from "../dateLabel";
import type { CreateScheduleInput, CreateTaskInput, TodayTask, UpcomingSelection } from "../types";

export type CreatedTask = TodayTask;

export type CreatedSchedule = {
  selection: UpcomingSelection;
  calendarDate: string;
};

export async function createTask(input: CreateTaskInput): Promise<CreatedTask> {
  // TODO: サーバー API に差し替える（例: POST /api/tasks）
  return {
    id: `task-${crypto.randomUUID()}`,
    title: input.title,
    companyName: input.companyName || "未設定",
    completed: false,
    time: input.time,
  };
}

export async function createSchedule(input: CreateScheduleInput): Promise<CreatedSchedule> {
  // TODO: サーバー API に差し替える（例: POST /api/schedules）
  return {
    selection: {
      id: `selection-${crypto.randomUUID()}`,
      dateLabel: toDateLabel(input.date),
      timeRange: `${input.startTime}-${input.endTime}`,
      title: input.title,
      companyName: input.companyName,
      kind: input.kind,
    },
    calendarDate: input.date,
  };
}
