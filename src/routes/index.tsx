import { Button } from '@mantine/core';
import { createFileRoute } from '@tanstack/react-router';

const Index = () => {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <Button>test</Button>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
