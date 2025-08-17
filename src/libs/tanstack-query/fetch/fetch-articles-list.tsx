import { queryOptions } from '@tanstack/react-query';
import { type Article, store } from '../data';

export function fetchArticlesList(): Promise<Article[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(store.articles);
    }, 3000);
  });
}

export function getArticlesListKey() {
  return ['articles'];
}

export const articlesListQueryOptions = () =>
  queryOptions({
    queryKey: getArticlesListKey(),
    queryFn: fetchArticlesList,
  });
