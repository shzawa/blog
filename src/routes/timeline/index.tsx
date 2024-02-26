import { supabase } from "@/common"
import { ExternalLink, LinkIcon, NewspaperIcon } from "@/components"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/timeline/")({
  component: TimelineComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(timelineQueryOptions),
})

export function TimelineComponent() {
  const { data: timeline } = useSuspenseQuery(timelineQueryOptions)

  console.log(timeline)

  return (
    <>
      <div className="pl-6 pt-4 flex gap-2">
        <ol className="relative border-s border-gray-200 dark:border-gray-700">
          {timeline.map((entry, index) => {
            const isLastItem = index === timeline.length - 1

            if (entry.type === "article") {
              const date = new Date(entry.created_at)
              return (
                <li
                  key={entry.id}
                  className={`${!isLastItem ? "mb-10" : ""} ms-6`}
                >
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    {/* heroicons link */}
                    <NewspaperIcon className="w-4 h-4 text-blue-800 dark:text-blue-300" />
                  </span>
                  <div className="flex items-start">
                    <h3 className="flex items-center mb-1 text-lg font-semibold">
                      {entry.title}
                    </h3>
                    {entry.tags.map((tag) => (
                      <span
                        key={`entry-${entry.id}-tag-${tag.id}`}
                        className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {`${date.toLocaleDateString(
                      "ja-JP",
                    )} (${date.toLocaleDateString("ja-JP", {
                      weekday: "short",
                    })})`}
                  </time>
                </li>
              )
            }
            if (entry.type === "external_link") {
              const date = new Date(entry.created_at)
              return (
                <li
                  key={entry.id}
                  className={`${!isLastItem ? "mb-10" : ""} ms-6`}
                >
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                    <LinkIcon className="w-4 h-4 text-blue-800 dark:text-blue-300" />
                  </span>
                  <h3 className="flex items-center mb-1 text-lg font-semibold">
                    <ExternalLink href={entry.url}>{entry.title}</ExternalLink>
                    {entry.tags.map((tag) => (
                      <span
                        key={`entry-${entry.id}-tag-${tag.id}`}
                        className="bg-blue-100 text-blue-800 text-sm font-medium me-2 px-2 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 ms-3"
                      >
                        {tag.name}
                      </span>
                    ))}
                  </h3>
                  <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {`${date.toLocaleDateString(
                      "ja-JP",
                    )} (${date.toLocaleDateString("ja-JP", {
                      weekday: "short",
                    })})`}
                  </time>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {entry.description}
                  </p>
                </li>
              )
            }
          })}
        </ol>
      </div>
    </>
  )
}

const fetchTimeline = async () => {
  await new Promise((r) => setTimeout(r, 500))
  return supabase.from("timeline").select(`
    id,
    articles (
      id,
      title,
      created_at,
      tags (
        id,
        name
      )
    ),
    external_links (
      id,
      title,
      url,
      description,
      created_at,
      tags (
        id,
        name
      )
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
        acc.push({ ...article, id: entry.id, type: "article" })
        return acc
      }
      const external_link = entry.external_links[0]
      if (external_link) {
        acc.push({ ...external_link, id: entry.id, type: "external_link" })
        return acc
      }
      return acc
    },
    [] as (
      | ((typeof data)[number]["articles"][number] & {
          type: "article"
        })
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
