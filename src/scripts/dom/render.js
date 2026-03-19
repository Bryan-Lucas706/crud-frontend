import { getUsers } from "../api/read.js";

let usersCache = [];

export function findUserById(id) {
  return usersCache.find((user) => user.id === id); // Procura dentro de usersCache um usuario respectivo ao parametro
}

export async function renderUsers(apiUrl) {
  const users = await getUsers(apiUrl);
  usersCache = users;

  const usersContainer = document.getElementById("users-container");

  if (users.length === 0) { // Se não existir usuario vai adicionar o <p>
    usersContainer.innerHTML = '<p class="no-users">No users found</p>';
    return;
  }

  usersContainer.innerHTML = ""; // Limpa o container

  users.forEach((user) => { // Para cada usuario vai criar um card
    const card = document.createElement("div");
    card.classList.add(`user-card`);
    card.id = user.id; // Cada card tem um ID respectivo ao usuario

    card.innerHTML = `
      <div class="info-user">
        <strong class="name">${user.name}</strong>
        <span><strong>Age: </strong>${user.age}</span>
        <span><strong>Email: </strong>${user.email}</span>
      </div>
      <div class="change-container">  
        <button class="edit-btn" data-action="edit">Edit</button>
        <button class="delete-btn" data-action="delete">Delete</button>
        </div>
    `;

    usersContainer.appendChild(card); // Adiciona o card como filho de usersContainer
  });
}
