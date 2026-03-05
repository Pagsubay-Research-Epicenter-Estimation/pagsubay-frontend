"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export const ReactQueryClientProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            retry: 3,
            refetchOnWindowFocus: false,
            gcTime: 5 * 60 * 1000,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
