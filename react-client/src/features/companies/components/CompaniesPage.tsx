import { useMemo, useState } from "react";

import {
  filterCompanies,
  paginateCompanies,
  sortCompanies,
  summarizeCompanies,
  summarizeTabCounts,
} from "../companyQuery";
import { companiesMock } from "../mocks/companiesMock";
import type {
  CompanyFilterTab,
  CompanyItem,
  CompanyJobType,
  CompanySortOrder,
  CompanyStatus,
  CompanyTaskFilter,
} from "../types";
import * as styles from "./CompaniesPage.styles";
import { CompanyDetailPanel } from "./CompanyDetailPanel";
import { CompanyFilterBar } from "./CompanyFilterBar";
import { CompanyListSection } from "./CompanyListSection";
import { CompanySummaryCards } from "./CompanySummaryCards";
import { CompanyToolbar } from "./CompanyToolbar";

export function CompaniesPage() {
  const [companies] = useState<CompanyItem[]>(() => companiesMock);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>("company-1");
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<CompanyFilterTab>("all");
  const [jobType, setJobType] = useState<CompanyJobType | "all">("all");
  const [status, setStatus] = useState<CompanyStatus | "all">("all");
  const [taskFilter, setTaskFilter] = useState<CompanyTaskFilter>("all");
  const [sortOrder, setSortOrder] = useState<CompanySortOrder>("dueSoon");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const summary = useMemo(() => summarizeCompanies(companies), [companies]);
  const tabCounts = useMemo(() => summarizeTabCounts(companies), [companies]);

  const filtered = useMemo(
    () =>
      sortCompanies(
        filterCompanies(companies, {
          search,
          tab,
          jobType,
          status,
          taskFilter,
          sortOrder,
        }),
        sortOrder
      ),
    [companies, search, tab, jobType, status, taskFilter, sortOrder]
  );

  const paged = useMemo(
    () => paginateCompanies(filtered, page, pageSize),
    [filtered, page, pageSize]
  );

  const selectedCompany = selectedCompanyId
    ? (companies.find((company) => company.id === selectedCompanyId) ?? null)
    : null;

  const handleTabChange = (nextTab: CompanyFilterTab) => {
    setTab(nextTab);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handlePageSizeChange = (nextSize: number) => {
    setPageSize(nextSize);
    setPage(1);
  };

  return (
    <section className={styles.page}>
      <CompanyToolbar search={search} onSearchChange={handleSearchChange} />
      <CompanySummaryCards summary={summary} />
      <CompanyFilterBar
        tab={tab}
        tabCounts={tabCounts}
        onTabChange={handleTabChange}
        jobType={jobType}
        onJobTypeChange={(value) => {
          setJobType(value);
          setPage(1);
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value);
          setPage(1);
        }}
        taskFilter={taskFilter}
        onTaskFilterChange={(value) => {
          setTaskFilter(value);
          setPage(1);
        }}
        sortOrder={sortOrder}
        onSortChange={(value) => {
          setSortOrder(value);
          setPage(1);
        }}
      />
      <div className={styles.body}>
        <div className={styles.listPane}>
          <CompanyListSection
            companies={paged.items}
            selectedCompanyId={selectedCompany?.id ?? null}
            page={paged.page}
            pageSize={paged.pageSize}
            total={paged.total}
            totalPages={paged.totalPages}
            onSelect={setSelectedCompanyId}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
        <div className={styles.sidePane}>
          <CompanyDetailPanel
            company={selectedCompany}
            onClose={() => setSelectedCompanyId(null)}
          />
        </div>
      </div>
    </section>
  );
}
