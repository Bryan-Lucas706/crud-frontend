import { getUsers } from "/scripts/get.js";
import { postUsers } from "./scripts/api/post.js";
import { deleteUsers } from "./scripts/api/delete.js";
import { putUsers } from "./scripts/api/update.js";

const apiUrl = "http://localhost:8000/api/users";
const createBtn = document.getElementById("createBtn");
const updateBtn = document.getElementById("updateBtn");

let users = [];
let currentUserId = null;
let originalUser = null;

async function loadUsers() {
  users = await getUsers(apiUrl);
}

loadUsers();

async function createUser(event) {
  event.preventDefault();

  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;

  await postUsers(apiUrl, name, age, email);

  document.getElementById("name").value = "";
  document.getElementById("age").value = "";
  document.getElementById("email").value = "";

  await loadUsers();
}

async function editUser(event) {
  event.preventDefault();

  const btn = event.target.closest(".edit-btn");
  if (!btn) return;

  const id = btn.dataset.id; // Pega o ID do atributo data-id do botão
  await putUsers(apiUrl, id, name, age, email);

  await loadUsers();
}

async function deleteUserById(event) {
  event.preventDefault();

  // Verifica se o clique foi em um botão de deletar
  const btn = event.target.closest(".delete-btn");
  if (!btn) return;

  const id = btn.dataset.id; // Pega o ID do atributo data-id do botão
  await deleteUsers(apiUrl, id);
  await loadUsers(apiUrl);
}

createBtn.addEventListener("click", createUser);
updateBtn.addEventListener("click", editUser);

document.addEventListener("click", deleteUserById);
document.addEventListener("click", editUser);
