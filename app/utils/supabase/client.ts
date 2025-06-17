// utils/supabase/client.ts
'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'


export const supabase = createBrowserClient<any>;

export function createBrowserClient<T>(supabaseUrl: string, supabaseAnonKey: string) {
    return createClientComponentClient<T>({
        supabaseUrl:'https://zlueetvjllugrwexfxqr.supabase.co',
        supabaseKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpsdWVldHZqbGx1Z3J3ZXhmeHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyMjc4NDgsImV4cCI6MjA1OTgwMzg0OH0.stVZlZUBXfCQ2qj3QxwqcAbhELtzdhm5IU5m69u-CCQ",
    });
}


