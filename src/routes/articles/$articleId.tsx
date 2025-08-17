import { Alert, Box, Skeleton, Stack } from '@mantine/core';
import {
  createFileRoute,
  type ErrorComponentProps,
  notFound,
  PathParamError,
} from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { ArticleSingle } from '../../features/articles/components/article-single';
import { articlesSingleQueryOptions } from '../../libs/tanstack-query';
import { ApiError, NotFoundError } from '../../libs/tanstack-query/errors';

const paramsSchema = z.object({
  articleId: z.coerce.number(),
});

const RouteComponent = ({ articleId }: { articleId: number }) => {
  return (
    <Box>
      <ArticleSingle articleId={articleId} />
    </Box>
  );
};

const ErrorComponent = ({ error }: ErrorComponentProps) => {
  if (error instanceof PathParamError) {
    return <Alert color="red">Invalid article ID</Alert>;
  }

  if (error instanceof NotFoundError) {
    return <Alert color="yellow">Article not found</Alert>;
  }
  if (error instanceof ApiError) {
    return <Alert color="red">API Error</Alert>;
  }
  return <Alert color="red">Unknown Error</Alert>;
};

export const Route = createFileRoute('/articles/$articleId')({
  params: zodValidator({ schema: paramsSchema }),
  component: () => {
    const { articleId } = Route.useParams();
    return <RouteComponent articleId={articleId} key={articleId} />;
  },
  loader: ({ context: { queryClient }, params: { articleId } }) => {
    queryClient.ensureQueryData(articlesSingleQueryOptions(articleId));
  },
  pendingComponent: () => (
    <Stack>
      <Skeleton height={100} />
      <Skeleton height={100} />
    </Stack>
  ),
  errorComponent: ErrorComponent,
});
