/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from "@tanstack/react-router"

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as TimelineIndexImport } from "./routes/timeline/index"
import { Route as TagsIndexImport } from "./routes/tags/index"
import { Route as PostsIndexImport } from "./routes/posts/index"
import { Route as TagsTagIdImport } from "./routes/tags/$tagId"
import { Route as PostsPostIdImport } from "./routes/posts/$postId"

// Create Virtual Routes

const IndexLazyImport = createFileRoute("/")()
const AboutIndexLazyImport = createFileRoute("/about/")()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route))

const AboutIndexLazyRoute = AboutIndexLazyImport.update({
  path: "/about/",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/about/index.lazy").then((d) => d.Route))

const TimelineIndexRoute = TimelineIndexImport.update({
  path: "/timeline/",
  getParentRoute: () => rootRoute,
} as any)

const TagsIndexRoute = TagsIndexImport.update({
  path: "/tags/",
  getParentRoute: () => rootRoute,
} as any)

const PostsIndexRoute = PostsIndexImport.update({
  path: "/posts/",
  getParentRoute: () => rootRoute,
} as any)

const TagsTagIdRoute = TagsTagIdImport.update({
  path: "/tags/$tagId",
  getParentRoute: () => rootRoute,
} as any)

const PostsPostIdRoute = PostsPostIdImport.update({
  path: "/posts/$postId",
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    "/posts/$postId": {
      preLoaderRoute: typeof PostsPostIdImport
      parentRoute: typeof rootRoute
    }
    "/tags/$tagId": {
      preLoaderRoute: typeof TagsTagIdImport
      parentRoute: typeof rootRoute
    }
    "/posts/": {
      preLoaderRoute: typeof PostsIndexImport
      parentRoute: typeof rootRoute
    }
    "/tags/": {
      preLoaderRoute: typeof TagsIndexImport
      parentRoute: typeof rootRoute
    }
    "/timeline/": {
      preLoaderRoute: typeof TimelineIndexImport
      parentRoute: typeof rootRoute
    }
    "/about/": {
      preLoaderRoute: typeof AboutIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  PostsPostIdRoute,
  TagsTagIdRoute,
  PostsIndexRoute,
  TagsIndexRoute,
  TimelineIndexRoute,
  AboutIndexLazyRoute,
])

/* prettier-ignore-end */
