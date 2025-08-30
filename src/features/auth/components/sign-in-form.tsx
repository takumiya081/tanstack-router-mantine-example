import { Alert, Button, TextInput } from '@mantine/core';
import { useState } from 'react';
import { useLoginMutation } from '../../../libs/tanstack-query/fetch/fetch-login';
import type { AuthUser } from '../types/auth-user';

interface SignInFormProps {
  onSuccess?: (authUser: AuthUser | null) => void;
}

export const SignInForm = ({ onSuccess }: SignInFormProps) => {
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');

  const loginMutation = useLoginMutation({
    onSuccess,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextInput label="Email" onChange={handleEmailChange} required type="email" value={email} />
      <TextInput
        label="Password"
        onChange={handlePasswordChange}
        required
        type="password"
        value={password}
      />
      {loginMutation.error && <Alert color="red">{loginMutation.error.message}</Alert>}
      <Button loading={loginMutation.isPending} type="submit">
        Sign In
      </Button>
    </form>
  );
};
