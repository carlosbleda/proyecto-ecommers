const ordenaracen = "AZ";
const ordenardes = "ZA";
const ordenarvendidos = "Cant.";
var productos = [];
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
        productos = productosArrays;
    }
    productos = ordenarproductos(datosordenados, productos);
    mostrarproductos(productos);
}


function mostrarproductos(array, valor) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let productos = array[i];
        let nombre = array[i].name.toLowerCase(); //tomo los datos en la variable nombre de los elemento.name en productos y los transformo en minusculas
        let descripcion = array[i].description.toLowerCase(); //tomo los datos en la variable nombre de los elemento.name en productos y los transformo en minusculas
        if (nombre.search(valor) !== -1 || descripcion.search(valor) !== -1) { //filtra la busqueda con los datos en description y nombre
            if (((minCount == undefined) || (minCount != undefined && parseInt(productos.cost) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(productos.cost) <= maxCount))) {

                htmlContentToAppend += `
             <div class="col-md-3 card-container">
                <a href="product-info.html" class="list-group-item list-group-item-action mr-md-6">
                        <div class="card" style="width: 14rem;">
                            <img class="card-img-top" src="` + productos.imgSrc + `" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">` + productos.name + `</h5>
                                <p class="card-text">` + productos.description + `</p>
                                <p class="card-text">` + productos.soldCount + ` artículos</p>
                                <p class="card-text">` + productos.cost + productos.currency + `</p>
                        </div>
                    </div>
                    </a>
                </div>
            `
            }
        }
    }
    document.getElementById("container").innerHTML = htmlContentToAppend;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productos = resultObj.data;
            console.log(productos)
            ordenarymostrarProductos(ordenaracen, productos);
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
        mostrarproductos(productos);
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
        mostrarproductos(productos);
    });
    document.getElementById("buscar").addEventListener("keyup", function() { //evento que cuando se teclea en el input con id buscar para que muestre las coincidencias
        let buscador = document.getElementById('buscar').value;
        console.log(buscador);
        mostrarproductos(productos, buscador);
    });
});