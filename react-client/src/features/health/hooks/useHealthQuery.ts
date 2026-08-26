import { useQuery } from "@tanstack/react-query";

import { fetchHealth, type HealthResponse } from "../api/healthApi";

export const healthQueryKey = ["health"] as const;

export function useHealthQuery() {
  return useQuery<HealthResponse, Error>({
    queryKey: healthQueryKey,
    queryFn: fetchHealth,
  });
}
