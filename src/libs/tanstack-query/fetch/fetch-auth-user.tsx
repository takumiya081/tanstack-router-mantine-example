import { queryOptions, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import type { AuthUser } from '../../../features/auth/types/auth-user';
import { getAuthSession } from '../auth-session-cookie';
import { store } from '../data';
import { ApiError } from '../errors';

function getAuthUser(userId: string) {
  return store.authUsers.find((user) => user.id === userId);
}

const fetchAuthUser = (): Promise<AuthUser> => {
  // biome-ignore lint/suspicious/noConsole: for debug
  console.log('call fetchAuthUser');
  const userId = getAuthSession();

  if (!userId) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new ApiError('unauthorized'));
      }, 1000);
    });
  }

  const authUser = getAuthUser(userId);
  if (!authUser) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new ApiError('unauthorized'));
      }, 1000);
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(authUser);
    }, 1000);
  });
};

export function getAuthUserKey() {
  return ['auth-user'] as const;
}

export const authUserQueryOptions = () =>
  queryOptions({
    queryKey: getAuthUserKey(),
    queryFn: fetchAuthUser,
    // By default, TanStack Query retries 3 times on HTTP errors such as unauthorized, so we disable retries here.
    retry: false,
  });

export const useEnsureAuthUser = () => {
  const queryClient = useQueryClient();

  const ensureAuthUser = useCallback(async () => {
    try {
      return await queryClient.ensureQueryData(authUserQueryOptions());
    } catch (_) {
      return null;
    }
  }, [queryClient]);

  return ensureAuthUser;
};
