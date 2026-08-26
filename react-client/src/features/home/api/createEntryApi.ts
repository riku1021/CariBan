import { toDateLabel } from "../dateLabel";
import {
  type CompanyProgress,
  type CreateCompanyInput,
  type CreateScheduleInput,
  type CreateTaskInput,
  SELECTION_STAGES,
  type TodayTask,
  type UpcomingSelection,
} from "../types";

export type CreatedTask = TodayTask;

export type CreatedSchedule = {
  selection: UpcomingSelection;
  calendarDate: string;
};

export type CreatedCompany = CompanyProgress;

function toInitials(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length <= 2) {
    return trimmed;
  }
  return trimmed.slice(0, 2);
}

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

export async function createCompany(input: CreateCompanyInput): Promise<CreatedCompany> {
  // TODO: サーバー API に差し替える（例: POST /api/companies）
  const stages = SELECTION_STAGES.map((stage) => ({ id: stage.id, label: stage.label }));
  const currentStageIndex = Math.max(
    0,
    stages.findIndex((stage) => stage.id === input.currentStageId)
  );

  return {
    id: `company-${crypto.randomUUID()}`,
    name: input.name.trim(),
    initials: toInitials(input.name),
    jobTitle: input.jobTitle,
    stages,
    currentStageIndex,
    lastUpdated: toDateLabel(input.appliedDate),
  };
}
