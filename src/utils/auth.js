/**
 * Save JWT token to localStorage
 */
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

/**
 * Get JWT token
 */
export const getToken = () => {
  return localStorage.getItem("token");
};

/**
 * Logout user
 */
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
