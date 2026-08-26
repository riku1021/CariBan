import { dashboardMock } from "../mocks/dashboardMock";
import type { DashboardData } from "../types";

export async function fetchDashboard(): Promise<DashboardData> {
  // TODO: サーバー API に差し替える（例: GET /api/dashboard）
  // 月カレンダー連携時は year/month をクエリに含め、queryKey も月単位にする
  // return apiClient.get<DashboardData>("/api/dashboard").then((response) => response.data);
  return dashboardMock;
}
