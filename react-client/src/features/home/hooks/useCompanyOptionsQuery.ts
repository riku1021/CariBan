import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useMemo } from "react";

import { fetchCompanyOptions } from "../api/companiesApi";
import { addedCompaniesAtom } from "../atoms/entriesAtoms";
import type { CompanyOption } from "../types";

export const companyOptionsQueryKey = ["companyOptions"] as const;

export function useCompanyOptionsQuery() {
  const query = useQuery<CompanyOption[], Error>({
    queryKey: companyOptionsQueryKey,
    queryFn: fetchCompanyOptions,
  });
  const addedCompanies = useAtomValue(addedCompaniesAtom);

  const data = useMemo(() => {
    const base = query.data ?? [];
    const addedOptions: CompanyOption[] = addedCompanies.map((company) => ({
      id: company.id,
      name: company.name,
      stages: company.stages,
    }));
    return [...addedOptions, ...base];
  }, [query.data, addedCompanies]);

  return {
    ...query,
    data,
  };
}
