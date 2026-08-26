import { dashboardMock } from "../mocks/dashboardMock";
import type { CompanyOption } from "../types";

export async function fetchCompanyOptions(): Promise<CompanyOption[]> {
  // TODO: サーバー API に差し替える（例: GET /api/companies）
  return dashboardMock.companyProgress.map((company) => ({
    id: company.id,
    name: company.name,
    stages: company.stages,
  }));
}
