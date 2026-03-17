import { getUsers } from "/scripts/get.js";
import { postUsers } from "./scripts/api/post.js";
import { deleteUsers } from "./scripts/api/delete.js";

const apiUrl = "http://localhost:8000/api/users";
const submitBtn = document.getElementById("submitBtn");

getUsers(apiUrl);

async function createUser(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;

  await postUsers(apiUrl, name, age, email);

  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("email").value = "";

  await getUsers(apiUrl);
}

async function deleteUserById(event) {
  event.preventDefault();

  // Verifica se o clique foi em um botão de deletar
  const btn = event.target.closest(".delete-btn");
  if (!btn) return;

  const id = btn.dataset.id; // Pega o ID do atributo data-id do botão
  await deleteUsers(apiUrl, id);
  await getUsers(apiUrl);
}

submitBtn.addEventListener("click", createUser);

// Delega o evento para um elemento pai que já existe no DOM
document.addEventListener("click", deleteUserById);