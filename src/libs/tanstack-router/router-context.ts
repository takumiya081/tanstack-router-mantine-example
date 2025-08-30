import type { QueryClient } from '@tanstack/react-query';
import type { AuthStore } from '../../features/auth/contexts/auth-user-provider';

export interface RouterContext {
  queryClient: QueryClient;
  auth: AuthStore;
}
