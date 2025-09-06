import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// 🔑 Helper: Get current user
export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

// 🔑 Optional wrapper with error handling
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
      } catch {
        return null;
      }
    },
    onAuthStateChange: (callback) => {
      return supabase.auth.onAuthStateChange(callback);
    },
  },
};
