import { queriesStaleTime } from '@/constants/queriesStaleTime';
import {
  QueryClient,
  QueryClientConfig,
  defaultShouldDehydrateQuery,
  isServer,
} from '@tanstack/react-query';

const defaultQueryClientOptions: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: queriesStaleTime,
    },
    dehydrate: {
      shouldDehydrateQuery: (query) =>
        defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
    },
  },
};

let browserQueryClient: QueryClient;

export function getQueryClient() {
  const queryClient = new QueryClient(defaultQueryClientOptions);

  if (isServer) return queryClient;

  if (!browserQueryClient) browserQueryClient = queryClient;

  return browserQueryClient;
}
