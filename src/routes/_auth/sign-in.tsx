import { createFileRoute } from '@tanstack/react-router';
import { SignInForm } from '../../features/auth/components/sign-in-form';
import { useAuthUserStore } from '../../features/auth/contexts/auth-user-provider';

const RouteComponent = () => {
  const { actions } = useAuthUserStore();
  return <SignInForm onSuccess={actions.refetchAuthUser} />;
};

export const Route = createFileRoute('/_auth/sign-in')({
  component: RouteComponent,
});
