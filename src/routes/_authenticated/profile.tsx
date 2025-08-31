import { createFileRoute } from '@tanstack/react-router';
import { useAuthUser } from '../../features/auth/contexts/auth-user-provider';

const RouteComponent = () => {
  const user = useAuthUser();
  return <div>Hello {user.name}</div>;
};

export const Route = createFileRoute('/_authenticated/profile')({
  component: RouteComponent,
  loader: async ({ context }) => {
    const user = await context.auth.actions.ensureAuthUser();
    return {
      userName: user?.name,
    };
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `Profile of ${loaderData?.userName}`,
      },
    ],
  }),
});
