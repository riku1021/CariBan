import { cx } from "@/styled-system/css";

import * as styles from "./SelectionStageStepper.styles";
import {
  railFillPercent,
  type SelectionStage,
  stepAlign,
  stepState,
} from "./selectionStageStepperUtils";

type SelectionStageStepperProps = {
  stages: SelectionStage[];
  currentStageIndex: number;
  className?: string;
};

export function SelectionStageStepper({
  stages,
  currentStageIndex,
  className,
}: SelectionStageStepperProps) {
  const stageCount = stages.length;

  return (
    <div className={cx(styles.stepper, className)}>
      <div className={styles.rail} aria-hidden="true">
        <span className={styles.railBase} />
        <span
          className={styles.railFill}
          style={{ width: `${railFillPercent(currentStageIndex, stageCount)}%` }}
        />
      </div>
      <div className={styles.steps}>
        {stages.map((stage, index) => {
          const state = stepState(index, currentStageIndex);
          return (
            <div key={stage.id} className={styles.step({ align: stepAlign(index, stageCount) })}>
              <span className={styles.stepDot({ state })} aria-hidden="true" />
              <span className={styles.stepLabel}>{stage.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
