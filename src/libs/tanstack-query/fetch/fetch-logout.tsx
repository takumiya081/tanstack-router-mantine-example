import { notifications } from '@mantine/notifications';
import { mutationOptions, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAuthSession, removeAuthSession } from '../auth-session-cookie';
import { store } from '../data';
import { ApiError } from '../errors';
import { getAuthUserKey } from './fetch-auth-user';

function getAuthUser(userId: string) {
  return store.authUsers.find((user) => user.id === userId);
}

export const fetchLogout = (): Promise<void> => {
  const userId = getAuthSession();

  if (!userId) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new ApiError('unauthorized'));
      }, 3000);
    });
  }

  const authUser = getAuthUser(userId);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (authUser) {
        removeAuthSession();

        resolve();
      } else {
        reject(new ApiError('Invalid email or password'));
      }
    }, 1000);
  });
};

export const logoutMutationOptions = () =>
  mutationOptions({
    mutationKey: ['logout'],
    mutationFn: fetchLogout,
  });

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...logoutMutationOptions(),
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: error.message,
        color: 'red',
      });
    },
    onSuccess: async () => {
      // set null to auth user key to invalidate the auth user query
      await queryClient.setQueryData(getAuthUserKey(), null);
    },
  });
};
