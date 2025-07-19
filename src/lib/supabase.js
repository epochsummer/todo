import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gufyuycbdwmurwhtvajq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd1Znl1eWNiZHdtdXJ3aHR2YWpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MDE3MzAsImV4cCI6MjA2ODQ3NzczMH0.JNmUdz5KfOLGNHlN6G99eF5Kq1wm_lId0zSv4ZuUzZ0'; // wrapped in ''

export const supabase = createClient(supabaseUrl, supabaseKey)
