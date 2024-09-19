class Producto{

    constructor(nombre, precio, descrip){
        this.nombre = nombre;
        this.precio = precio;
        this.descrip = descrip;
    }
}

let arrProd=[];
   
let producto1=new Producto("Celular",50000,"Celular Samsung");
let producto2=new Producto("Tele",100000,'LG 90"');
let producto3 = new Producto("Auto",900000,"El mejor auto del mundo");

 
function agregar(producto){ 

    arrProd.push(producto);
    swal("Producto Agregado","","success");
    renderizarCart();

}
document.addEventListener('DOMContentLoaded', function () {  //Se inicializa el POPOVER de bootstrap para que cuando se 
    //haga hover este se muestre
    var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
      return new bootstrap.Popover(popoverTriggerEl);
    });
  });


  function renderizarCart(){
   const listaCart = document.getElementById("cart");
   listaCart.innerHTML ='';
let total=0;
   arrProd.forEach(prod=>{
    const fila = document.createElement("tr");
 
  // otra forma de hacerlo
  /*  fila.innerHTML=`
   
    <td>${prod.nombre}</td>
    <td>${prod.precio}</td>
    <td>
      <button onclick="eliminar('${prod.nombre}')" class="btn btn-danger">Eliminar</button>
    </td>
    `; */
 
    const celdaNombre = document.createElement('td');
    celdaNombre.textContent=prod.nombre;
     
    const celdaPrecio= document.createElement('td');
    celdaPrecio.textContent=prod.precio;

    const celdaEliminar=document.createElement('button');
    celdaEliminar.textContent='Eliminar';
    celdaEliminar.className= "btn btn-danger";
    celdaEliminar.addEventListener('click', ()=>eliminar(prod.nombre));

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaPrecio);
    fila.appendChild(celdaEliminar);
    listaCart.appendChild(fila);

    total+=prod.precio;
  
   });
   document.getElementById('total').innerHTML=total;
  }

  function eliminar(nombre){
    const indice = arrProd.findIndex(prod => prod.nombre === nombre); 
    if (indice !== -1) {   
        arrProd.splice(indice, 1);
    renderizarCart();

  }
  }