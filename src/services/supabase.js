import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://izsurcokrxoecmfzbumy.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6c3VyY29rcnhvZWNtZnpidW15Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMxMjE4MDcsImV4cCI6MjAyODY5NzgwN30.HGDhCYORNFyGTeMSKS-MKvNsdk_13LDzmn1q-ARLWos';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
