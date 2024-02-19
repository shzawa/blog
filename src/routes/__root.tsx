import { QueryClient } from "@tanstack/react-query"
import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router"
import { Suspense, lazy } from "react"

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: Component,
})

function Component() {
  return (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>{" "}
        <Link to="/posts" className="[&.active]:font-bold">
          Posts
        </Link>
        <Link to="/tags" className="[&.active]:font-bold">
          Tags
        </Link>
      </div>
      <hr />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
      <Suspense>
        <ReactQueryDevtools />
      </Suspense>
    </>
  )
}

const TanStackRouterDevtools = import.meta.env.DEV
  ? lazy(() =>
      // Lazy load in development
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    )
  : () => null // Render nothing in production

const ReactQueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@tanstack/react-query-devtools").then((res) => ({
        default: res.ReactQueryDevtools,
      })),
    )
  : () => null
