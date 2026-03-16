export async function postUsers(apiUrl, name, age, email) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        age: age,
        email: email,
      }),
    });
    const created = await response.json();
  } catch (error) {
    console.log("Error creating user:", error);
  }
}
