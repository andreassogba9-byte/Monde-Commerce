// /utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://evczzxchoybhxescgzab.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2Y3p6eGNob3liaHhlc2NnemFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAwMDQwOTksImV4cCI6MjA3NTU4MDA5OX0.Vv_jG6YR-wzK02LuNgdkg5EGGxRDrTOzowAVWVWVT5s'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
