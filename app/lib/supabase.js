import { createClient } from "@supabase/supabase-js";

// 🔑 Create the Supabase client once
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);

export default supabase;
export { supabase };

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
    // ✅ Add onAuthStateChange to wrapper
    onAuthStateChange: (callback) => {
      return supabase.auth.onAuthStateChange(callback);
    },
  },
};
