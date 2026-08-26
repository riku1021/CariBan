import "@/styles/index.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { QueryClientAtomProvider } from "jotai-tanstack-query/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { useThemeManager } from "@/hooks/useThemeManager";
import { createAppQueryClient } from "@/lib/query/queryClient";
import { routeTree } from "@/routeTree.gen";

const queryClient = createAppQueryClient();
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }

  interface StaticDataRouteOption {
    title?: string;
  }
}

const App = () => {
  useThemeManager();

  return (
    <>
      <RouterProvider router={router} />
      {import.meta.env.DEV ? (
        <>
          <TanStackRouterDevtools router={router} position="bottom-right" />
          <ReactQueryDevtools buttonPosition="bottom-left" />
        </>
      ) : null}
    </>
  );
};

const rootEl = document.getElementById("root");
if (!rootEl) {
  throw new Error("Root element #root not found");
}

createRoot(rootEl).render(
  <StrictMode>
    <QueryClientAtomProvider client={queryClient}>
      <App />
    </QueryClientAtomProvider>
  </StrictMode>
);
