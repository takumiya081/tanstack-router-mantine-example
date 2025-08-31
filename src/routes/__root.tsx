import { Alert, Button, Flex } from '@mantine/core';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import type { RouterContext } from '../libs/tanstack-router/router-context';
import { Route as PathlessRouteA } from './_pathless/_nested-layout/route-a';
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
        <Button color="pink" component={Link} to="/sign-in" variant="outline">
          Sign In
        </Button>
        <Button color="green" component={Link} to="/profile" variant="outline">
          profile
        </Button>
      </Flex>
      <hr />
      {children}
    </>
  );
};

const Root = () => (
  <>
    <HeadContent />
    <RootDocument>
      <Outlet />
    </RootDocument>
    <Scripts />
    <TanStackRouterDevtools />
    <ReactQueryDevtools />
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: Root,
  notFoundComponent: () => <Alert color="red">Global Not Found</Alert>,
  head: () => ({
    meta: [
      {
        name: 'description',
        content: 'My App is a web application',
      },
      {
        title: 'My App',
      },
    ],
    links: [
      {
        rel: 'icon',
        href: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  }),
});
