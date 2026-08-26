import { useQuery } from "@tanstack/react-query";

import { fetchDashboard } from "../api/dashboardApi";
import type { DashboardData } from "../types";

export const dashboardQueryKey = ["dashboard"] as const;

export function useDashboardQuery() {
  return useQuery<DashboardData, Error>({
    queryKey: dashboardQueryKey,
    queryFn: fetchDashboard,
  });
}
