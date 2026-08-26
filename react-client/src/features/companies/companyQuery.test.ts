import { describe, expect, it } from "vitest";

import {
  filterCompanies,
  paginateCompanies,
  sortCompanies,
  summarizeCompanies,
  summarizeTabCounts,
} from "./companyQuery";
import type { CompanyItem, CompanyListQuery } from "./types";

function company(overrides: Partial<CompanyItem> & Pick<CompanyItem, "id">): CompanyItem {
  return {
    shortName: "Test",
    legalName: "株式会社Test",
    initials: "T",
    status: "inProcess",
    jobType: "backend",
    currentStage: "一次面接",
    stages: [
      { id: "apply", label: "応募" },
      { id: "document", label: "書類" },
      { id: "interview", label: "一次面接" },
      { id: "offer", label: "内定" },
    ],
    currentStageIndex: 2,
    nextAction: {
      title: "ES提出",
      dueLabel: "今日",
      scheduleLabel: "今日 18:00",
      urgency: "today",
    },
    hasOpenTask: true,
    applicationPath: "マイナビ",
    appliedAt: "2026/04/01",
    memo: "",
    homepageUrl: null,
    mypageUrl: null,
    ...overrides,
  };
}

const defaultQuery: CompanyListQuery = {
  search: "",
  tab: "all",
  jobType: "all",
  status: "all",
  taskFilter: "all",
  sortOrder: "updated",
};

describe("filterCompanies", () => {
  const companies = [
    company({ id: "1", shortName: "DeNA", status: "inProcess" }),
    company({ id: "2", shortName: "メルカリ", status: "recruiting", hasOpenTask: false }),
    company({ id: "3", shortName: "楽天", status: "offer", hasOpenTask: false, nextAction: null }),
  ];

  it("タブと検索で絞り込む", () => {
    expect(
      filterCompanies(companies, { ...defaultQuery, tab: "inProcess" }).map((item) => item.id)
    ).toEqual(["1"]);
    expect(
      filterCompanies(companies, { ...defaultQuery, search: "メルカ" }).map((item) => item.id)
    ).toEqual(["2"]);
    expect(
      filterCompanies(companies, { ...defaultQuery, taskFilter: "noTask" }).map((item) => item.id)
    ).toEqual(["2", "3"]);
  });
});

describe("sortCompanies / summarize", () => {
  it("期限近い順と件数集計", () => {
    const companies = [
      company({
        id: "a",
        shortName: "B社",
        nextAction: { title: "x", dueLabel: "あと3日", scheduleLabel: "金曜まで", urgency: "soon" },
      }),
      company({
        id: "b",
        shortName: "A社",
        nextAction: { title: "y", dueLabel: "今日", scheduleLabel: "今日 18:00", urgency: "today" },
      }),
    ];
    expect(sortCompanies(companies, "dueSoon").map((item) => item.id)).toEqual(["b", "a"]);
    expect(summarizeTabCounts(companies).all).toBe(2);
    expect(summarizeCompanies(companies).needsActionCount).toBe(2);
  });
});

describe("paginateCompanies", () => {
  it("ページ分割する", () => {
    const items = [1, 2, 3, 4, 5];
    expect(paginateCompanies(items, 2, 2)).toEqual({
      items: [3, 4],
      total: 5,
      page: 2,
      pageSize: 2,
      totalPages: 3,
    });
  });
});
