// Frontend auth API wrappers
const API_BASE = "/api/auth";

const request = async (endpoint, body) => {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      throw new Error(data.message || "Request failed");
    }
    return data.data; // expects { token }
  } catch (err) {
    throw err;
  }
};

export const signupApi = (email, password) => request("/signup", { email, password });
export const loginApi = (email, password) => request("/login", { email, password });
