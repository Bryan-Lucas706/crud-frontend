export async function getUsers(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json(); // Converte o response em um objeto JavaScript

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch users");
  } 

  return data.users;
}
