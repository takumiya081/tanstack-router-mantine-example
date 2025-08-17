import { Box } from '@mantine/core';
import { createFileRoute, Outlet } from '@tanstack/react-router';

const RouteComponent = () => {
  return (
    <Box p={2} bg="red">
      <h5>this is articles common layout</h5>
      <div>
        <Outlet />
      </div>
    </Box>
  );
};

export const Route = createFileRoute('/articles')({
  component: RouteComponent,
});
