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

// FUNCIONES UI
function mostrarError(campo, mensaje) {
  campo.classList.remove("valido");
  campo.classList.add("invalido");

  let error = campo.nextElementSibling;
  if (!error || !error.classList.contains("error-msg")) {
    error = document.createElement("div");
    error.classList.add("error-msg");
    campo.insertAdjacentElement("afterend", error);
  }
  error.textContent = mensaje;
}

function mostrarExito(campo) {
  campo.classList.remove("invalido");
  campo.classList.add("valido");

  const error = campo.nextElementSibling;
  if (error && error.classList.contains("error-msg")) {
    error.remove();
  }
}

function validarCampo(campo, regex, mensajeError) {
  if (!regex.test(campo.value.trim())) {
    throw new Error(mensajeError);
  }
  mostrarExito(campo);
}