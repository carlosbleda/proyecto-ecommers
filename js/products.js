//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var articulos = [];

function listadeproductos(articulos) {

    let htmlContentToAppend = "";
    for (let i = 0; i < articulos.length; i++) {
        let product = articulos[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                <img src="` + product.imgSrc + `" alt="` + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + product.name + `</h4>
                       
                        <small class="text-muted">` + product.soldCount + ` artículos</small>
                    </div>
                    <p>` + product.description + `</p>
                </div>
             
            </div>
            <p>` + product.cost + product.currency + `</p>
        </div>
        `

        document.getElementById("container").innerHTML = htmlContentToAppend; //se agrega la parte html que contiene la variable htmlcontenttoappend que se va a mostrar en el elemento con id container
    }

}

document.addEventListener("DOMContentLoaded", function(e) { //agrege la funcion de traer el json a la pagina 
    getJSONData(PRODUCTS_URL).then(function(resultObj) { //uso el get json data para traer los elementos del objeto que estan en esa url
        if (resultObj.status === "ok") { //condicional que si el resultado es ok se cumple lo que esta entre llaves
            articulos = resultObj.data; //se guarda en el array articulos el resultado del objeto json
            listadeproductos(articulos); //funcion que muestra los elementos
        }
    });
});