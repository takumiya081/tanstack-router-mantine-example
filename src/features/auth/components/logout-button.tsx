import { Button } from '@mantine/core';
import { useLogoutMutation } from '../../../libs/tanstack-query/fetch/fetch-logout';

export const LogoutButton = () => {
  const { mutate, isPending } = useLogoutMutation();

  const handleLogout = () => {
    mutate();
  };

  return (
    <Button color="red" loading={isPending} onClick={handleLogout} type="button">
      Logout
    </Button>
  );
};
