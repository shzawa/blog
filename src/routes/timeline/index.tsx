import { supabase } from "@/common"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/timeline/")({
  component: TimelineComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(timelineQueryOptions),
})

export function TimelineComponent() {
  const { data: timeline } = useSuspenseQuery(timelineQueryOptions)

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {timeline.map((entry) => {
          if (entry.type === "article") {
            return <li key={`article-${entry.id}`}>{entry.title}</li>
          }
          if (entry.type === "external_link") {
            return (
              <li key={`external_link-${entry.id}`}>
                <a
                  href={entry.url}
                  className="external-link underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                >
                  {entry.title}
                </a>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

const fetchTimeline = async () => {
  await new Promise((r) => setTimeout(r, 500))
  return supabase.from("timeline").select(`
    id,
    articles (
      id,
      title,
      created_at
    ),
    external_links (
      id,
      title,
      url,
      created_at
    )
  `)
}

const transformTimeline = (
  data: NonNullable<Awaited<ReturnType<typeof fetchTimeline>>["data"]>,
) => {
  return data.reduce(
    (acc, entry) => {
      const article = entry.articles[0]
      if (article) {
        acc.push({ ...article, type: "article" })
        return acc
      }
      const external_link = entry.external_links[0]
      if (external_link) {
        acc.push({ ...external_link, type: "external_link" })
        return acc
      }
      return acc
    },
    [] as (
      | ((typeof data)[number]["articles"][number] & { type: "article" })
      | ((typeof data)[number]["external_links"][number] & {
          type: "external_link"
        })
    )[],
  )
}

const timelineQueryOptions = queryOptions({
  queryKey: ["timeline"],
  queryFn: async () => {
    const { data, error } = await fetchTimeline()
    if (error) return Promise.reject(error)

    // NOTE: timeline 形式になるよう、各種データを結合しソートする
    const result = transformTimeline(data).sort((a, b) =>
      a.created_at > b.created_at ? -1 : 1,
    )
    console.log(result)
    return result
  },
})
