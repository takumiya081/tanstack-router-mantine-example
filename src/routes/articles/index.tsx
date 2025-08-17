import { Box } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

const RouteComponent = () => {
  return (
    <Box p={2} bg="blue">
      select article
    </Box>
  );
};

export const Route = createFileRoute('/articles/')({
  component: RouteComponent,
});
