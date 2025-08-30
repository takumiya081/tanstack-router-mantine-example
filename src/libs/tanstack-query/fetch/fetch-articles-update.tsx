import { mutationOptions } from '@tanstack/react-query';
import { type Article, store } from '../data';
import { ApiError, NotFoundError } from '../errors';

const fetchArticlesUpdate = (article: Article): Promise<Article> => {
  const targetArticle = store.articles.find(({ id }) => article.id === id);

  if (article.id === -100) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new ApiError('api error'));
      }, 3000);
    });
  }

  if (!targetArticle) {
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new NotFoundError('Article not found'));
      }, 3000);
    });
  }

  const newArticle = { ...targetArticle, ...article };

  store.articles = store.articles.map((a) => (a.id === article.id ? newArticle : a));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (article) {
        resolve(newArticle);
      } else {
        reject(new NotFoundError('Article not found'));
      }
    }, 3000);
  });
};

export const articlesUpdateMutationOptions = () =>
  mutationOptions({
    mutationKey: ['articles', 'update'],
    mutationFn: fetchArticlesUpdate,
  });
