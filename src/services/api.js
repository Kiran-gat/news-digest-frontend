const BASE_URL = import.meta.env.VITE_API_URL;


/**
 * Central API helper
 * - Automatically attaches JWT (if available)
 * - Handles unauthorized access globally
 */
export const apiRequest = async (endpoint, options = {}) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        // Attach token only if it exists
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    // If token expired or invalid → logout
    if (response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      return;
    }

    return await response.json();
  } catch (error) {
    console.error("API FETCH ERROR:", error);
    throw new Error("Backend not reachable");
  }
};
