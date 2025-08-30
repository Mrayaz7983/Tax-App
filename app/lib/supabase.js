import { createClient } from "@supabase/supabase-js";
import { validateEnvVars } from "./utils";

// Validate required environment variables
try {
  validateEnvVars(["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"]);
} catch (error) {
  console.error("Environment validation failed:", error.message);
  throw error;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// ✅ Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      "X-Client-Info": "my-app@0.1.0",
    },
  },
});

// ✅ Auth helper functions
export const supabaseWithErrorHandling = {
  auth: {
    signUp: async (credentials) => {
      try {
        return await supabase.auth.signUp(credentials);
      } catch (error) {
        console.error("Signup error:", error);
        throw error;
      }
    },

    signInWithPassword: async (credentials) => {
      try {
        return await supabase.auth.signInWithPassword(credentials);
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },

    signOut: async () => {
      try {
        return await supabase.auth.signOut();
      } catch (error) {
        console.error("Logout error:", error);
        throw error;
      }
    },

    getUser: async () => {
      try {
        return await supabase.auth.getUser();
      } catch (error) {
        console.error("Get user error:", error);
        throw error;
      }
    },

    resetPasswordForEmail: async (email) => {
      try {
        return await supabase.auth.resetPasswordForEmail(email);
      } catch (error) {
        console.error("Password reset error:", error);
        throw error;
      }
    },
  },
};

// ✅ Utility helpers
export const isSupabaseConfigured = () => !!supabaseUrl && !!supabaseKey;

export const getCurrentSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return session;
  } catch (error) {
    console.error("Session retrieval error:", error);
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error("User retrieval error:", error);
    return null;
  }
};
