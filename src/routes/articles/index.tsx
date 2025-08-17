import { Box } from '@mantine/core';
import { createFileRoute, Link } from '@tanstack/react-router';
import { Route as ArticlesArticleIdRoute } from './$articleId';

const RouteComponent = () => {
  return (
    <Box p={2} bg="blue">
      <ul>
        <li>
          <Link to={ArticlesArticleIdRoute.to} params={{ articleId: '1' }}>
            Article 1
          </Link>
        </li>
      </ul>
    </Box>
  );
};

export const Route = createFileRoute('/articles/')({
  component: RouteComponent,
});
