import { renderUsers, findUserById } from "./dom/render.js";
import { postUsers } from "./api/post.js";
import { deleteUser } from "./api/delete.js";
import { updateUser, patchUser } from "./api/update.js";

const apiUrl = "http://localhost:8000/api/users";
const usersContainer = document.getElementById("users-container");
const form = document.getElementById("createUser");
const formTitle = document.getElementById("form-title");
const updateBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");

const errorMsg = document.getElementById("error-msg");

// Estado de edição:
let editingId = null;
let originalUser = null;

function showError(message) {
  errorMsg.style.display = "block";
  errorMsg.innerText = message;
}

function enterEditMode(user) {
  editingId = user.id;
  originalUser = { ...user };

  // Preenche o formulário:
  document.getElementById("name").value = user.name;
  document.getElementById("age").value = user.age;
  document.getElementById("email").value = user.email;

  // Muda a interface:
  formTitle.textContent = "Edit user";
  updateBtn.value = "Update";
  cancelBtn.style.display = "block";
}

function exitEditMode() {
  editingId = null;
  originalUser = null;
  formTitle.textContent = "Create User";
  updateBtn.value = "Create";
  cancelBtn.style.display = "none";
  form.reset();
}

// == EDIT == //

// Função auxiliar:
function getUserFromCard(button) {
  const card = button.closest(".user-card");
  return findUserById(Number(card.id));
}

await renderUsers(apiUrl);

usersContainer.addEventListener("click", async (event) => {
  const { target } = event;

  if (target.dataset.action === "edit") {
    enterEditMode(getUserFromCard(target));
  }

  if (target.dataset.action === "delete") {
    const user = getUserFromCard(target);

    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(apiUrl, user.id);
      renderUsers(apiUrl);
    } catch (error) {
      showError(error.message);
    }
  }
});

// == DELETE / EDIT  == //

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;

  try {
    if (editingId !== null) {
      // === MODO EDIÇÃO ===

      // Descobre o que mudou:
      const changed = {};
      if (name !== originalUser.name) changed.name = name;
      if (Number(age) !== originalUser.age) changed.age = age;
      if (email !== originalUser.email) changed.email = email;

      // Nada mudou? Sai da edição.
      if (Object.keys(changed).length === 0) {
        exitEditMode();
        return;
      }

      // Todos mudaram → PUT (completo)
      // Alguns mudaram → PATCH (parcial)
      const allChanged = Object.keys(changed).length === 3;

      if (allChanged) {
        await updateUser(apiUrl, editingId, { name, age, email });
      } else {
        await patchUser(apiUrl, editingId, changed);
      }
    } else {
      // === MODO CRIAÇÃO ===
      const user = { name, age, email };

      await postUsers(apiUrl, user);
    }

    exitEditMode();
    renderUsers(apiUrl);
  } catch (error) {
    showError(error.message);
  }
});

cancelBtn.addEventListener("click", exitEditMode);
