import { type AuthUser, authUserTypeEnum } from '../../features/auth/types/auth-user';

export interface Article {
  id: number;
  title: string;
  body: string;
}

interface Store {
  articles: Article[];
  authUsers: AuthUser[];
}

export const store: Store = {
  articles: [
    {
      id: 1,
      title: 'Article 1',
      body: 'Body 1',
    },
    {
      id: 2,
      title: 'Article 2',
      body: 'Body 2',
    },
    {
      id: 3,
      title: 'Article 3',
      body: 'Body 3',
    },
    {
      id: 4,
      title: 'Article 4',
      body: 'Body 4',
    },
    {
      id: 5,
      title: 'Article 5',
      body: 'Body 5',
    },
  ],
  authUsers: [
    {
      id: 'admin1',
      name: 'admin user name',
      email: 'admin@example.com',
      type: authUserTypeEnum.admin,
    },
    {
      id: 'normal1',
      name: 'normal1 user name',
      email: 'normal1@example.com',
      type: authUserTypeEnum.normal,
    },
    {
      id: 'normal2',
      name: 'normal2 user name',
      email: 'normal2@example.com',
      type: authUserTypeEnum.normal,
    },
  ],
};
