const API_BASE_URL = "http://localhost:3001/api"; // Change this to match your backend URL

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    return await response.json();
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const registerUser = async (firstName, lastName, email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Registration error:", error);
    throw error;
  }
};
