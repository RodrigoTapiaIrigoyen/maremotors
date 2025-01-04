import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate URL format
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

// Declare supabase variable
let supabase: any;

// Check if credentials are valid
if (!supabaseUrl || !supabaseKey || !isValidUrl(supabaseUrl)) {
  console.error('Invalid or missing Supabase credentials. Please connect to Supabase using the button in the top right corner.');

  // Provide a dummy client that won't throw errors but won't work until properly configured
  supabase = {
    from: () => ({
      select: () => Promise.resolve({ data: [], error: null }),
      insert: () => Promise.resolve({ data: null, error: null }),
      update: () => Promise.resolve({ data: null, error: null }),
      delete: () => Promise.resolve({ data: null, error: null }),
    }),
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    },
  };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Export supabase client
export { supabase };
