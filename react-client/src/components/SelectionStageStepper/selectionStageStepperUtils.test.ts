import { describe, expect, it } from "vitest";

import { railFillPercent, stepAlign, stepState } from "./selectionStageStepperUtils";

describe("stepState", () => {
  it("returns done, current, and todo based on currentStageIndex", () => {
    expect(stepState(0, 2)).toBe("done");
    expect(stepState(1, 2)).toBe("done");
    expect(stepState(2, 2)).toBe("current");
    expect(stepState(3, 2)).toBe("todo");
  });
});

describe("railFillPercent", () => {
  it("returns edge values for single stage and boundaries", () => {
    expect(railFillPercent(0, 1)).toBe(100);
    expect(railFillPercent(0, 4)).toBe(0);
    expect(railFillPercent(3, 4)).toBe(100);
  });

  it("uses centered-dot formula for middle stages", () => {
    expect(railFillPercent(1, 4)).toBe(37.5);
    expect(railFillPercent(2, 4)).toBe(62.5);
  });
});

describe("stepAlign", () => {
  it("aligns first, middle, and last steps", () => {
    expect(stepAlign(0, 4)).toBe("start");
    expect(stepAlign(1, 4)).toBe("center");
    expect(stepAlign(3, 4)).toBe("end");
    expect(stepAlign(0, 1)).toBe("center");
  });
});
