import { Skeleton } from "@/components/ui/skeleton";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Outlet, RouterProvider, createRouter } from "@tanstack/react-router";
import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import { Layout } from "./components/Layout";

const TradingPage = lazy(() =>
  import("./pages/TradingPage").then((m) => ({ default: m.TradingPage })),
);
const PortfolioPage = lazy(() =>
  import("./pages/PortfolioPage").then((m) => ({ default: m.PortfolioPage })),
);
const LoginPage = lazy(() =>
  import("./pages/LoginPage").then((m) => ({ default: m.LoginPage })),
);

function PageLoader() {
  return (
    <div className="flex flex-1 flex-col gap-3 p-4">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-64 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

function AuthGate({ children }: { children: React.ReactNode }) {
  const { loginStatus, isAuthenticated } = useInternetIdentity();

  if (loginStatus === "initializing") {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return (
      <Suspense fallback={<PageLoader />}>
        <LoginPage />
      </Suspense>
    );
  }

  return <>{children}</>;
}

const rootRoute = createRootRoute({
  component: () => (
    <Layout>
      <AuthGate>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </AuthGate>
    </Layout>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <TradingPage />
    </Suspense>
  ),
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/portfolio",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PortfolioPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([indexRoute, portfolioRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
