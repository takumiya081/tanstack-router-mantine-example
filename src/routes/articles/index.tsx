import { Box } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  return (
    <Box bg="blue" p={2}>
      select article
    </Box>
  );
};

export const Route = createFileRoute('/articles/')({
  component: RouteComponent,
});
