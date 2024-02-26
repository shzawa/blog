import "@/index.css" // これが無いと Tailwind CSS が働かない
// import { expect, test as _test } from "@playwright/experimental-ct-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
// import type { MockServiceWorker } from "playwright-msw"
// import { createWorkerFixture } from "playwright-msw"
import { PropsWithChildren } from "react"

const queryClient = new QueryClient()
export const Wrapper = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

// const test = _test.extend<{ worker: MockServiceWorker }>({
//   worker: createWorkerFixture(),
// })
// export { test, expect }
