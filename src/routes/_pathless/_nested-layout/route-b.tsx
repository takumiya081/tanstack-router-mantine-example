import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_pathless/_nested-layout/route-b')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_pathless/_nested_layout/route-b"!</div>;
}
