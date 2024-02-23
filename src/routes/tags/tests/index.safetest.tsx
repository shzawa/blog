import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "safetest/react"
import { expect, it } from "safetest/vitest"
import { FetchTags, TagsComponent, fetchTags } from ".."

const resolved: Awaited<ReturnType<typeof fetchTags>> = {
  count: 2,
  data: [
    {
      id: 1,
      name: "tag1",
      articles: [
        {
          id: 1,
          title: "article1",
        },
      ],
      external_links: [
        {
          id: 1,
          title: "link1",
          url: "https://example.com",
        },
      ],
    },
    {
      id: 2,
      name: "tag1",
      articles: [
        {
          id: 2,
          title: "article2",
        },
      ],
      external_links: [
        {
          id: 2,
          title: "link2",
          url: "https://example.com",
        },
      ],
    },
  ],
  error: null,
  status: 200,
  statusText: "OK",
}

const queryClient = new QueryClient()

// Whole App testing
describe("App", () => {
  it("renders without crashing", async () => {
    const { page } = await render(
      <QueryClientProvider client={queryClient}>
        <FetchTags.Override with={() => async () => resolved}>
          <TagsComponent />
        </FetchTags.Override>
      </QueryClientProvider>,
    )
    await expect(page.locator("text=Welcome to The App")).toBeVisible()
  })
})

// Component testing
// describe("Header", () => {
//   it("renders without crashing", async () => {
//     const { page } = await render(<Header />)
//     await expect(page.locator("text=Logout")).toBeVisible()
//     expect(await page.screenshot()).toMatchImageSnapshot()
//   })
// })
