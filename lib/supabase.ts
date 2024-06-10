import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nuajxkgtxmfcurybbxdg.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51YWp4a2d0eG1mY3VyeWJieGRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc5NTA5NTUsImV4cCI6MjAzMzUyNjk1NX0.H09E5copugvI0seULS_dXNIxq8pSBBqOdWfQ1k5TZp8'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})