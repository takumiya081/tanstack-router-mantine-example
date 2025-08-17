export interface Article {
  id: number;
  title: string;
  body: string;
}

interface Store {
  articles: Article[];
}

export const store = {
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
} satisfies Store;
