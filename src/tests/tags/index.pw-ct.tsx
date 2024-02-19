import { TagsComponent } from "@/routes/tags"
import { expect, test } from "@playwright/experimental-ct-react"
import { Wrapper } from "./test-utils"

// test.use({ viewport: { width: 500, height: 500 } })

test("should work", async ({ mount }) => {
  const component = await mount(
    <Wrapper>
      <TagsComponent />
    </Wrapper>,
  )
  await expect(component).toContainText("Learn React")
})
