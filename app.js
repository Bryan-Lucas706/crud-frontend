import { getUsers } from "/scripts/get.js";
import { postUsers } from "./scripts/api/post.js";

const apiUrl = "http://localhost:8000/api/users";
const submitBtn = document.getElementById("submitBtn");

getUsers(apiUrl);

async function CreateUser(event) {
  event.preventDefault();
  let name = document.getElementById("name").value;
  let age = document.getElementById("age").value;
  let email = document.getElementById("email").value;

  await postUsers(apiUrl, name, age, email);
  await getUsers(apiUrl);
}

submitBtn.addEventListener("click", CreateUser);
