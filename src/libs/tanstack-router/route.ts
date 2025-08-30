import { createRouter } from '@tanstack/react-router';
import type { AuthStore } from '../../features/auth/contexts/auth-user-provider';
import { routeTree } from '../../routeTree.gen';
import { queryClient } from '../tanstack-query/query-client';

// Create a new router instance
export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: 'intent',
  // Since we're using React Query, we don't want loader calls to ever be stale
  // This will ensure that the loader is always called when the route is preloaded or visited
  defaultPreloadStaleTime: 0,
  context: {
    queryClient,
    auth: undefined as unknown as AuthStore,
  },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
