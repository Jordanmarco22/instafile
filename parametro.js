// Obtén la URL actual
const urlActual = window.location.href;

// Verifica si el parámetro 'carpeta' ya está presente en la URL
const parametros = new URLSearchParams(window.location.search);
let carpetaNombre = parametros.get("_");

if (!carpetaNombre) {
  // Si 'carpeta' no está presente, genera una cadena aleatoria
  carpetaNombre = generarCadenaAleatoria();
  // Agrega el parámetro 'carpeta' a la URL
  const urlConParametro = urlActual.includes("?")
    ? `${urlActual}&_=${carpetaNombre}`
    : `${urlActual}?_=${carpetaNombre}`;
  // Redirige a la nueva URL con el parámetro 'carpeta'
  window.location.href = urlConParametro;
} else {
  // Llama a la función para crear la carpeta con el nombre obtenido
  crearCarpeta(carpetaNombre);
}

// Función para generar una cadena aleatoria
function generarCadenaAleatoria() {
  const caracteres = "abcdefghijklmnopqrstuvwxyz0123456789";
  let cadenaAleatoria = "";
  for (let i = 0; i < 3; i++) {
    const caracterAleatorio = caracteres.charAt(
      Math.floor(Math.random() * caracteres.length)
    );
    cadenaAleatoria += caracterAleatorio;
  }
  return cadenaAleatoria;
}

// Función para crear la carpeta
function crearCarpeta(carpetaNombre) {
  $.ajax({
    url: "crearCarpeta.php",
    type: "POST",
    data: { nombreCarpeta: carpetaNombre },
    success: function (response) {
      console.log("Carpeta creada con éxito:", response);
    },
    error: function (xhr, status, error) {
      console.error("Error al crear la carpeta:", error);
    },
  });
}

// Función para manejar el evento de envío del formulario
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const fileInput = document.querySelector("#archivo");
  const files = fileInput.files;
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      console.log("Subir archivo:", files[i].name);
    }
    e.target.submit();
  } else {
    alert("Por favor, seleccione un archivo primero.");
  }
});

// DROP AREA

// Obtén la zona de arrastre y el formulario
const dropArea = document.getElementById("drop-area");

// Agrega los siguientes eventos a la zona de arrastre
dropArea.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropArea.classList.add("drag-over");
});

dropArea.addEventListener("dragleave", () => {
  dropArea.classList.remove("drag-over");
});

dropArea.addEventListener("drop", (e) => {
  e.preventDefault();
  dropArea.classList.remove("drag-over");
  const files = e.dataTransfer.files;
  handleFiles(files);
});

// Función para manejar los archivos seleccionados
function handleFiles(files) {
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      console.log("Archivo seleccionado:", files[i].name);
    }
    const fileInput = document.querySelector("#archivo");
    fileInput.files = files;
    document.getElementById("form").submit();
  }
}