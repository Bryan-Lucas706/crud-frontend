export async function postUsers(apiUrl, user) {
  try {
    const response = await axios.post(apiUrl, {
      name: user.name,
      age: user.age,
      email: user.email,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || "Failed to create user";
    throw new Error(message);
  }
} 