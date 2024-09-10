
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

    const celdaVer = document.createElement('td'); // Crea celda para la acción de agregar materias
    const botonVerNotas = document.createElement('button');
    botonVerNotas.textContent = "Ver notas";
    botonVerNotas.className = 'btn btn-info btn-sm';
    botonVerNotas.addEventListener('click', () => verNotas(_estudiante));



    const celdaAccion = document.createElement('td'); // Crea celda para la acción de agregar materias
    const botonAgregar = document.createElement('button');
    botonAgregar.textContent = "Agregar Notas";
    botonAgregar.className = 'btn btn-warning btn-sm';
    botonAgregar.addEventListener('click', () => agregarMaterias(_estudiante)); // Añade evento de click al botón para agregar materias
    
    
    celdaAccion.appendChild(botonAgregar); // Añade botón de agregar materias a la celda
     
    fila.appendChild(celdaNumero); // Añade celda de número a la fila
    fila.appendChild(celdaNombre); // Añade celda de nombre a la fila
    fila.appendChild(celdaApellido); // Añade celda de apellido a la fila
    fila.appendChild(celdaDNI); // Añade celda de dni
    fila.appendChild(celdaEdad); // Añade celda de edad a la fila
    fila.appendChild(celdaEmail); // Añade celda de email a la fila
    fila.appendChild(botonVerNotas); // Añade celda de ver notas por alumno
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


let estudianteActual = null;  //Creo variable global para que en el html al dar click en guardar notas 
//se traiga ese estudiante actual al que se quiere cargar las notas 
function agregarMaterias(_estudiante) { /// Ver si pasa el estudiante o hay que hacer otra forma para traerse el estudiante 

  estudianteActual=_estudiante;
    // Mostrar el div para agregar materias
    const agregarList =document.querySelector("#agregarMaterias");
 
   agregarList.removeAttribute("hidden");
    agregarList.style.display="block";
  // Cambiar el título para reflejar el estudiante actual
  document.getElementById("h1Materias").innerHTML = "Agregar notas para " + _estudiante.nombre + " " + _estudiante.apellido;
 
  // Llamar a la función para renderizar la lista de materias
  renderizarListaMaterias(_estudiante); 
  // Ocultar el div de estudiantes
  const estudiantesDiv = document.getElementById("estudiantes");
  estudiantesDiv.style.display = "none"; // Oculta el div
   estudiantesDiv.setAttribute("hidden", ""); // Agrega el atributo hidden

}

function renderizarListaMaterias(_estudiante) {
  const listaElement = document.getElementById('materias-list'); // Asegúrate de que el ID exista en el HTML
  listaElement.innerHTML = ''; // Limpia la lista antes de renderizar

  let i = 1;

  // Recorre la lista de materias y genera las filas con inputs para las notas
  materias.forEach((materia) => {
    const fila = document.createElement('tr'); // Crea una nueva fila

    const celdaNumero = document.createElement('th'); // Crea celda para el número
    celdaNumero.scope = "row";
    celdaNumero.textContent = i++;

    const celdaNombre = document.createElement('td'); // Crea celda para el nombre de la materia
    celdaNombre.textContent = materia;

    const celdaNota = document.createElement('td'); // Crea celda para la nota
    let inputNota = document.createElement('input');
    inputNota.type = "number";
    inputNota.max = 10;
    inputNota.min = 1;
    inputNota.id = `nota-${materia}`; // Dar un ID único basado en la materia
    celdaNota.appendChild(inputNota);

    fila.appendChild(celdaNumero); // Añade celda de número a la fila
    fila.appendChild(celdaNombre); // Añade celda de nombre a la fila
    fila.appendChild(celdaNota); // Añade celda de nota a la fila

    listaElement.appendChild(fila); // Añade fila a la tabla
  });
 
}




 
                  
function guardarNotas(estudiante) { //VER COMO GUARDAR ESTUDIANTE CON SUS MATERIAS Y NOTAS 
  //VER DE HACERLO con un array EstudianteXMaterias donde se almacene otro array estudiante con las notas de cada materias
  //Ver como capturar depende las materias del estudiante su propia nota
  if (!estudiante) {
    alert("Estudiante no proporcionado.");
    return;
  }
  materiasEstudiantes = materiasEstudiantes.filter(m => m.estudiante !== estudiante);
  materias.forEach((materia) => {
    const inputNota = document.getElementById(`nota-${materia}`);
    const nota = inputNota ? inputNota.value : null;

    if (nota) {
      if(nota<11 && nota>0){
      // Carga de array de MateriaEstudiante 
      const materiaEstudiante = new MateriaEstudiante(estudiante, materia, nota);
      materiasEstudiantes.push(materiaEstudiante);
    }
    else{
      alert(`La nota para la materia ${materia} debe ser un número entre 1 y 10.`);
      return;
    }
    } else {
      alert(`Falta agregar la nota para la materia ${materia}.`);
      return;
    }
  });
 
}


function volverEstudiantes() {
  const est = document.getElementById("estudiantes");
  est.removeAttribute("hidden");
  est.style.display = "block"; // Muestra el div de estudiantes
 
  const agregarMateriasDiv = document.getElementById("agregarMaterias");
  agregarMateriasDiv.style.display = "none"; // Oculta el div de agregar materias
  agregarMateriasDiv.setAttribute("hidden", ""); // Agrega el atributo hidden para asegurarse de que esté oculto
}

function verNotas(_estudiante){

   
const notas = document.getElementById("verNotas");
  notas.removeAttribute("hidden");
  notas.style.display = "block"; // Muestra el div de ver notas
  const  listaEst = document.getElementById("estudiantes");
  listaEst.style.display = "none"; // Oculta el div de estudiantes
listaEst.setAttribute("hidden", ""); 
renderizarListaNotas(_estudiante);
}

function renderizarListaNotas(_estudiante) {  //Se llame ne la lista de estudiantes como agregar las notas
  const listaElement = document.getElementById('verNotas-list'); // Asegúrate de que el ID exista en el HTML
  listaElement.innerHTML = ''; // Limpia la lista antes de renderizar
  let i = 1;
  document.getElementById("h1notas").innerHTML = "Agregar materias para " + _estudiante.nombre + " " + _estudiante.apellido;

  // Recorre la lista de materias y genera las filas con inputs para las notas
  const notasEstudiante = materiasEstudiantes.filter((item) => item.persona === _estudiante);
  materiasEstudiantes.forEach((alumno) => {
    const fila = document.createElement('tr'); // Crea una nueva fila

    const celdaNumero = document.createElement('th'); // Crea celda para el número
    celdaNumero.scope = "row";
    celdaNumero.textContent = i++;

    const celdaNombre = document.createElement('td'); // Crea celda para el nombre de la materia
    celdaNombre.textContent = alumno.materia;

    const celdaNota = document.createElement('td'); // Crea celda para la nota
    celdaNota.textContent = alumno.nota;
 
    fila.appendChild(celdaNumero); // Añade celda de número a la fila
    fila.appendChild(celdaNombre); // Añade celda de nombre a la fila
    fila.appendChild(celdaNota); // Añade celda de nota a la fila

    listaElement.appendChild(fila); // Añade fila a la tabla
  });
 
}

function volverEstudiantesdesdeNotas() {
  const est = document.getElementById("estudiantes");
  est.removeAttribute("hidden");
  est.style.display = "block"; // Muestra el div de estudiantes
 
  const agregarMateriasDiv = document.getElementById("verNotas");
  agregarMateriasDiv.style.display = "none"; // Oculta el div de agregar materias
  agregarMateriasDiv.setAttribute("hidden", ""); // Agrega el atributo hidden para asegurarse de que esté oculto
}