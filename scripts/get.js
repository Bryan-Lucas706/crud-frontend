export async function getUsers(apiUrl) {
  const response = await fetch(apiUrl);
  const data = await response.json();

  renderUsers(data.users);

  return data.users; 
}

function renderUsers(users) {
  const usersContainer = document.getElementById("users-container");
  usersContainer.innerHTML = "";

  if (users.length === 0) {
    usersContainer.innerHTML = '<p class="no-users">No users found</p>';
    return;
  }

  users.forEach((user) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <div class="info-user">
        <strong class="name">${user.name}</strong>
        <span><strong>Age: </strong>${user.age}</span>
        <span><strong>Email: </strong>${user.email}</span>
      </div>
      <div class="change-container">  
        <button class="edit-btn" data-id="${user.id}">Edit</button>
        <button class="delete-btn" data-id="${user.id}">Delete</button>
      </div>
    `;

    usersContainer.appendChild(card);
  });
}
