class Employee {
  constructor(employeeId, companyId, firstName, lastName, email) {
    this.employeeId = employeeId;
    this.companyId = companyId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}

class Company {
  constructor(companyId, name) {
    this.companyId = companyId;
    this.name = name;
  }
}

let arrEmpl = [];
let arrComp = [];

let url = "https://utn-lubnan-api-1.herokuapp.com/api";


function mostrarError(str) {
  swal("Ups!", "Error en el campo " + str, "error");
}

function mostrarSuccess(str) {
  swal("Operación exitosa", str, "success");
}


function apiGetEmployees() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
 
    xhr.open('GET', url+ "/Employee");
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);  // Resolver la promesa con la respuesta
      } else {
        reject(new Error("Error: "+ xhr.status));  // Rechazar si el estado no es exitoso
      }
    };

    xhr.onerror = function() {
      reject(new Error('Error de red'));  // Rechazar si hay un error de red
    };

    xhr.send();
  });
}

// Conectar con el API y obtener los datos
function connectEmployee() {
 return apiGetEmployees()
    .then(data => {
      arrEmpl =  JSON.parse(data);  // Asumimos que la respuesta es JSON
      console.log(arrEmpl);  // Mostrar los datos de la compañía
    })
    .catch(error => {
      console.error('Error obteniendo las empleados:', error);
    });
}

function apiGetCompany() {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
 
    xhr.open('GET', url + "/Company");
    
    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);  // Resolver la promesa con la respuesta
      } else {
        reject(new Error("Error: "+ xhr.status));  // Rechazar si el estado no es exitoso
      }
    };

    xhr.onerror = function() {
      reject(new Error('Error de red'));  // Rechazar si hay un error de red
    };

    xhr.send();
  });
}

// Conectar con el API y obtener los datos
function connectCompany() {
 return apiGetCompany()
    .then(data => {
      arrComp = JSON.parse(data);  // Asumimos que la respuesta es JSON
      console.log(arrComp);  // Mostrar los datos de la compañía
    })
    .catch(error => {
      console.error('Error obteniendo las compañías:', error);
    });
}
 /* return fetch(url + "/Company")
    .then((response) => response.json())
    .then((data) => {
      arrComp = data;
    })
    .catch((err) => {
      console.error("Error:", err);
      mostrarError("Error al obtener compañías");
    });
}

*/


async function promiseGets() {
  await Promise.all([connectEmployee(), connectCompany()]);
}


function renderizarEmployees() {
  const listaElement = document.getElementById("verEmployees-list");
  listaElement.innerHTML = ""; // Limpia la lista antes de renderizar
  let i = 1;
  document.getElementById("h1Employees").innerHTML = "Ver Empleados";

  arrEmpl.forEach((employee) => {
    let strCompany = "";
    for (let company of arrComp) {
      if (company.companyId === employee.companyId) {
        strCompany = company.name;
        break; 
      }
    }

    const fila = document.createElement("tr"); // Crea una nueva fila

    const celdaNumero = document.createElement("th"); // Crea celda para el número
    celdaNumero.scope = "row";
    celdaNumero.textContent = i++;

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = employee.firstName;

    const celdaApellido = document.createElement("td");
    celdaApellido.textContent = employee.lastName;

    const celdaCompany = document.createElement("td");
    celdaCompany.textContent = strCompany;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.type = "button";
    botonEliminar.className = "btn btn-danger";
    botonEliminar.addEventListener("click", () =>
      eliminarEmployee(employee.employeeId)
    );

    // Añadimos las celdas a la fila
    fila.appendChild(celdaNumero);
    fila.appendChild(celdaNombre);
    fila.appendChild(celdaApellido);
    fila.appendChild(celdaCompany);
    fila.appendChild(botonEliminar);

    // Añadimos la fila a la tabla
    listaElement.appendChild(fila);
  });
}




function buscar() {
  const buscar = document.getElementById("buscar");
  let arrBuscar = [];
  // Agregar el eventListener para capturar el evento "Enter"
  buscar.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      arrBuscar = arrEmpl.filter(
        (employee) =>
          employee.firstName
            .toLowerCase()
            .includes(buscar.value.toLowerCase()) ||
          employee.lastName.toLowerCase().includes(buscar.value.toLowerCase())
      );

      const listaElement = document.getElementById("verEmployees-list");
      listaElement.innerHTML = ""; // Limpia la lista antes de renderizar
      let i = 1;
      document.getElementById("h1Employees").innerHTML = "Ver Empleados";

      arrBuscar.forEach((employee) => {
        let strCompany = "";
        for (let company of arrComp) {
          if (company.companyId === employee.companyId) {
            strCompany = company.name;
            break;
          }
        }

        const fila = document.createElement("tr"); // Crea una nueva fila

        const celdaNumero = document.createElement("th");
        celdaNumero.scope = "row";
        celdaNumero.textContent = i++;

        const celdaNombre = document.createElement("td");
        celdaNombre.textContent = employee.firstName;

        const celdaApellido = document.createElement("td");
        celdaApellido.textContent = employee.lastName;

        const celdaCompany = document.createElement("td");
        celdaCompany.textContent = strCompany;

        let botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.className = "btn btn-danger";
        botonEliminar.textContent = "Eliminar";
  
     
        botonEliminar.addEventListener("click", () =>
          eliminarEmployee(employee.employeeId)
        );

        // Añadimos las celdas a la fila
        fila.appendChild(celdaNumero);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellido);
        fila.appendChild(celdaCompany);
        fila.appendChild(botonEliminar);
        // Añadimos la fila a la tabla
        listaElement.appendChild(fila);
      });
    }
  });
}

function limpiarBusqueda() {
  const buscar = document.getElementById("buscar");
  buscar.value = "";
  renderizarEmployees();
}


function botonCrear() {
  const botonCrear = document.getElementById("form");
  botonCrear.removeAttribute("hidden");
  botonCrear.style.display = "block"; // Muestra el form
  
  const listaEmp = document.getElementById("verEmployees");
  listaEmp.style.display = "none"; // Oculta la lista de empleados
  listaEmp.setAttribute("hidden", "");

  const button=document.getElementById("botonCrear");
  button.style.display = "none"; 
  button.setAttribute("hidden","");

  const ocultarBuscar = document.getElementById("divBuscar");
  ocultarBuscar.style.display = "none"; // Oculta la búsqueda
  ocultarBuscar.setAttribute("hidden", "");
}
function botonVolver() {
  const botonCrear = document.getElementById("verEmployees");
  botonCrear.removeAttribute("hidden");
  botonCrear.style.display = "block"; // Muestra el form
  const listaEmp = document.getElementById("form");
  listaEmp.style.display = "none"; // Oculta la lista de empleados
  listaEmp.setAttribute("hidden", "");
  const button = document.getElementById("botonCrear");
  button.style.display = "block";
  button.removeAttribute("hidden");

  const ocultarBuscar = document.getElementById("divBuscar");
  ocultarBuscar.style.display = "block"; // Muestra la búsqueda
  ocultarBuscar.removeAttribute("hidden");
}



function crearEmployee() {
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault();
 
    // Recoge los valores del formulario
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = "gastyftacla1@gmail.com"; // Puedes ajustar esto según sea necesario
    const companyId = parseInt(document.getElementById("companyId").value, 10);

    // Crea el objeto empleado
    const employee = {
      employeeId: 0, // como se genera autoincremental y ese valor pisa lo que se le pase, con poner 0 para todos va bien
      companyId: companyId,
      firstName: firstName,
      lastName: lastName,
      email: email,
    };

    // Envía la solicitud POST
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url + "/Employee", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        try {
          if (xhr.status === 200) {
            // Solo intenta parsear si hay datos en la respuesta
            const responseText = xhr.responseText;
            mostrarSuccess("Se creo correctamente");
            init();
            botonVolver();
          } else {
            mostrarError("No se pudo crear el empleado");
            console.error(
              "Error:",
              xhr.status,
              xhr.statusText,
              xhr.responseText
            );
          }
        } catch (e) {
          console.error("Error parsing JSON:", e.message);
        }
      }
    };

    xhr.send(JSON.stringify(employee)); // Convierte el objeto a una cadena JSON
});
  }


  function cargarCompanies(){
    const selectList =document.getElementById("companyId");
    
    arrComp.forEach(company=>{
      const crearCompany = document.createElement("option");
      crearCompany.textContent = company.name;
      crearCompany.value =company.companyId;
    
      selectList.appendChild(crearCompany);
    
    });
    }
  
function eliminarEmployee(employeeId) {
  // Envía la solicitud DELETE
  const xhr = new XMLHttpRequest(); 
  xhr.open("DELETE", url + `/Employee/${employeeId}`, true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      try {
        if (xhr.status === 200) {
          // Solo intenta parsear si hay datos en la respuesta
          const responseText = xhr.responseText;
          mostrarSuccess("Se elimino correctamente");
          init();
        } else {
            mostrarError("No se pudo eliminar el empleado")
          console.error("Error:", xhr.status, xhr.statusText, xhr.responseText);
        }
      } catch (e) {
        console.error("Error parsing JSON:", e.message);
      }
    }
  };

  xhr.send(); // No se necesita cuerpo para una solicitud DELETE
}

async function init() {
  try{
    await promiseGets();
    renderizarEmployees();
    cargarCompanies();
  }
  catch(e){
    mostrarError("Error al obtener empleados o compañías");
  }
}

window.onload = init; // INIT PARA QUE RENDERiCE LOS DATOS DE LA API NI BIEN SE RECARGA LA PAGINA


/* 
 for(let i=0; i<1001;i++){
 
         eliminarEmployee(i); 
     }

 */

 /* 
     
 for(let i=0; i<10;i++){

     const employee = {
                employeeId: 0,  // como se genera autoincremental y ese valor pisa lo que se le pase, con poner 0 para todos va bien
                companyId: 1,
                firstName: "Gastón",
                lastName: "Ftacla",
                email: "gastyftacla1@gmail.com",
            };
    
            // Envía la solicitud POST
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url+'/Employee', true);
            xhr.setRequestHeader('Content-Type', 'application/json');
    
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    try {
                        if (xhr.status === 200) {
                            // Solo intenta parsear si hay datos en la respuesta
                            const responseText = xhr.responseText;
                            if (responseText) {
                                console.log('Success:', JSON.parse(responseText));
                            } else {
                                console.log('Success: No content returned');
                            }
                        } else {
                            console.error('Error:', xhr.status, xhr.statusText, xhr.responseText);
                        }
                    } catch (e) {
                        console.error('Error parsing JSON:', e.message);
                    }
                }
            };
    
            xhr.send(JSON.stringify(employee)); // Convierte el objeto a una cadena JSON
        }  
             
   */
