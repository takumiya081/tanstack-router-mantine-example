import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_pathless/_nested-layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      Hello "/_pathless/_nested_layout"!
      <div>
        <Outlet />
      </div>
    </div>
  );
}
