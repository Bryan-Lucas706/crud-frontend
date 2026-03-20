export async function getUsers(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data.users;
  } catch (error) {
    const message = error.response?.data?.error || "Failed to fetch users";
    throw new Error(message);
  }
}
