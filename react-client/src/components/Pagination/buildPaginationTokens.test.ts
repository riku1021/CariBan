import { describe, expect, it } from "vitest";

import { buildPaginationTokens } from "./buildPaginationTokens";

describe("buildPaginationTokens", () => {
  it("少ないページ数はすべて列挙する", () => {
    expect(buildPaginationTokens(1, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("先頭付近は 1..5 ... last にする", () => {
    expect(buildPaginationTokens(1, 10)).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
  });

  it("末尾付近は 1 ... last-4..last にする", () => {
    expect(buildPaginationTokens(10, 10)).toEqual([1, "ellipsis", 6, 7, 8, 9, 10]);
  });

  it("中間は両側に省略記号を付ける", () => {
    expect(buildPaginationTokens(6, 10)).toEqual([1, "ellipsis", 5, 6, 7, "ellipsis", 10]);
  });
});
