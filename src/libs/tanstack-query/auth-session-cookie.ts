import Cookies from 'js-cookie';
import type { AuthUser } from '../../features/auth/types/auth-user';

const key = 'auth-session';

export const getAuthSession = () => {
  return Cookies.get(key);
};

export const setAuthSession = (authUser: AuthUser) => {
  Cookies.set(key, authUser.id);
};

export const removeAuthSession = () => {
  Cookies.remove(key);
};
