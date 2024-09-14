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
    return fetch(url + "/Employee")
        .then(response => response.json())
        .then(data => {
            arrEmpl = data;
            mostrarSuccess("Carga exitosa de empleados");
        })
        .catch(err => {
            console.error('Error:', err);
            mostrarError("Error al obtener empleados");
        });
}

function apiGetCompany() {
    return fetch(url + "/Company")
        .then(response => response.json())
        .then(data => {
            arrComp = data;
        })
        .catch(err => {
            console.error('Error:', err);
            mostrarError("Error al obtener compañías");
        });
}

async function promiseGets() {
    await Promise.all([apiGetEmployees(), apiGetCompany()]);
}

function renderizarEmployees() {
    const listaElement = document.getElementById('verEmployees-list');
    listaElement.innerHTML = ''; // Limpia la lista antes de renderizar
    let i = 1;
    document.getElementById("h1Employees").innerHTML = "Ver Empleados";

    arrEmpl.forEach((employee) => {
        let strCompany = '';
        for (let company of arrComp) {
            if (company.companyId === employee.companyId) {
                strCompany = company.name;
                break; // Salimos del bucle al encontrar la compañía
            }
        }

        const fila = document.createElement('tr'); // Crea una nueva fila

        const celdaNumero = document.createElement('th'); // Crea celda para el número
        celdaNumero.scope = "row";
        celdaNumero.textContent = i++;

        const celdaNombre = document.createElement('td');
        celdaNombre.textContent = employee.firstName;

        const celdaApellido = document.createElement('td');
        celdaApellido.textContent = employee.lastName;

        const celdaCompany = document.createElement('td');
        celdaCompany.textContent = strCompany;

        // Añadimos las celdas a la fila
        fila.appendChild(celdaNumero);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaApellido);
        fila.appendChild(celdaCompany);

        // Añadimos la fila a la tabla
        listaElement.appendChild(fila);
    });
}

async function init() {
    try {
        await promiseGets();
        renderizarEmployees();
    } catch (err) {
        console.error('Error:', err);
        mostrarError("Error al obtener empleados o compañías");
    }
}

function buscar(){

    const buscar= document.getElementById("buscar");
    let arrBuscar=[];
    // Agregar el eventListener para capturar el evento "Enter"
buscar.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); 
        arrBuscar=arrEmpl.filter(employee=> employee.firstName.toLowerCase().includes(buscar.value.toLowerCase()) || employee.lastName.toLowerCase().includes(buscar.value.toLowerCase()));

        const listaElement = document.getElementById('verEmployees-list');
        listaElement.innerHTML = ''; // Limpia la lista antes de renderizar
        let i = 1;
        document.getElementById("h1Employees").innerHTML = "Ver Empleados";
    
        arrBuscar.forEach((employee) => {
            let strCompany = '';
            for (let company of arrComp) {
                if (company.companyId === employee.companyId) {
                    strCompany = company.name;
                    break; // Salimos del bucle al encontrar la compañía
                }
            }
    
            const fila = document.createElement('tr'); // Crea una nueva fila
    
            const celdaNumero = document.createElement('th'); // Crea celda para el número
            celdaNumero.scope = "row";
            celdaNumero.textContent = i++;
    
            const celdaNombre = document.createElement('td');
            celdaNombre.textContent = employee.firstName;
    
            const celdaApellido = document.createElement('td');
            celdaApellido.textContent = employee.lastName;
    
            const celdaCompany = document.createElement('td');
            celdaCompany.textContent = strCompany;
    
            // Añadimos las celdas a la fila
            fila.appendChild(celdaNumero);
            fila.appendChild(celdaNombre);
            fila.appendChild(celdaApellido);
            fila.appendChild(celdaCompany);
    
            // Añadimos la fila a la tabla
            listaElement.appendChild(fila);
    });
    }
});
   
}

function limpiarBusqueda(){

    const buscar= document.getElementById("buscar");
    buscar.value='';
     renderizarEmployees();
}

window.onload = init;  // INIT PARA QUE RENDERiCE LOS DATOS DE LA API N BIEN SE RECARGA LA PAGINA
 

 
 