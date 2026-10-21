const productos = [
    {
        nombre: "Ordenadores Portatles",
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

const galeria = document.getElementById("galeria");
const visor = document.getElementById("visor");
const imagenGrande = document.getElementById("imagenGrande");
const descripcion = document.getElementById("descripcion");

let indiceActual = 0;

// Crear la galería dinámicamente
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

    tarjeta.addEventListener("click", () => {
        abrirImagen(indice);
    });

    galeria.appendChild(tarjeta);
});

// Abrir imagen
function abrirImagen(indice) {
    indiceActual = indice;
    actualizarImagen();
    visor.hidden = false;
    document.body.style.overflow = "hidden";
}

// Actualizar imagen
function actualizarImagen() {
    imagenGrande.src = productos[indiceActual].imagen;
    imagenGrande.alt = productos[indiceActual].nombre;
    descripcion.textContent = productos[indiceActual].nombre;
}

// Imagen siguiente
function siguienteImagen() {
    indiceActual = (indiceActual + 1) % productos.length;
    actualizarImagen();
}

// Imagen anterior
function anteriorImagen() {
    indiceActual =
        (indiceActual - 1 + productos.length) % productos.length;
    actualizarImagen();
}

// Cerrar visor
function cerrarVisor() {
    visor.hidden = true;
    document.body.style.overflow = "";
}

document.getElementById("siguiente")
    .addEventListener("click", siguienteImagen);

document.getElementById("anterior")
    .addEventListener("click", anteriorImagen);

document.getElementById("cerrar")
    .addEventListener("click", cerrarVisor);

// Cerrar al pulsar fuera de la imagen
visor.addEventListener("click", (evento) => {
    if (evento.target === visor) {
        cerrarVisor();
    }
});

// Control mediante teclado
document.addEventListener("keydown", (evento) => {
    if (visor.hidden) return;

    if (evento.key === "Escape") cerrarVisor();
    if (evento.key === "ArrowRight") siguienteImagen();
    if (evento.key === "ArrowLeft") anteriorImagen();
});
