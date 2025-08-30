import { Box, Button, Stack, Text, Title } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { articlesSingleQueryOptions } from '../../../libs/tanstack-query';
import type { Article } from '../../../libs/tanstack-query/data';
import { ArticleEditForm } from './article-edit-form';

type Props = {
  articleId: number;
};

const ArticleView = ({ article }: { article: Article }) => {
  return (
    <Box>
      <Title>{article.title}</Title>
      <Text>{article.body}</Text>
    </Box>
  );
};

export const ArticleSingle = ({ articleId }: Props) => {
  const { data } = useSuspenseQuery(articlesSingleQueryOptions(articleId));

  const [isEditing, setIsEditing] = useState(false);

  const handleSuccess = () => {
    setIsEditing(false);
  };

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const handleClickCancel = () => {
    setIsEditing(false);
  };

  return (
    <Box>
      {isEditing ? (
        <Stack gap="md">
          <div>
            <Button color="gray" onClick={handleClickCancel} type="button">
              cancel
            </Button>
          </div>
          <ArticleEditForm
            article={data}
            onMutateOptimistic={handleSuccess}
            onSuccess={handleSuccess}
          />
        </Stack>
      ) : (
        <Stack gap="md">
          <div>
            <Button onClick={handleClickEdit} type="button">
              edit
            </Button>
          </div>
          <ArticleView article={data} />
        </Stack>
      )}
    </Box>
  );
};
