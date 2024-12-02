import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://onxgeydspoiogigknnyd.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ueGdleWRzcG9pb2dpZ2tubnlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxMjQ4MjYsImV4cCI6MjA0ODcwMDgyNn0.rwQGPDe50g-OWPBXl_R3C09lDDVmq-FwtZwuAil0UXM';

export const supabase = createClient(supabaseUrl, supabaseKey);