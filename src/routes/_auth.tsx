import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

const searchParamSchema = z.object({
  redirect: fallback(z.string(), '/').default('/'),
});

const RouteComponent = () => {
  return <Outlet />;
};

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  validateSearch: zodValidator(searchParamSchema),
  beforeLoad: ({ search, context }) => {
    const { auth } = context;

    if (auth.state.status === 'authenticated') {
      throw redirect({ to: search.redirect });
    }
  },
});
