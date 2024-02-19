import { Database } from "@/schema"
import { createClient } from "@supabase/supabase-js"
import { assert } from "./assert"

const supabaseApiUrl = import.meta.env.VITE_SUPABASE_API_URL
const supabaseApiKey = import.meta.env.VITE_SUPABASE_API_KEY

assert(supabaseApiUrl, "SUPABASE_API_URL is required")
assert(supabaseApiKey, "SUPABASE_API_KEY is required")

export const supabase = createClient<Database>(supabaseApiUrl, supabaseApiKey)
