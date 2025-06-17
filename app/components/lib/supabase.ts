// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('> Supabase URL:', url)
console.log('> Supabase anon key (first 10 chars):', key?.slice(0, 10), '…')

export default createClient('https://zlueetvjllugrwexfxqr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdWVldHZqbGx1Z3J3ZXhmeHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjc4NDgsImV4cCI6MjA1OTgwMzg0OH0.stVZlZUBXfCQ2qj3QxwqcAbhELtzdhm5IU5m69u-CCQ')
