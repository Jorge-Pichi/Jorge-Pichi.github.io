// Obtener los elementos del formulario
const formulario = document.getElementById("formularioPresupuesto");

const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");

const producto = document.getElementById("producto");
const plazo = document.getElementById("plazo");
const extras = document.querySelectorAll(".extra");

const presupuesto = document.getElementById("presupuesto");
const condiciones = document.getElementById("condiciones");
const mensaje = document.getElementById("mensaje");

// CALCULAR PRESUPUESTO
function calcularPresupuesto() {

  let precio = Number(producto.value);
  let meses = Number(plazo.value);
  let totalExtras = 0;
  let descuento = 0;

  // Sumar los extras seleccionados
  extras.forEach(extra => {
    if (extra.checked) {
      totalExtras += Number(extra.value);
    }
  });

  // Aplicar descuento según el plazo
  if (meses >= 3 && meses <= 5) {
    descuento = 0.05;
  } else if (meses >= 6 && meses <= 12) {
    descuento = 0.10;
  }

  // Calcular presupuesto final
  let total = (precio + totalExtras) * (1 - descuento);

  // Mostrar resultado
  presupuesto.value = total.toFixed(2) + " €";
}

// Actualización automática
producto.addEventListener("change", calcularPresupuesto);
plazo.addEventListener("input", calcularPresupuesto);

extras.forEach(extra => {
  extra.addEventListener("change", calcularPresupuesto);
});

// VALIDAR DATOS DE CONTACTO
function validarFormulario() {

  // Nombre: letras y máximo 15 caracteres
  const regexNombre = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+$/;

  // Apellidos: letras y espacios
  const regexApellidos = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;

  // Teléfono: exactamente 9 números
  const regexTelefono = /^[0-9]{9}$/;

  // Correo electrónico
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regexNombre.test(nombre.value.trim()) ||
      nombre.value.trim().length > 15) {
    alert("El nombre debe contener solo letras y máximo 15 caracteres.");
    nombre.focus();
    return false;
  }

  if (!regexApellidos.test(apellidos.value.trim()) ||
      apellidos.value.trim().length > 40) {
    alert("Los apellidos deben contener solo letras y máximo 40 caracteres.");
    apellidos.focus();
    return false;
  }

  if (!regexTelefono.test(telefono.value)) {
    alert("El teléfono debe tener exactamente 9 números.");
    telefono.focus();
    return false;
  }

  if (!regexEmail.test(email.value.trim())) {
    alert("Introduce un correo electrónico válido.");
    email.focus();
    return false;
  }

  if (producto.value === "") {
    alert("Debes seleccionar un producto.");
    producto.focus();
    return false;
  }

  if (plazo.value.trim() === "" ||
      !Number.isInteger(Number(plazo.value)) ||
      Number(plazo.value) < 1 ||
      Number(plazo.value) > 12) {
    alert("El plazo debe estar entre 1 y 12 meses.");
    plazo.focus();
    return false;
  }

  if (!condiciones.checked) {
    alert("Debes aceptar las condiciones de privacidad.");
    return false;
  }

  return true;
}

// ENVIAR FORMULARIO
formulario.addEventListener("submit", function(event) {

  event.preventDefault();

  if (validarFormulario()) {
    mensaje.textContent =
      "Formulario validado correctamente. Presupuesto: " +
      presupuesto.value;
    mensaje.style.color = "green";
  }
});

// RESETEAR FORMULARIO
formulario.addEventListener("reset", function() {

  setTimeout(() => {
    calcularPresupuesto();
    mensaje.textContent = "";
  }, 0);

});
