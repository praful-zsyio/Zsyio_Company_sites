const BASE_URL = "http://127.0.0.1:8000/api";

export const subscribeToNewsletter = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/newsletter/subscribe/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Subscription failed");
    }

    return await response.json();
  } catch (error) {
    throw new Error(error.message || "An unexpected error occurred");
  }
};
