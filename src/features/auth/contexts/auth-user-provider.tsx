import { useQuery } from '@tanstack/react-query';
import { createContext, useCallback, useContext, useEffect, useMemo } from 'react';
import { match, P } from 'ts-pattern';
import {
  authUserQueryOptions,
  useEnsureAuthUser,
} from '../../../libs/tanstack-query/fetch/fetch-auth-user';
import type { AuthUser } from '../types/auth-user';

const authStateEnum = {
  pending: 'pending',
  authenticated: 'authenticated',
  unauthenticated: 'unauthenticated',
} as const;

type AuthState =
  | {
      status: typeof authStateEnum.pending;
      authUser: undefined;
    }
  | {
      status: typeof authStateEnum.authenticated;
      authUser: AuthUser;
    }
  | {
      status: typeof authStateEnum.unauthenticated;
      authUser: undefined;
    };

export interface AuthStore {
  state: AuthState;
  actions: {
    ensureAuthUser: () => Promise<AuthUser | null>;
    refetchAuthUser: () => Promise<void>;
  };
}

const AuthContext = createContext<AuthStore | undefined>(undefined);

type Props = {
  /**
   * A hook to perform actions (such as invalidating the router) when the user changes.
   */
  onAuthUserChange?: (authUser: AuthUser | null) => void;
  children: React.ReactNode;
};

export const AuthUserProvider = ({ children, onAuthUserChange }: Props) => {
  const authUserQuery = useQuery({
    ...authUserQueryOptions(),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    onAuthUserChange?.(authUserQuery.data ?? null);
  }, [authUserQuery.data, onAuthUserChange]);

  const stateValue = useMemo((): AuthState => {
    return (
      match(authUserQuery)
        .with({ status: 'pending' }, () => ({
          status: authStateEnum.pending,
          authUser: undefined,
        }))
        // If null is set via setQueryData, treat it as unauthenticated
        .with({ status: 'success', data: P.nullish }, () => ({
          status: authStateEnum.unauthenticated,
          authUser: undefined,
        }))
        .with({ status: 'success', data: P.nonNullable }, ({ data }) => ({
          status: authStateEnum.authenticated,
          authUser: data,
        }))
        .with({ status: 'error' }, () => ({
          status: authStateEnum.unauthenticated,
          authUser: undefined,
        }))
        .exhaustive()
    );
  }, [authUserQuery]);

  const ensureAuthUser = useEnsureAuthUser();
  const refetchAuthUser = useCallback(async () => {
    await authUserQuery.refetch();
  }, [authUserQuery]);

  const value = useMemo(
    (): AuthStore => ({
      state: stateValue,
      actions: {
        ensureAuthUser,
        refetchAuthUser,
      },
    }),
    [stateValue, ensureAuthUser, refetchAuthUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthUserStore = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const useAuthUser = () => {
  const store = useAuthUserStore();

  if (store.state.status !== 'authenticated') {
    throw new Error('useAuthUser must be used within an authenticated user');
  }

  return store.state.authUser;
};
