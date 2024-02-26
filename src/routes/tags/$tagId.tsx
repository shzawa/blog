import { supabase } from "@/common"
import { queryOptions } from "@tanstack/react-query"
import {
  ErrorComponent,
  ErrorComponentProps,
  Link,
  createFileRoute,
} from "@tanstack/react-router"

export const Route = createFileRoute("/tags/$tagId")({
  loader: ({ context: { queryClient }, params: { tagId } }) =>
    queryClient.ensureQueryData(tagQueryOptions(tagId)),
  errorComponent: NotFoundErrorComponent,
  component: TagComponent,
})

class TagNotFoundError extends Error {}
function NotFoundErrorComponent({ error }: ErrorComponentProps) {
  if (error instanceof TagNotFoundError) {
    return <div>{error.message}</div>
  }

  return <ErrorComponent error={error} />
}

export function TagComponent() {
  const tag = Route.useLoaderData()

  return (
    <div className="space-y-2">
      <h2>{tag.name}</h2>
      {tag.articles.length > 0 && (
        <>
          <h3>Articles</h3>
          <ol>
            {tag.articles.map((article) => (
              <li key={`article-${article.id}`}>{article.title}</li>
            ))}
          </ol>
        </>
      )}
      {tag.external_links.length > 0 && (
        <>
          <h3>External Links</h3>
          <ol>
            {tag.external_links.map((externalLink) => (
              <li key={`externalLink-${externalLink.id}`}>
                {externalLink.title}
              </li>
            ))}
          </ol>
        </>
      )}

      <Link
        to="/tags"
        className="block py-1 text-blue-600 hover:text-blue-400"
        activeProps={{ className: "text-black font-bold" }}
      >
        Back to the list
      </Link>
    </div>
  )
}

const tagQueryOptions = (tagId: string) =>
  queryOptions({
    queryKey: ["tag", { tagId }],
    queryFn: async () => {
      const { data, error } = await fetchTag(tagId)
      if (error) return Promise.reject(error)
      return data
    },
  })

const fetchTag = async (tagId: string) => {
  await new Promise((r) => setTimeout(r, 500))
  return supabase
    .from("tags")
    .select(`
      id,
      name,
      articles (
        id,
        title,
        created_at
      ),
      external_links (
        id,
        title,
        url,
        description,
        created_at
      )
    `)
    .eq("id", tagId)
    .limit(1)
    .single()
}
