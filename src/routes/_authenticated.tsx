import { Box } from '@mantine/core';
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { LogoutButton } from '../features/auth/components/logout-button';

const RouteComponent = () => {
  return (
    <>
      <Box>
        <LogoutButton />
      </Box>
      <Outlet />
    </>
  );
};

export const Route = createFileRoute('/_authenticated')({
  component: RouteComponent,
  beforeLoad: async ({ context, location }) => {
    const { auth } = context;

    if (auth.state.status === 'pending') {
      const data = await context.auth.actions.ensureAuthUser();
      if (data === null) {
        throw redirect({
          to: '/sign-in',
          search: { redirect: location.href },
        });
      }
    }

    if (auth.state.status === 'unauthenticated') {
      throw redirect({
        to: '/sign-in',
        search: { redirect: location.href },
      });
    }
  },
  pendingComponent: () => <div>loading auth user...</div>,
});
