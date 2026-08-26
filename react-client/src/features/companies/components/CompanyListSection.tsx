import type { KeyboardEvent, MouseEvent } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaFileAlt, FaGlobe } from "react-icons/fa";

import { Pagination } from "@/components/Pagination";

import { COMPANY_JOB_TYPE_LABELS, COMPANY_STATUS_LABELS, type CompanyItem } from "../types";
import * as styles from "./CompanyListSection.styles";

type CompanyListSectionProps = {
  companies: CompanyItem[];
  selectedCompanyId: string | null;
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
  onSelect: (companyId: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
};

function stopRowSelect(event: MouseEvent | KeyboardEvent) {
  event.stopPropagation();
}

export function CompanyListSection({
  companies,
  selectedCompanyId,
  page,
  pageSize,
  total,
  totalPages,
  onSelect,
  onPageChange,
  onPageSizeChange,
}: CompanyListSectionProps) {
  const start = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <section className={styles.panel}>
      {companies.length === 0 ? (
        <p className={styles.empty}>該当する企業はありません</p>
      ) : (
        <>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th scope="col" className={styles.thCompany}>
                    企業
                  </th>
                  <th scope="col" className={styles.thStatus}>
                    状況
                  </th>
                  <th scope="col" className={styles.thJob}>
                    職種
                  </th>
                  <th scope="col" className={styles.th}>
                    次のアクション
                  </th>
                  <th scope="col" className={styles.thLinks}>
                    リンク
                  </th>
                </tr>
              </thead>
              <tbody>
                {companies.map((company) => {
                  const selected = company.id === selectedCompanyId;
                  return (
                    <tr
                      key={company.id}
                      className={styles.row}
                      aria-selected={selected}
                      tabIndex={0}
                      onClick={() => onSelect(company.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          onSelect(company.id);
                        }
                      }}
                    >
                      <td className={styles.tdCompany({ selected })}>
                        <div className={styles.info}>
                          <span className={styles.companyMark} aria-hidden="true">
                            {company.initials.slice(0, 2)}
                          </span>
                          <span className={styles.shortName}>{company.shortName}</span>
                        </div>
                      </td>
                      <td className={styles.td({ selected })}>
                        <span className={styles.statusBadge({ status: company.status })}>
                          {COMPANY_STATUS_LABELS[company.status]}
                        </span>
                      </td>
                      <td className={styles.td({ selected })}>
                        <span className={styles.jobBadge}>
                          {COMPANY_JOB_TYPE_LABELS[company.jobType]}
                        </span>
                      </td>
                      <td className={styles.td({ selected })}>
                        {company.nextAction ? (
                          <div className={styles.actionCell}>
                            <p className={styles.actionTitle}>{company.nextAction.title}</p>
                            <p
                              className={styles.actionDue({ urgency: company.nextAction.urgency })}
                            >
                              {company.nextAction.dueLabel}
                            </p>
                          </div>
                        ) : (
                          <p className={styles.actionEmpty}>なし</p>
                        )}
                      </td>
                      <td
                        className={styles.tdLinks({ selected })}
                        onClick={stopRowSelect}
                        onKeyDown={stopRowSelect}
                      >
                        <div className={styles.linkRow}>
                          <button
                            type="button"
                            className={styles.iconButton}
                            aria-label="企業HP"
                            disabled={!company.homepageUrl}
                          >
                            <FaGlobe aria-hidden="true" />
                          </button>
                          <button
                            type="button"
                            className={styles.iconButton}
                            aria-label="マイページ"
                            disabled={!company.mypageUrl}
                          >
                            <FaFileAlt aria-hidden="true" />
                          </button>
                          <button type="button" className={styles.iconButton} aria-label="その他">
                            <BsThreeDotsVertical aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className={styles.pagination}>
            <p className={styles.paginationMeta}>
              {start}-{end} / {total}件を表示
            </p>
            <Pagination page={page} totalPages={totalPages} onPageChange={onPageChange} />
            <select
              className={styles.pageSizeSelect}
              aria-label="表示件数"
              value={pageSize}
              onChange={(event) => onPageSizeChange(Number(event.target.value))}
            >
              <option value={5}>表示件数 5件</option>
              <option value={10}>表示件数 10件</option>
              <option value={20}>表示件数 20件</option>
            </select>
          </div>
        </>
      )}
    </section>
  );
}
