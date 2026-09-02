export type SelectionStage = {
  id: string;
  label: string;
};

export type StepState = "done" | "current" | "todo";

export type StepAlign = "start" | "center" | "end";

export function stepState(index: number, currentStageIndex: number): StepState {
  if (index < currentStageIndex) {
    return "done";
  }
  if (index === currentStageIndex) {
    return "current";
  }
  return "todo";
}

export function railFillPercent(currentStageIndex: number, stageCount: number): number {
  if (stageCount <= 1) {
    return currentStageIndex >= 0 ? 100 : 0;
  }
  if (currentStageIndex <= 0) {
    return 0;
  }
  if (currentStageIndex >= stageCount - 1) {
    return 100;
  }
  // flex:1 のセル中央にドットがあるため、等間隔 (i / (n-1)) ではなく (i + 0.5) / n
  return ((currentStageIndex + 0.5) / stageCount) * 100;
}

export function stepAlign(index: number, stageCount: number): StepAlign {
  if (stageCount <= 1) {
    return "center";
  }
  if (index === 0) {
    return "start";
  }
  if (index === stageCount - 1) {
    return "end";
  }
  return "center";
}
