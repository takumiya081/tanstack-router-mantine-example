import { Button, Flex } from '@mantine/core';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
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
  </>
);

export const Route = createRootRoute({
  component: Root,
});
