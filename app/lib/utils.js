// Email validation
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Password validation
export function validatePassword(password) {
  if (password.length < 6) return { isValid: false, message: "Password must be at least 6 characters" };
  return { isValid: true, message: "Password is valid" };
}

// Supabase error handler
export function handleSupabaseError(error, context) {
  if (error.message) return error.message;
  return `Error occurred during ${context}`;
}
