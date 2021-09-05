const ordenaracen = "AZ";
const ordenardes = "ZA";
const ordenarvendidos = "Cant.";
var products = [];
var datosordenados = undefined;
var minCount = undefined;
var maxCount = undefined;



function ordenarproductos(criteria, array) {
    let result = [];
    if (criteria === ordenaracen) {
        result = array.sort(function(a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ordenardes) {
        result = array.sort(function(a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ordenarvendidos) {
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }

    return result;
}

function ordenarymostrarProductos(Ordendecriterio, productosArrays) {
    datosordenados = Ordendecriterio;
    if (productosArrays != undefined) {
        products = productosArrays;
    }
    products = ordenarproductos(datosordenados, products);
    mostrarproductos();
}

function mostrarproductos(valor) {
    let htmlContentToAppend = "";
    for (let i = 0; i < products.length; i++) {
        let productos = products[i];
        let nombre = products[i].name.toLowerCase(); //tomo los datos en la variable nombre de los elemento.name en products y los transformo en minusculas
        let descripcion = products[i].description.toLowerCase(); //tomo los datos en la variable nombre de los elemento.name en products y los transformo en minusculas
        if (nombre.search(valor) !== -1 || descripcion.search(valor) !== -1) { //filtra la busqueda con los datos en description y nombre
            if (((minCount == undefined) || (minCount != undefined && parseInt(productos.cost) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(productos.cost) <= maxCount))) {

                htmlContentToAppend += `
            <products href="productos-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + productos.name + `</h4>
                            <small class="text-muted">` + productos.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + productos.description + `</p>
                        <p class="mb-1">` + productos.cost + productos.currency + `</p>
                    </div>
                </div>
            </products>
            `
            }

            document.getElementById("container").innerHTML = htmlContentToAppend;
        }
    }
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            ordenarymostrarProductos(ordenaracen, products);
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function() {
        ordenarymostrarProductos(ordenaracen);
    });
    document.getElementById("sortDesc").addEventListener("click", function() {
        ordenarymostrarProductos(ordenardes);
    });
    document.getElementById("sortBySold").addEventListener("click", function() {
        ordenarymostrarProductos(ordenarvendidos);
    });
    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterSoldMin").value = "";
        document.getElementById("rangeFilterSoldMax").value = "";
        minCount = undefined;
        maxCount = undefined;
        mostrarproductos();
    });
    document.getElementById("rangeFilterSold").addEventListener("click", function() {
        minCount = document.getElementById("rangeFilterSoldMin").value;
        maxCount = document.getElementById("rangeFilterSoldMax").value;
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }
        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }
        mostrarproductos();
    });
    document.getElementById("buscar").addEventListener("keyup", function() { //evento que cuando se teclea en el input con id buscar para que muestre las coincidencias
        let buscador = document.getElementById('buscar').value;
        mostrarproductos(buscador);
    });
});