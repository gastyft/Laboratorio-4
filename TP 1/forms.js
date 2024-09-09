
class person{ 
  constructor(nombre,apellido, edad,dni, email, contraseña,fechaNac){


this.nombre=nombre;
this.apellido=apellido;
this.contraseña=contraseña;
this.email=email;
this.dni=dni;
this.edad=edad;
this.fechaNac=fechaNac;


}
}

let arrayStd=[];

function capitalizeFirstLetter(str) { //Con ayudin
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function capitalizeWords(str) { //Con ayudin
  return str
      .split(' ')           // Divide la cadena en un array por espacios
      .map(word => capitalizeFirstLetter(word)) // Capitaliza cada palabra
      .join(' ');           // Une las palabras de nuevo en una sola cadena
}

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

function calcularEdad(fechaNac) {
  // Obtener la fecha de nacimiento
  const fechaNacimiento = new Date(fechaNac);
  
  // Obtener la fecha actual
  const fechaActual = new Date();
  
  // Calcular la diferencia en años
  let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
  
  // Obtener mes y día de ambas fechas
  const mesActual = fechaActual.getMonth(); // Mes actual (0-11)
  const mesNacimiento = fechaNacimiento.getMonth(); // Mes de nacimiento (0-11)
  const diaActual = fechaActual.getDate(); // Día actual
  const diaNacimiento = fechaNacimiento.getDate(); // Día de nacimiento
  
  // Ajustar si el cumpleaños aún no ha pasado este año
  if (mesNacimiento > mesActual || (mesNacimiento === mesActual && diaNacimiento > diaActual)) {
      edad--; // La persona no ha cumplido años aún este año, restar uno
  }
  
  return edad;
}
 
function validarFecha(fecha) { 
  // Convertir la fecha de nacimiento a Date object
  const fechaNacimiento = new Date(fecha);
    
  const anioNacimiento = parseInt(fechaNacimiento.getFullYear());
  // Verificar que la fecha no sea futura
  if (fechaNacimiento <= Date.now() && anioNacimiento >= 1985) return true;

 
   //validacion para que al validar la edad esta sea razonable
  return false;

  
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
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value ;
    const contraseña = document.getElementById("contraseña").value.trim();
    const email = document.getElementById("email").value.trim();
    const fechaNac = document.getElementById("fechaNac").value;
    const dni = document.getElementById("dni").value;
  
    nombre = capitalizeWords(nombre);
    apellido = capitalizeWords(apellido);

  if (!validarString(nombre) || nombre.length == 0) {
    mostrarAlertaError("Nombre");
    return;
  }

  if (!validarString(apellido) || apellido.length==0) {
    mostrarAlertaError("Apellido");
    return;
  }

  if (!validarFecha(fechaNac)) {
    mostrarAlertaError("Fecha de nacimiento");
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

  if(!validarDNI(dni)){
    mostrarAlertaError("DNI");
    return;
  }
  if(calcularEdad(fechaNac)<18) {
    mostrarAlertaError("El alumno debe ser mayor de edad");
  return;
  }
  //agregar a array y calcula edad 
  agregarArray(new person(nombre,apellido,calcularEdad(fechaNac),dni,email,contraseña,fechaNac));
  //limpiar los campos
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("contraseña").value = "";
  document.getElementById("email").value = "";
  document.getElementById("fechaNac").value = "";
  document.getElementById("dni").value = "";
  //mostrar alerta de exito
  //agregar a array
  //limpiar los campos
  //mostrar alerta de exito
  renderizarListaEstudiantes();
     mostrarAlertaSuccess();

 
}

function finalizarCargaAlumnos(){
document.querySelector(".form-horizontal").style.display="none";   
const estudiantesDiv = document.getElementById("estudiantes");
estudiantesDiv.style.display = "block";
estudiantesDiv.removeAttribute("hidden"); // Elimina el atributo hidden
}

function volverForm(){
  document.querySelector(".form-horizontal").style.display="block";   
  const estudiantesDiv = document.getElementById("estudiantes");
  estudiantesDiv.style.display = "none";
  estudiantesDiv.setAttribute("hidden", ""); // Agrega el atributo hidden
}

function agregarArray(obj){
  arrayStd.push(obj);
}

document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById('togglePassword');
    const passwordField = document.getElementById('contraseña');
    
    togglePassword.addEventListener('click', function () {
        // Alternar el tipo de entrada entre 'password' y 'text'
        const type = passwordField.type === 'password' ? 'text' : 'password';
        passwordField.type = type;
        
        // Alternar el ícono entre 'eye' y 'eye-slash'
        const icon = togglePassword.querySelector('i'); //con Font Awesome
        icon.classList.toggle('fa-eye');      
        icon.classList.toggle('fa-eye-slash');
    });
});


function ordenarAlfabetic(){
  arrayStd.sort((a, b) => a.apellido.localeCompare(b.apellido));
}
function renderizarListaEstudiantes() {
  const listaElement = document.getElementById('estudiantes-list');
  listaElement.innerHTML = ''; // Limpia la lista antes de renderizar
  let i = 1;
  //function para ordenar la lista alfabeticamente
  ordenarAlfabetic();
  arrayStd.forEach((_estudiante) => {
    const fila = document.createElement('tr'); // Crea una nueva fila
            
    const celdaNumero = document.createElement('th'); // Crea celda para el número
    celdaNumero.scope = "row";
    celdaNumero.textContent = i++;
    
    const celdaNombre = document.createElement('td'); // Crea celda para el nombre del estudiante
    celdaNombre.textContent = _estudiante.nombre;

    const celdaApellido = document.createElement('td'); // Crea celda para el apellido
    celdaApellido.textContent = _estudiante.apellido;
    
    const celdaDNI = document.createElement('td'); // Crea celda para el dni
    celdaDNI.textContent = _estudiante.dni;

    const celdaEdad = document.createElement('td'); // Crea celda para la edad
    celdaEdad.textContent = _estudiante.edad;

    const celdaEmail = document.createElement('td'); // Crea celda para el email
    celdaEmail.textContent = _estudiante.email;

    const celdaAccion = document.createElement('td'); // Crea celda para la acción de agregar materias
    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = "Agregar Materias";
    botonAgregar.className = 'btn btn-warning btn-sm';
    botonAgregar.addEventListener('click', () => agregarMaterias(_estudiante)); // Añade evento de click al botón para agregar materias
    
    
    celdaAccion.appendChild(botonAgregar); // Añade botón de agregar materias a la celda
     
    fila.appendChild(celdaNumero); // Añade celda de número a la fila
    fila.appendChild(celdaNombre); // Añade celda de nombre a la fila
    fila.appendChild(celdaApellido); // Añade celda de apellido a la fila
    fila.appendChild(celdaDNI); // Añade celda de dni
    fila.appendChild(celdaEdad); // Añade celda de edad a la fila
    fila.appendChild(celdaEmail); // Añade celda de email a la fila
    fila.appendChild(celdaAccion);
    listaElement.appendChild(fila); // Añade fila a la tabla
  });
}


function validarDNI(dni) { //Valida el dni que este entre cierto rango
  if (dni < 2000000 || dni > 70000000) {
    // Si el DNI está fuera del rango, 
 //   alert('El DNI debe estar entre 2000000 y 70000000');
  return false;
  }
  else 
  return true;
}
///
///
///
///         PARTE 2
///
///
class MateriaEstudiante {
  constructor(estudiante, materia, nota) {
    this.estudiante = estudiante;
    this.materia = materia;
    this.nota = nota;
  }
}

let materiasEstudiantes = [];
let materias = [];

const materia1 = "Matemática";
const materia2 = "Geografía";
const materia3 = "Historia";
const materia4 = "Literatura";

materias.push(materia1, materia2, materia3, materia4);

function agregarMaterias(estudiante) {
  document.getElementById("agregarMaterias").style.display = "block";   
  const estudiantesDiv = document.getElementById("estudiantes");
  estudiantesDiv.style.display = "none";
  estudiantesDiv.setAttribute("hidden", ""); // Agrega el atributo hidden
  document.getElementById("h1Materias").innerHTML = "Agregar materias para " + estudiante.nombre + " " + estudiante.apellido;
  
  renderizarListaMaterias(estudiante); // Llamamos con el estudiante actual
}

function renderizarListaMaterias(estudiante) {
  const listaElement = document.getElementById('materias-list');
  listaElement.innerHTML = ''; // Limpia la lista antes de renderizar
  let i = 1;

  materias.forEach((materia) => {
    const fila = document.createElement('tr'); // Crea una nueva fila

    const celdaNumero = document.createElement('th'); // Crea celda para el número
    celdaNumero.scope = "row";
    celdaNumero.textContent = i++;

    const celdaNombre = document.createElement('td'); // Crea celda para el nombre de la materia
    celdaNombre.textContent = materia;

    const celdaNota = document.createElement('td'); // Crea celda para la nota
    const inputNota = document.createElement('input');
    inputNota.type = "number";
    inputNota.className="form-control";
    inputNota.max = 10;
    inputNota.min = 1;
    inputNota.required = true;
    celdaNota.appendChild(inputNota);

    fila.appendChild(celdaNumero); // Añade celda de número a la fila
    fila.appendChild(celdaNombre); // Añade celda de nombre a la fila
    fila.appendChild(celdaNota); // Añade celda de nota a la fila

    listaElement.appendChild(fila); // Añade fila a la tabla


  });

  // Añadimos un botón para guardar las notas
  const guardarNotasBtn = document.createElement('button');
  guardarNotasBtn.textContent = 'Guardar Notas';
  guardarNotasBtn.addEventListener('click', () => guardarNotas(estudiante));
  listaElement.appendChild(guardarNotasBtn);

}

function guardarNotas(estudiante) { //VER COMO GUARDAR ESTUDIANTE CON SUS MATERIAS Y NOTAS 
  //VER DE HACERLO con un array EstudianteXMaterias donde se almacene otro array estudiante con las notas de cada materias
  materias.forEach((materia) => {
    const inputNota = document.getElementById(`nota-${materia}`);
    const nota = inputNota ? inputNota.value : null;

    if (nota) {
      // Crear una nueva instancia de MateriaEstudiante con la nota y el estudiante actual
      const materiaEstudiante = new MateriaEstudiante(estudiante, materia, nota);
      materiasEstudiantes.push(materiaEstudiante);
    }
  });
 
}



function volverForm(){
  document.querySelector(".form-horizontal").style.display="block";   
  const estudiantesDiv = document.getElementById("estudiantes");
  estudiantesDiv.style.display = "none";
  estudiantesDiv.setAttribute("hidden", ""); // Agrega el atributo hidden
}