import { supabase } from "@/common"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { Link, createFileRoute } from "@tanstack/react-router"
import { Fragment } from "react"

export const Route = createFileRoute("/tags/")({
  component: TagsComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(tagsQueryOptions),
})

export function TagsComponent() {
  const { data: tags } = useSuspenseQuery(tagsQueryOptions)

  return (
    <div className="mt-4">
      {tags.map((tag) => {
        return (
          <Fragment key={`tag-${tag.id}`}>
            <Link
              to="/tags/$tagId"
              params={{ tagId: `${tag.id}` }}
              activeProps={{ className: "text-black font-bold" }}
              className="bg-blue-100 text-blue-800 text-lg font-medium me-2 px-2 py-0.5 ms-3 rounded dark:bg-blue-900 dark:text-blue-300 hover:underline"
            >
              {tag.name} ({tag.count})
            </Link>
          </Fragment>
        )
      })}
    </div>
  )
}

const fetchTags = async () => {
  await new Promise((r) => setTimeout(r, 500))
  return supabase.from("tags").select(`
      id,
      name,
      articles ( id ),
      external_links ( id )
    `)
}

const tagsQueryOptions = queryOptions({
  queryKey: ["tags"],
  queryFn: async () => {
    const { data, error } = await fetchTags()
    if (error) return Promise.reject(error)
    return data
  },
  select: (data) => transformTags(data),
})

const transformTags = (
  data: NonNullable<Awaited<ReturnType<typeof fetchTags>>["data"]>,
) =>
  data
    .flatMap(({ articles, external_links, ...tag }) => ({
      ...tag,
      count: articles.length + external_links.length,
    }))
    .sort((a, b) => b.count - a.count)
