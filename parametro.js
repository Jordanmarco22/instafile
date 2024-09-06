
// Obtén la URL actual
const urlActual = window.location.href;

// Verifica si el parámetro 'nombre' ya está presente en la URL
var parametros = new URLSearchParams(window.location.search);
var carpetaNombre = parametros.get("nombre");

if (!carpetaNombre) {
    // Si 'nombre' no está presente, genera un número aleatorio
    carpetaNombre = generarCadenaAleatoria();
    // Agrega el parámetro 'nombre' a la URL
    const urlConParametro = urlActual.includes("?") ? `${urlActual}&nombre=${carpetaNombre}` : `${urlActual}?nombre=${carpetaNombre}`;
    // Redirige a la nueva URL con el parámetro 'nombre'
    window.location.href = urlConParametro;
} else {
  // Llama a la función para crear la carpeta con el nombre obtenido
  crearCarpeta(carpetaNombre);
}

   
    


// Función para generar un número aleatorio de 3 dígitos
function generarCadenaAleatoria() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let cadenaAleatoria = '';
    for (let i = 0; i < 3; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        cadenaAleatoria += caracterAleatorio;
    }
    return cadenaAleatoria;
}


// //BARRA DE PROGRESO 

function uploadFile(file) {
    const formData = new FormData();
    formData.append('archivo', file);
  
    const xhr = new XMLHttpRequest();
    const progressContainer = document.getElementById('progress-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
  
    xhr.upload.onprogress = function (event) {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        progressBar.style.width = percentComplete + '%';
        progressText.textContent = Math.round(percentComplete) + '% cargado';
      }
    };
  
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log('Archivo subido con éxito');
        progressContainer.style.display = 'none';
      } else {
        console.error('Error al subir el archivo');
      }
    };
  
    xhr.open('POST', 'upload.php', true);
    progressContainer.style.display = 'block';
    xhr.send(formData);
  }
  
  // Actualiza la función handleFile para utilizar uploadFile
  function handleFile(file) {
    if (file) {
      uploadFile(file);
    }
  }
//DROP AREA

// Obtén la zona de arrastre y el formulario
const dropArea = document.getElementById('drop-area');
const Form = document.getElementById('form');

// Agrega los siguientes eventos a la zona de arrastre
dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropArea.classList.add('drag-over');
});

dropArea.addEventListener('dragleave', () => {
    dropArea.classList.remove('drag-over');
});
//Para mejorar el evento arrastre
dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    dropArea.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    handleFileInput(files);
  });
  
// Función para manejar el archivo seleccionado
function handleFile(file) {
    if (file) {
        // Realiza alguna acción, como mostrar el nombre del archivo
        console.log('Archivo seleccionado:', file.name);

        // También puedes realizar otras acciones, como subir el archivo al servidor
        // Puedes agregar aquí el código para subir el archivo si lo deseas
    }
}

// Agrega esta función para manejar el evento de envío del formulario
Form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fileInput = Form.querySelector('#archivo');
    const file = fileInput.files[0];
    if (file) {
        // Puedes enviar el archivo al servidor para su procesamiento aquí
        console.log('Subir archivo:', file.name);
    } else {
        alert('Por favor, seleccione un archivo primero.');
    }
});

function actualizarListaArchivos() {
    fetch('listaArchivos.php')
      .then(response => response.json())
      .then(data => {
        // Actualiza la lista de archivos en la página
        const fileList = document.getElementById('file-list');
        fileList.innerHTML = '';
        data.forEach(file => {
          fileList.innerHTML += `<div class='archivos_subidos'>
                                    <div><a href='descarga/${file}' download class='boton-descargar'>${file}</a></div>
                                    <div>
                                      <form action='' method='POST' style='display:inline;'>
                                        <input type='hidden' name='eliminarArchivo' value='${file}'>
                                        <button type='submit' class='btn_delete'>
                                          <!-- SVG icon -->
                                        </button>
                                      </form>
                                    </div>
                                  </div>`;
        });
      });
  }
  
  // Actualiza la lista de archivos cada 5 segundos
  setInterval(actualizarListaArchivos, 5000);
//Cargas multiples
function handleFileInput() {
  const files = document.getElementById('archivos').files;
  Array.from(files).forEach(file => {
    uploadFile(file);
  });
}

document.getElementById('archivos').addEventListener('change', handleFileInput);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registrado con éxito:', registration);
    }).catch(error => {
      console.log('Error al registrar el ServiceWorker:', error);
    });
  });
}