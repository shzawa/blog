import { supabase } from "@/common"
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"

const fetchTags = async () => {
  console.log("Fetching tags...")
  await new Promise((r) => setTimeout(r, 500))
  return supabase.from("tags").select("*")
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

export const Route = createFileRoute("/tags/")({
  component: TagsComponent,
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(tagsQueryOptions),
})

function TagsComponent() {
  const { data } = useSuspenseQuery(tagsQueryOptions)

  return (
    <div className="p-2 flex gap-2">
      <ul className="list-disc pl-4">
        {data?.map((tag) => {
          return (
            <li key={tag.id} className="whitespace-nowrap">
              {tag.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
