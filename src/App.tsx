import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { StrictMode } from "react"
import ReactDOM from "react-dom/client"
import { bootstrap } from "safetest/react"
import { assert } from "./common"
import { imports } from "./imports"
import "./index.css"
import { routeTree } from "./routeTree.gen"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: Infinity,
    },
  },
})

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    queryClient,
  },
  // <Link /> をホバーしたときにプリロードする
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
})

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

const container = document.getElementById("root")
assert(container, "No root element found")

const element = (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)

bootstrap({
  element,
  render: () => ReactDOM.createRoot(container).render(element),

  // Vite:
  importGlob:
    import.meta.env.DEV && import.meta.glob("./**/*.safetest.{j,t}s{,x}"),

  // Using the `npx safetest generate-import-map src/Bootstrap.tsx src > src/imports.tsx` syntax:
  imports, // Where imports is defined as `import imports from './imports';`

  // Other:
  // import: isDev && async (s) => import(`${s.replace(/.*src/, '.').replace(/\.safetest$/, '')}.safetest`),
})
