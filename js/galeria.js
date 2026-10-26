// Array con los productos de la galería
const productos = [
  {
    nombre: "Ordenadores Portátiles",
    imagen: "../imagenes/ordenadoresPortatiles.png"
  },
  {
    nombre: "Ordenadores Sobremesa",
    imagen: "../imagenes/ordenadoresSobremesa.png"
  },
  {
    nombre: "Piezas de Ordenador",
    imagen: "../imagenes/piezasOrdenador.png"
  }
];

// Obtener los elementos HTML
const galeria = document.getElementById("galeria");
const visor = document.getElementById("visor");
const imagenGrande = document.getElementById("imagenGrande");
const descripcion = document.getElementById("descripcion");

const cerrar = document.getElementById("cerrar");
const anterior = document.getElementById("anterior");
const siguiente = document.getElementById("siguiente");

let indiceActual = 0;

// CREAR GALERÍA DINÁMICAMENTE
productos.forEach((producto, indice) => {

  const tarjeta = document.createElement("div");
  tarjeta.classList.add("producto");

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  imagen.loading = "lazy";

  const titulo = document.createElement("h3");
  titulo.textContent = producto.nombre;

  tarjeta.appendChild(imagen);
  tarjeta.appendChild(titulo);

  // Abrir imagen al pulsar
  tarjeta.addEventListener("click", () => {
    abrirVisor(indice);
  });

  galeria.appendChild(tarjeta);
});

// ABRIR VISOR
function abrirVisor(indice) {
  indiceActual = indice;
  mostrarImagen();
  visor.hidden = false;
}

// MOSTRAR IMAGEN
function mostrarImagen() {
  imagenGrande.src = productos[indiceActual].imagen;
  imagenGrande.alt = productos[indiceActual].nombre;
  descripcion.textContent = productos[indiceActual].nombre;
}

// CERRAR VISOR
cerrar.addEventListener("click", () => {
  visor.hidden = true;
});

// IMAGEN ANTERIOR
anterior.addEventListener("click", () => {
  indiceActual =
    (indiceActual - 1 + productos.length) % productos.length;

  mostrarImagen();
});

// IMAGEN SIGUIENTE
siguiente.addEventListener("click", () => {
  indiceActual = (indiceActual + 1) % productos.length;

  mostrarImagen();
});

// Cerrar pulsando fuera de la imagen
visor.addEventListener("click", (event) => {
  if (event.target === visor) {
    visor.hidden = true;
  }
});

// Controles del teclado
document.addEventListener("keydown", (event) => {

  if (visor.hidden) return;

  if (event.key === "Escape") {
    visor.hidden = true;
  }

  if (event.key === "ArrowRight") {
    siguiente.click();
  }

  if (event.key === "ArrowLeft") {
    anterior.click();
  }

});
