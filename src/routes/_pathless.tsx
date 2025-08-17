import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_pathless')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>this is pathless layout</h1>
      <Outlet />
    </div>
  );
}
