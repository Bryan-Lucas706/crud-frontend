export async function deleteUsers(apiUrl, id) {
  try {
    const response = await fetch(`${apiUrl}?id=${id}`, {
      method: "DELETE",
    });
    const result = await response.json();
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}
