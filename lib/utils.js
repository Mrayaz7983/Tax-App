export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

export const validatePassword = (password) => {
  if (password.length < 6) return { isValid: false, message: "Password must be at least 6 characters" };
  return { isValid: true };
};

export const handleSupabaseError = (error, type) => {
  if (!error) return "Something went wrong";
  if (error.message) return error.message;
  return `Failed to ${type}`;
};
