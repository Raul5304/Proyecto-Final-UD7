const form = document.querySelector("form");
const submitBtn = form.querySelector("button");

const campos = {
  nombre: document.getElementById("name"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  passwordConfirm: document.getElementById("passwordConfirm"),
  telefono: document.getElementById("tlf"),
  dni: document.getElementById("dni"),
  birthdate: document.getElementById("birthdate"),
  terms: document.getElementById("terms")
};

// REGEX
const validaciones = {
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{3,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  telefono: /^[679]\d{8}$/,
  dni: /^\d{8}[A-Z]$/,
  password: /^(?=.*[A-Z])(?=.*\d).{8,}$/
};