import { Box, Container, Grid } from '@mantine/core';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { Articles } from '../../features/articles/components/articles';
import { articlesListQueryOptions } from '../../libs/tanstack-query';

const RouteComponent = () => {
  return (
    <Box bg="gray.1" p={2}>
      <h5>this is articles common layout</h5>
      <Container>
        <Grid gutter="md">
          <Grid.Col span="auto">
            <Articles />
          </Grid.Col>
          <Grid.Col span={8}>
            <Outlet />
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
};

export const Route = createFileRoute('/articles')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(articlesListQueryOptions());
  },
  pendingComponent: () => <div>Loading...</div>,
  pendingMs: 0,
});
