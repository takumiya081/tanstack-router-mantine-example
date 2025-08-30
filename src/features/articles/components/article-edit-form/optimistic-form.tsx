import { Button, Stack, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import type { Article } from '../../../../libs/tanstack-query/data';
import {
  articlesUpdateMutationOptions,
  getArticlesListKey,
  getArticlesSingleKey,
} from '../../../../libs/tanstack-query/fetch';

type Props = {
  article: Article;
  onMutate?: (variables: Article) => unknown | Promise<unknown>;
};

const useOptimisticUpdateArticlesCache = ({
  onMutate: onMutateCallback,
}: {
  onMutate?: (data: Article) => unknown | Promise<unknown>;
}) => {
  const queryClient = useQueryClient();

  const onMutate = async (variables: Article) => {
    queryClient.cancelQueries({ queryKey: getArticlesListKey() });
    queryClient.cancelQueries({ queryKey: getArticlesSingleKey(variables.id) });

    queryClient.setQueryData(getArticlesListKey(), (prev?: Article[]) => {
      return prev?.map((a) => (a.id === variables.id ? variables : a));
    });
    queryClient.setQueryData(getArticlesSingleKey(variables.id), variables);

    const notificationId = notifications.show({
      loading: true,
      title: `Updating article ${variables.id}`,
      message: `Updating article ${variables.id}`,
      autoClose: false,
      withCloseButton: false,
    });

    await onMutateCallback?.(variables);

    return {
      notificationId,
    };
  };

  const onSettled = (article: Article | undefined) => {
    if (!article) {
      return;
    }
    queryClient.invalidateQueries({ queryKey: getArticlesListKey() });
    queryClient.invalidateQueries({ queryKey: getArticlesSingleKey(article.id) });
  };

  return { onMutate, onSettled };
};

export const OptimisticForm = ({ article, onMutate }: Props) => {
  const [title, setTitle] = useState(article.title);
  const [body, setBody] = useState(article.body);

  const cacheUpdates = useOptimisticUpdateArticlesCache({ onMutate });

  const mutation = useMutation({
    ...articlesUpdateMutationOptions(),
    ...cacheUpdates,
    onError: (error, _, context) => {
      if (!context?.notificationId) {
        return;
      }
      notifications.update({
        id: context?.notificationId,
        loading: false,
        title: 'Error',
        message: error.message,
        color: 'red',
        autoClose: 3000,
      });
    },
    onSuccess: (_, variables, context) => {
      if (!context?.notificationId) {
        return;
      }
      notifications.update({
        id: context?.notificationId,
        loading: false,
        title: 'Success',
        message: `Article ${variables.id} updated`,
        color: 'green',
        autoClose: 3000,
      });
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTitle(e.target.value);
  };

  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBody(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate({
      id: article.id,
      title,
      body,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <TextInput label="Title" onChange={handleTitleChange} value={title} />
        <Textarea label="Body" onChange={handleBodyChange} value={body} />
        <Button color="green" loading={mutation.isPending} type="submit">
          Submit Optimistic
        </Button>
      </Stack>
    </form>
  );
};
