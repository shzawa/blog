import { supabase } from "@/common"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/tags/")({
  component: TagsComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(tagsQueryOptions),
})

export function TagsComponent() {
  // TODO: これだと safetest 
  // const fetchHoge = FetchHoge.useValue()
  // const data = useSuspenseQuery({
  //   queryKey: ["tags"],
  //   queryFn: async () => {
  //     const { data, error } = await fetchHoge()
  //     // TODO: throw error で良い説？
  //     if (error) return Promise.reject(error)
  //     return data
  //   },
  // }) 
  const { data: tags } = useSuspenseQuery(tagsQueryOptions)

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {tags.map((tag) => {
          return (
            <li key={tag.id} className="whitespace-nowrap">
              <p>{tag.name}</p>
              <ul className="list-disc pl-4">
                {tag.articles.map((article) => {
                  return (
                    <li key={article.id}>
                      <p>{article.title}</p>
                    </li>
                  )
                })}
                {tag.external_links.map((externalLink) => {
                  return (
                    <li key={externalLink.id}>
                      <a
                        href={externalLink.url}
                        className="external-link underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                      >
                        {externalLink.title}
                        <svg
                          className="h-5 w-5 inline"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeWidth="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </li>
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

const fetchTags = async () => {
  console.log("Fetching tags...")
  await new Promise((r) => setTimeout(r, 500))
  return supabase.from("tags").select(`
      id,
      name,
      articles (
        id,
        title
      ),
      external_links (
        id,
        title,
        url
      )
    `)
}

const tagsQueryOptions = queryOptions({
  queryKey: ["tags"],
  queryFn: async () => {
    const { data, error } = await fetchTags()
    // TODO: throw error で良い説？
    if (error) return Promise.reject(error)
    return data
  },
})
