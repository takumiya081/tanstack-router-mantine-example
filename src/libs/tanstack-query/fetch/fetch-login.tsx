import { mutationOptions, useMutation } from '@tanstack/react-query';
import type { AuthUser } from '../../../features/auth/types/auth-user';
import { setAuthSession } from '../auth-session-cookie';
import { store } from '../data';
import { ApiError } from '../errors';
import { useEnsureAuthUser } from './fetch-auth-user';

type Variables = {
  email: string;
  password: string;
};

function getAuthUser(email: string) {
  return store.authUsers.find((user) => user.email === email);
}

export const fetchLogin = (variables: Variables): Promise<AuthUser> => {
  const authUser = getAuthUser(variables.email);
  if (variables.password !== 'password' && !authUser) {
    return Promise.reject(new ApiError('Invalid email or password'));
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (authUser) {
        setAuthSession(authUser);

        resolve(authUser);
      } else {
        reject(new ApiError('Invalid email or password'));
      }
    }, 1000);
  });
};

export const loginMutationOptions = () =>
  mutationOptions({
    mutationKey: ['login'],
    mutationFn: fetchLogin,
  });

type UseLoginMutationOptions = Omit<
  ReturnType<typeof loginMutationOptions>,
  'mutationFn' | 'mutationKey' | 'onSuccess'
> & {
  onSuccess?: (authUser: AuthUser | null) => void;
};

export const useLoginMutation = (options: UseLoginMutationOptions) => {
  const ensureAuthUser = useEnsureAuthUser();

  return useMutation({
    ...loginMutationOptions(),
    onSuccess: async () => {
      const result = await ensureAuthUser();
      return options.onSuccess?.(result);
    },
  });
};
