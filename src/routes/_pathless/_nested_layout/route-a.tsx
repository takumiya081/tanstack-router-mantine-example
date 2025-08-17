import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_pathless/_nested_layout/route-a')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_pathless/_nested_layout/route-a"!</div>;
}
