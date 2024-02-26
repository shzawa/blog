import { expect, test as _test } from "@playwright/experimental-ct-react"
import type { MockServiceWorker } from "playwright-msw"
import { createWorkerFixture } from "playwright-msw"
import { Template } from "./index.template"
const test = _test.extend<{ worker: MockServiceWorker }>({
  worker: createWorkerFixture(),
})

// test.use({ viewport: { width: 500, height: 500 } })

// const handlers = [http.get("")]

test("should work", async ({ page, mount }) => {
  // await worker.use(...handlers)

  await mount(<Template />)
  await expect(
    page.getByRole("link", { name: "PostgreSQL 公式ドキュメンテーション" }),
  ).toBeVisible()
})
