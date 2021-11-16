var recomendados = [];

function productosrelacionados(array) {
    let html = "";
    for (let i = 0; i < array.length; i++) {
        let resultado = array[i]
        if (i == 1 || i == 3) {
            html += `
        <div class="card" style="width: 18rem;">
        <a href="product-info.html" class="list-group-item list-group-item-action d-inline">
         <div class="card-body">
        <h5 class="card-title">` + resultado.name + `</h5>
        <div class="row">
        <img class="img-fluid img-thumbnail d-inline" src="` + resultado.imgSrc + `" alt="" class="img-thumbnail">
        </div>
      <p class="card-text">` + resultado.description + `</p> 
        <p class="card-text">` + resultado.cost + resultado.currency + `</p>
        </div>
        </a>
        </div>`
            document.getElementById('productrelated').innerHTML = html;
        }
    }
}
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            recomendados = resultObj.data;
            productosrelacionados(recomendados);
        }
    });
});