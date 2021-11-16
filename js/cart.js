var carrito = {};

function listadeproductos(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.articles.length; i++) {
        var product = array.articles[i]
        if (product.currency == 'USD') { product.unitCost = product.unitCost * 40 }
        htmlContentToAppend += `
            <div class="card p-2 m-3" style="width: 18rem;">
            <img src="` + product.src + `" class="card-img-bottom mx-auto d-block w-50 rounded-circle" alt="...">
                <div class="card-body">
                 <h5 class="card-title">` + product.name + `</h5>
                 <p class="card-text">` + product.unitCost + ' UYU' + `</p>
                 <label for="" class="visually-hidden">` + product.count + ` </label>
                    <input type="text" onChange="calculando(` + product.unitCost + `);"  id="` + i + `" class="form-control boton" placeholder="Cantidad de productos">
                </div>
             </div>
               `

    }
    document.getElementById("productos").innerHTML = htmlContentToAppend;
}

function calculando(precio) {
    let input = document.getElementById('0').value;
    let input2 = document.getElementById('1').value;
    let html = ""

    if (input !== "" || input2 !== "") {
        let cantidad = input;
        let cantidad2 = input2
        var subtotal = Number(cantidad) + Number(cantidad2);
        var resultado = subtotal * precio;
        var resultado2 = cantidad2 * precio;
        console
        let IVA = resultado * 0.22;
        let total = resultado * 1.22;
        html += ` 
        <p class="text-left">SubTotal: <span id="subtotal">` + resultado + ` UYU</span></p>
        <p class="text-left">Iva 22%: <span id="iva">` + IVA + ` UYU</span></p>
        <p class="text-left">Total: <span id="total">` + total + ` UYU</span></p>`;
        document.getElementById('resultado').innerHTML = html
        console.log(cantidad)
        console.log(subtotal)
    } else {
        html += ` 
        <p class="text-left">SubTotal: <span id="subtotal">` + 0 + ` UYU</span></p>
        <p class="text-left">Iva 22%: <span id="iva">` + 0 + ` UYU</span></p>
        <p class="text-left">Total: <span id="total">` + 0 + ` UYU</span></p>`;
        document.getElementById('resultado').innerHTML = html
    }
}

function vaciar() {
    let input = document.getElementById('UYU');
    let input2 = document.getElementById('USD');
    let iva = document.getElementById('iva');
    let subtotal = document.getElementById('subtotal');
    let total = document.getElementById('total');
    input.value = "";
    input2.value = "";
    iva.textContent = "";
    subtotal.textContent = "";
    total.textContent = "";
}


document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data;
            listadeproductos(carrito);
        }
    });
    document.getElementById("boton-vaciar").addEventListener("click", function() {
        vaciar();
    });

});