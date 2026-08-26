import type {
  CompanyFilterTab,
  CompanyItem,
  CompanyListQuery,
  CompanySortOrder,
  CompanySummary,
  NextActionUrgency,
} from "./types";

const URGENCY_RANK: Record<NextActionUrgency, number> = {
  today: 0,
  soon: 1,
  later: 2,
  none: 3,
};

function matchesTab(company: CompanyItem, tab: CompanyFilterTab): boolean {
  if (tab === "all") {
    return true;
  }
  return company.status === tab;
}

export function filterCompanies(companies: CompanyItem[], query: CompanyListQuery): CompanyItem[] {
  const keyword = query.search.trim().toLowerCase();
  return companies.filter((company) => {
    if (
      keyword !== "" &&
      !company.shortName.toLowerCase().includes(keyword) &&
      !company.legalName.toLowerCase().includes(keyword) &&
      !company.currentStage.toLowerCase().includes(keyword)
    ) {
      return false;
    }
    if (!matchesTab(company, query.tab)) {
      return false;
    }
    if (query.jobType !== "all" && company.jobType !== query.jobType) {
      return false;
    }
    if (query.status !== "all" && company.status !== query.status) {
      return false;
    }
    if (query.taskFilter === "hasTask" && !company.hasOpenTask) {
      return false;
    }
    if (query.taskFilter === "noTask" && company.hasOpenTask) {
      return false;
    }
    return true;
  });
}

export function sortCompanies(companies: CompanyItem[], order: CompanySortOrder): CompanyItem[] {
  return [...companies].sort((left, right) => {
    if (order === "name") {
      return left.shortName.localeCompare(right.shortName, "ja");
    }
    if (order === "dueSoon") {
      const leftRank = left.nextAction ? URGENCY_RANK[left.nextAction.urgency] : 99;
      const rightRank = right.nextAction ? URGENCY_RANK[right.nextAction.urgency] : 99;
      if (leftRank !== rightRank) {
        return leftRank - rightRank;
      }
      return left.shortName.localeCompare(right.shortName, "ja");
    }
    return right.id.localeCompare(left.id);
  });
}

export function summarizeTabCounts(companies: CompanyItem[]): Record<CompanyFilterTab, number> {
  return {
    all: companies.length,
    inProcess: companies.filter((company) => company.status === "inProcess").length,
    recruiting: companies.filter((company) => company.status === "recruiting").length,
    offer: companies.filter((company) => company.status === "offer").length,
    closed: companies.filter((company) => company.status === "closed").length,
  };
}

export function summarizeCompanies(companies: CompanyItem[]): CompanySummary {
  const needsActionCount = companies.filter(
    (company) =>
      company.nextAction !== null &&
      (company.nextAction.urgency === "today" || company.nextAction.urgency === "soon")
  ).length;

  return {
    inProcessCount: companies.filter((company) => company.status === "inProcess").length,
    inProcessChange: { value: 2, direction: "up" },
    recruitingCount: companies.filter((company) => company.status === "recruiting").length,
    recruitingChange: { value: 1, direction: "down" },
    offerCount: companies.filter((company) => company.status === "offer").length,
    offerChange: { value: 0, direction: "flat" },
    needsActionCount,
    needsActionChange: { value: 1, direction: "up" },
  };
}

export function listJobTypes(companies: CompanyItem[]): CompanyItem["jobType"][] {
  return [...new Set(companies.map((company) => company.jobType))].sort((left, right) =>
    left.localeCompare(right)
  );
}

export function paginateCompanies<T>(
  items: T[],
  page: number,
  pageSize: number
): { items: T[]; total: number; page: number; pageSize: number; totalPages: number } {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    total,
    page: safePage,
    pageSize,
    totalPages,
  };
}
