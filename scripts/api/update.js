export async function putUsers(apiUrl, id, name, age, email) {
  const response = await fetch(`${apiUrl}?id=${id}`, {
    method: "PUT",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      name: name,
      age: age,
      email: email,
    }),
  });
  const updated = await response.json();
}
