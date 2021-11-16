var products = {};
var comenatarios = [];
var relacionado = [];
var productosrelated = [];

/* function showImagesGallery(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];
        htmlContentToAppend = `
     
      `
    }
    document.getElementById("imagenes").innerHTML += htmlContentToAppend;
}
 */


function productosrelacionados(array) {
    let texto = "";
    relacionado = products.relatedProducts
    for (let i = 0; i < array.length; i++) {
        let resultado = array[i]
        for (let x = 0; x < relacionado.length; x++) {
            if (i == relacionado[x]) {

                texto += `
       <div class="card" style="width: 18rem;">
       <img class="card-img-top" src="` + resultado.imgSrc + `" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title"></h5>
        <p class="card-text">` + resultado.name + `</p>

        </div>
      </div>
    `
                document.getElementById('productosrelacionados').innerHTML = texto;
            }

        }
    }
}




//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            products = resultObj.data;
            mostrarcomentarios(comenatarios);

            let categoryNameHTML = document.getElementById("productName");
            let categoryDescriptionHTML = document.getElementById("productDescription");
            let productsoldHTML = document.getElementById("productsold");
            let productprecio = document.getElementById("precio");
            let productcategoria = document.getElementById("categoria");

            categoryNameHTML.innerHTML = products.name;
            categoryDescriptionHTML.innerHTML = products.description;
            productsoldHTML.innerHTML = products.soldCount;
            productprecio.innerHTML = products.cost + products.currency;
            productcategoria.innerHTML = products.category;

            //Muestro las imagenes en forma de galería
            /*  showImagesGallery(products.images); */
        }
    });
});
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            productosrelated = resultObj.data;
            productosrelacionados(productosrelated);
        }
    });
});