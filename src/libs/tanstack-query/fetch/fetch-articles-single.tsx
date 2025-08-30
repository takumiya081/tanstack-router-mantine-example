import { queryOptions } from '@tanstack/react-query';
import { type Article, store } from '../data';
import { ApiError, NotFoundError } from '../errors';

const fetchArticlesSingle = (id: number): Promise<Article> => {
  const article = store.articles.find((article) => article.id === id);

  if (id === -100) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new ApiError('api error'));
      }, 3000);
    });
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (article) {
        resolve(article);
      } else {
        reject(new NotFoundError('Article not found'));
      }
    }, 3000);
  });
};

export function getArticlesSingleKey(id: number) {
  return ['articles', id] as const;
}

export const articlesSingleQueryOptions = (id: number) =>
  queryOptions({
    queryKey: getArticlesSingleKey(id),
    queryFn: () => fetchArticlesSingle(id),
  });
