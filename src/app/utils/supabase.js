import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tszrhhzygrewbcciknyy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzenJoaHp5Z3Jld2JjY2lrbnl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMTg4NDcsImV4cCI6MjA2NjU5NDg0N30.9rlvkuOMyUUzRxTwIpLgtt4v8XS41qMj5VQj__5lddQ'

const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase