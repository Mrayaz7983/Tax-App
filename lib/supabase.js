import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Debug check (remove in production)
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Supabase ENV vars missing!");
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export const supabaseWithErrorHandling = {
  auth: {
    signUp: async (credentials) => {
      try {
        return await supabase.auth.signUp(credentials);
      } catch (error) {
        throw error;
      }
    },
    signInWithPassword: async (credentials) => {
      try {
        return await supabase.auth.signInWithPassword(credentials);
      } catch (error) {
        throw error;
      }
    },
    signOut: async () => {
      try {
        return await supabase.auth.signOut();
      } catch (error) {
        throw error;
      }
    },
    getSession: async () => {
      try {
        const { data } = await supabase.auth.getSession();
        return data.session;
      } catch (error) {
        return null;
      }
    },
  },
};
