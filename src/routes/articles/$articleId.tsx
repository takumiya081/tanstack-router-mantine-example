import { Box } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/articles/$articleId')({
  component: () => {
    const { articleId } = Route.useParams();
    return <RouteComponent articleId={articleId} />;
  },
});

const RouteComponent = ({ articleId }: { articleId: string }) => {
  return (
    <Box p={2} bg="green">
      articleId is {articleId}!
    </Box>
  );
};
