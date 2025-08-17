import { Alert, Button, Flex } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { RouterContext } from '../libs/tanstack-router';
import { Route as PathlessRouteA } from './_pathless/_nested_layout/route-a';
import { Route as AboutRoute } from './about';

const RootDocument = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Flex gap="md">
        <Button component={Link} to="/">
          Home
        </Button>
        <Button component={Link} to={AboutRoute.to}>
          About
        </Button>
        <Button component={Link} to="/posts">
          Posts
        </Button>
        <Button component={Link} to="/articles">
          Articles
        </Button>
        <Button component={Link} to={PathlessRouteA.to}>
          _pathless
        </Button>
      </Flex>
      <hr />
      {children}
    </>
  );
};

const Root = () => (
  <>
    <RootDocument>
      <Outlet />
    </RootDocument>
    <TanStackRouterDevtools />
    <ReactQueryDevtools />
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => <Alert color="red">Global Not Found</Alert>,
});
