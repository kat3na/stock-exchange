// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('> Supabase URL:', url)
console.log('> Supabase anon key (first 10 chars):', key?.slice(0, 10), '…')

export default createClient(url!, key!)
