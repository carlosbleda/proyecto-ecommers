let categoriesArray = [];

function showCategoriesList(categoriesArray) {

    let htmlContentToAppend = "";
    for (let i = 0; i < categoriesArray.length; i++) {
        let category = categoriesArray[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                <img src="` + category.imgSrc + `" alt="` + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` + category.name + `</h4>
                       
                        <small class="text-muted">` + category.productCount + ` artículos</small>
                    </div>
                    <p>` + category.description + `</p>
                </div>
            </div>
        </div>
        `

        document.getElementById("alert alert-danger").innerHTML += htmlContentToAppend;
    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

document.addEventListener("DOMContentLoaded", function(e) {

    showSpinner();

    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            categoriesArray = resultObj.data;
            //Muestro las categorías ordenadas
            showCategoriesList(categoriesArray);
            hideSpinner();
        }
    });
});