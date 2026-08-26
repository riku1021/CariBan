import { useQuery } from "@tanstack/react-query";

import { fetchCompanyOptions } from "../api/companiesApi";
import type { CompanyOption } from "../types";

export const companyOptionsQueryKey = ["companyOptions"] as const;

export function useCompanyOptionsQuery() {
  return useQuery<CompanyOption[], Error>({
    queryKey: companyOptionsQueryKey,
    queryFn: fetchCompanyOptions,
  });
}
