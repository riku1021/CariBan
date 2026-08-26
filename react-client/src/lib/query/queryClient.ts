import { QueryClient } from "@tanstack/react-query";

/**
 * アプリ全体で共有する QueryClient ファクトリ。
 */
export function createAppQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
        refetchOnWindowFocus: import.meta.env.PROD,
      },
    },
  });
}
