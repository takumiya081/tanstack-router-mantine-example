import { Button, Stack, Textarea, TextInput } from '@mantine/core';
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
  onSuccess: (data: Article, variables: Article) => unknown | Promise<unknown>;
};

export const NormalForm = ({ article, onSuccess }: Props) => {
  const [title, setTitle] = useState(article.title);
  const [body, setBody] = useState(article.body);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...articlesUpdateMutationOptions(),
    onSuccess,
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: getArticlesListKey() });
      queryClient.invalidateQueries({ queryKey: getArticlesSingleKey(article.id) });
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
        <Button loading={mutation.isPending} type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
};
