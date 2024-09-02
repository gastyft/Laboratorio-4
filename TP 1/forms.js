function validarString(str) {
  // Expresión para verificar si el string contiene solo letras, espacios y acentos
  const pattern = /^[a-zA-Z\u00C0-\u017F\s]*$/;
  if (str.length > 20) {
    return false;
  }
  return pattern.test(str);
}

function validarEmail(email) {
  // Expresión para verificar si el email tiene un formato válido
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Si el email no tiene un formato válido, retorna falso
  if (!pattern.test(email)) {
    return false;
  }

  // Extraer el dominio del email
  const domain = email.split("@")[1];

  // Lista de dominios válidos
  const validDomains = ["gmail.com", "outlook.com", "icloud.com"];

  // Verificar si el dominio está en la lista de dominios válidos
  return validDomains.includes(domain);
}

function validarEdades(edad) {
  if (edad < 100 && edad > 0) return true;
}
function mostrarAlertaError(str) {
    swal("Ups!", "Error en el campo "+str, "error");
    
  }
  
  
  function mostrarAlertaSuccess() {
    swal("Good job!", "Datos correctos", "success");
  }
function validarContraseña(password) {
  // Verificar la longitud de la contraseña
  if (password.length < 9 || password.length > 20) {
    return false;
  }

  // Expresión regular para verificar que la contraseña tenga al menos una letra mayúscula
  const mayuscula = /[A-Z]/;
  if (!mayuscula.test(password)) {
    return false;
  }

  // Expresión regular para verificar que la contraseña tenga al menos una letra minúscula
  const minuscula = /[a-z]/;
  if (!minuscula.test(password)) {
    return false;
  }

  // Expresión regular para verificar que la contraseña tenga al menos un número
  const numero = /[0-9]/;
  if (!numero.test(password)) {
    return false;
  }

  // Si la contraseña cumple con todas las validaciones, retorna true
  return true;
}

function chequear() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const edad = document.getElementById("edad").value;
    const contraseña = document.getElementById("contraseña").value;
    const email = document.getElementById("email").value;
  if (!validarString(nombre)) {
    mostrarAlertaError(nombre);
  }

  if (!validarString(nombre)) {
    mostrarAlertaError("Nombre");
    return;
  }

  if (!validarString(apellido)) {
    mostrarAlertaError("Apellido");
    return;
  }

  if (!validarEdades(edad)) {
    mostrarAlertaError("Edad");
    return;
  }

  if (!validarContraseña(contraseña)) {
    mostrarAlertaError("Contraseña");
    return;
  }

  if (!validarEmail(email)) {
    mostrarAlertaError("Email");
    return;
  }

  mostrarAlertaSuccess();
 
}
document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('contraseña');
    
    togglePassword.addEventListener('click', function () {
        // Alternar el tipo de entrada entre 'password' y 'text'
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;
        
        // Alternar el ícono entre 'eye' y 'eye-slash'
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});

let productos = [];

const producto1 = "Primer producto";
const producto2 = "Segundo producto";
const producto3 = "Tercer producto";
const producto4 = "Cuarto producto";


 
 
  function agregarProducto(producto) {
    if (!productos.includes(producto)) {
        productos.push(producto);
        console.log(productos);
        renderizarListaDeseados();
    } else {
      swal("Ups!", "Este producto ya está en la lista de deseados.", "warning");
        
    }
}

function renderizarListaDeseados() {
  const listaElement = document.getElementById('product-list');
  listaElement.innerHTML = ''; // Limpia la lista antes de renderizar
let i=1;
productos.forEach((producto) => {
  const fila = document.createElement('tr'); // Crea una nueva fila
            
  const celdaNumero = document.createElement('th'); // Crea celda para el número
  celdaNumero.scope = "row";
  celdaNumero.textContent = i++;
  
  const celdaNombre = document.createElement('td'); // Creacelda para el nombre del producto
  celdaNombre.textContent = producto;
  
  fila.appendChild(celdaNumero); // Añade celda de número a la fila
  fila.appendChild(celdaNombre); // Añade celda de nombre a la fila
  
  listaElement.appendChild(fila); // Añade fila a la tabla
  });
}
