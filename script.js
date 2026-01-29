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

function validarCampo(campo, validaciones, mensajeError) {
  if (!validaciones.test(campo.value.trim())) {
    throw new Error(mensajeError);
  }
  mostrarExito(campo);
}

// VALIDACIONES ESPECÍFICAS
function validarNombre() {
  validarCampo(
    campos.nombre,
    validaciones.nombre,
    "El nombre debe tener al menos 3 letras y solo contener letras y espacios"
  );
}

function validarEmail() {
  validarCampo(
    campos.email,
    validaciones.email,
    "Introduce un correo electrónico válido"
  );
}

function validarTelefono() {
  validarCampo(
    campos.telefono,
    validaciones.telefono,
    "El teléfono debe ser un móvil español válido (9 dígitos)"
  );
}

function validarDNI() {
  validarCampo(
    campos.dni,
    validaciones.dni,
    "El DNI debe tener 8 números y una letra mayúscula"
  );
}

function validarPassword() {
  validarCampo(
    campos.password,
    validaciones.password,
    "La contraseña debe tener mínimo 8 caracteres, una mayúscula y un número"
  );
}

function validarPasswordConfirm() {
  if (campos.password.value !== campos.passwordConfirm.value) {
    throw new Error("Las contraseñas no coinciden");
  }
  mostrarExito(campos.passwordConfirm);
}

function validarEdad() {
  const fecha = new Date(campos.birthdate.value);
  if (!campos.birthdate.value) {
    throw new Error("Debes introducir tu fecha de nacimiento");
  }

  // Para calcular correctamente la edad dependiendo si ha cumplido años o no
  const hoy = new Date();
  let edad = hoy.getFullYear() - fecha.getFullYear();
  const mes = hoy.getMonth() - fecha.getMonth();
  if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
    edad--;
  }

  if (edad < 18) {
    throw new Error("Debes ser mayor de 18 años para registrarte");
  }

  mostrarExito(campos.birthdate);
}
