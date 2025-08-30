import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { AuthUserProvider, useAuthUserStore } from './features/auth/contexts/auth-user-provider';
import { queryClient } from './libs/tanstack-query/query-client';
import { router } from './libs/tanstack-router/route';
// Import the generated route tree
import { theme } from './styles/theme';

const RouteProviderWithContext = () => {
  const authStore = useAuthUserStore();

  return <RouterProvider context={{ auth: authStore }} router={router} />;
};

// Render the app
// biome-ignore lint/style/noNonNullAssertion: root
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <MantineProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthUserProvider
            onAuthUserChange={() => {
              router.invalidate();
            }}
          >
            <RouteProviderWithContext />
          </AuthUserProvider>
          <Notifications />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>,
  );
}
