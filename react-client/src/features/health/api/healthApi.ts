import { apiClient } from "@/lib/api/axiosClient";

export type HealthResponse = {
  status: string;
  timestamp: string;
};

export async function fetchHealth(): Promise<HealthResponse> {
  const { data } = await apiClient.get<HealthResponse>("/health");
  return data;
}
