var carrito = {};
var mensaje = [];



function listadeproductos(array) {
    let htmlContentToAppend = "";
    for (let i = 0; i < array.articles.length; i++) {
        var product = array.articles[i]
        if (product.currency == 'USD') { product.unitCost = product.unitCost * 40 }
        htmlContentToAppend += `
            <div class="col-md-4 card p-2 m-3" style="width: 14rem;">
            <img src="` + product.src + `" class="card-img-bottom mx-auto d-block w-50 rounded-circle" alt="...">
                <div class="card-body">
                 <h5 class="card-title">` + product.name + `</h5>
                 <p class="card-text">` + product.unitCost + ' UYU' + `</p>
                 <label for="" class="visually-hidden">` + product.count + ` </label>
                 <div class="form-group">
           
                 <button class="btn btn-outline-success" type="button" id="radio` + i + `"  onclick="elemento(carrito,` + i + `);">Agregar al carrito</button>
                
                 </div>
                </div>
             </div>
               `

    }
    document.getElementById("productos").innerHTML = htmlContentToAppend;
}



function subtotal(precio, indice) {
    let elemento1 = document.getElementById('cantidad1');
    let elemento2 = document.getElementById('cantidad2');
    let subtotal = 0;
    let resultado1 = 0;
    let resultado2 = 0;

    console.log()
    if (indice == 1) {
        if (elemento1 !== null) {


            let resultado1 = 0;
            let elemento1 = document.getElementById('cantidad1');
            resultado1 = elemento1.value * precio

            sessionStorage.setItem('resultado1', resultado1);
            subtotal = parseInt(resultado1);
            sessionStorage.setItem('subtotal', subtotal)
            let iva = subtotal * 0.22;
            document.getElementById('iva').innerHTML = iva;
            let dolar = subtotal / 40;
            document.getElementById('dolar').innerHTML = dolar;
        }

        document.getElementById('subtotal').innerHTML = subtotal
    }

    if (indice == 2) {
        if (elemento2 !== null) {
            let resultado2 = 0;
            let elemento2 = document.getElementById('cantidad2');
            resultado2 = elemento2.value * precio;
            sessionStorage.setItem('resultado2', resultado2);
            subtotal = parseInt(resultado2);
            sessionStorage.setItem('subtotal', subtotal)
            document.getElementById('subtotal').innerHTML = subtotal;
            let iva = subtotal * 0.22;
            document.getElementById('iva').innerHTML = iva;
            let dolar = subtotal / 40;
            document.getElementById('dolar').innerHTML = dolar;
        }

    }

    if (elemento2 !== null && elemento1 !== null) {
        let pino = sessionStorage.getItem('resultado2')
        console.log(pino);
        let auto = sessionStorage.getItem('resultado1')
        console.log(auto);
        subtotal = (parseInt(auto) + parseInt(pino));
        sessionStorage.setItem('subtotal', subtotal)
        let iva = subtotal * 0.22
        document.getElementById('iva').innerHTML = iva
        console.log(iva);
        let dolar = subtotal / 40
        document.getElementById('dolar').innerHTML = dolar
        sessionStorage.setItem('subtotal', subtotal)
        document.getElementById('subtotal').innerHTML = subtotal
    }
}

function metodoPago() {
    var standard = document.getElementById('standard');
    var express = document.getElementById('express')
    var premium = document.getElementById('premium')
    if (standard.checked == true) {
        let subtotal = sessionStorage.getItem('subtotal')

        let costenvio = parseInt(subtotal) * 0.05
        let total = parseInt(subtotal) * 1.05

        document.getElementById('total').innerHTML = total
        document.getElementById('costenvio').innerHTML = costenvio
    }
    if (express.checked == true) {
        let subtotal = sessionStorage.getItem('subtotal')
        let costenvio = parseInt(subtotal) * 0.05
        let total = parseInt(subtotal) * 1.07

        document.getElementById('total').innerHTML = total
        document.getElementById('costenvio').innerHTML = costenvio


    }
    if (premium.checked == true) {
        let subtotal = sessionStorage.getItem('subtotal')
        let costenvio = parseInt(subtotal) * 0.05
        let total = parseInt(subtotal) * 1.15

        document.getElementById('total').innerHTML = parseInt(total)
        document.getElementById('costenvio').innerHTML = costenvio

    }

}

function compraterminada() {
    let html = "";
    html = ` <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Compra Finalizada</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <div>` + mensaje + `</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>`
    document.getElementById('compraok').innerHTML = html
}

function quitar(indice) {
    let progressbar = document.getElementById('progressbar');
    if (indice == 1) {
        var element1 = document.getElementById("container1");
        element1.parentNode.removeChild(element1);
        document.getElementById('subtotal').innerHTML = "";
        document.getElementById('iva').innerHTML = "";
        document.getElementById('costenvio').innerHTML = "";
        document.getElementById('total').innerHTML = "";
        sessionStorage.clear();

    }
    if (indice == 2) {
        var element2 = document.getElementById("container2");
        element2.parentNode.removeChild(element2);
        document.getElementById('subtotal').innerHTML = "";
        document.getElementById('iva').innerHTML = "";
        document.getElementById('costenvio').innerHTML = "";
        document.getElementById('total').innerHTML = "";
        sessionStorage.clear();
    }
    progressbar.innerHTML = '  <div class="progress-bar bg-success" id="progressbar" role="progressbar" style="width:33%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100">Seleccion de Producto</div>'

}

function elemento(array, indice) {
    let progressbar = document.getElementById('progressbar');

    if (indice == 0 || indice == 1) {
        let html = "";
        for (indice; indice < array.articles.length; indice++) {
            var product = array.articles[indice++];
            html += `
           <div class=" col-md-4 card" style="width: 10rem;" id="container` + indice + `">
           <img src="` + product.src + `" class="card-img-bottom mx-auto d-block w-50 rounded-circle" alt="...">
               <div class="card-body">
                <h5 class="card-title">` + product.name + `</h5>
                <p class="card-text">` + product.unitCost + ' UYU' + `</p>
                <label for="" class="visually-hidden">` + product.count + ` </label>
                <div class="form-group">
                <label for="exampleInputEmail1">Cantidad</label>
                <input type="number" class="form-control" onkeyup="subtotal(` + product.unitCost + `,` + indice + `),validar('cantidad` + indice + `');" id="cantidad` + indice + `" aria-describedby="">
                <button type="button" onclick="quitar(` + indice + `)" class="btn btn-outline-danger">Quitar</button>
                <p class="card-text text-danger" id="error` + indice + `">  </p>
                
                </div>
               </div>
            </div>
              `
            document.getElementById('cantidadProductos').innerHTML += html

        }
        progressbar.innerHTML = '  <div class="progress-bar bg-success" id="progressbar" role="progressbar" style="width:66%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100">Compra Del Producto</div>'

    }


}

function validar(id) {
    let element = document.getElementById(id)

    if (element.value == "") {
        element.classList.add('is-invalid', 'animate__animated', 'animate__wobble');
    } else {
        element.classList.remove('is-invalid', 'animate__animated', 'animate__wobble');
        element.classList.add('was-validated', 'is-valid', 'animate__animated', 'animate__wobble');
    }

}

function validarformapago() {
    let tarjeta = document.getElementById('credito')
    let banco = document.getElementById('cbanco')
    if (tarjeta.checked == true) {
        let titular = document.getElementById('titular')
        let nrotarjeta = document.getElementById('nrotarjeta')
        let vencimiento = document.getElementById('vencimiento')
        let verificacion = document.getElementById('verificacion')

        if (titular.value == "" || nrotarjeta.value == "" || vencimiento.value == "" || verificacion.value == "") {
            validar('titular');
            validar('nrotarjeta');
            validar('vencimiento');
            validar('verificacion');
        }
    } else if (banco.checked == true) {
        let nrocuenta = document.getElementById('nrocuenta')


        if (nrocuenta.value == "") {
            validar('nrocuenta');

        }
    }
}


function validardatos() {
    let pais = document.getElementById('pais');
    let ciudad = document.getElementById('ciudad');
    let direccion = document.getElementById('direccion');
    let numero = document.getElementById('numero');
    let esquina = document.getElementById('esquina');
    let progressbar = document.getElementById('progressbar');

    if (pais.value == "" || ciudad.value == "" || direccion.value == "" || numero.value == "" || esquina.value == "") {
        pais.classList.add('is-invalid', 'animate__animated', 'animate__wobble');
        ciudad.classList.add('is-invalid', 'animate__animated', 'animate__wobble');
        direccion.classList.add('is-invalid', 'animate__animated', 'animate__wobble');
        numero.classList.add('is-invalid', 'animate__animated', 'animate__wobble');
        esquina.classList.add('is-invalid', 'animate__animated', 'animate__wobble');
        document.getElementById('error').innerHTML = "Debe completar todos los datos"
    } else {
        pais.classList.remove('is-invalid', 'animate__animated', 'animate__wobble');
        ciudad.classList.remove('is-invalid', 'animate__animated', 'animate__wobble');
        direccion.classList.remove('is-invalid', 'animate__animated', 'animate__wobble');
        numero.classList.remove('is-invalid', 'animate__animated', 'animate__wobble');
        esquina.classList.remove('is-invalid', 'animate__animated', 'animate__wobble');
        pais.classList.add('was-validated', 'is-valid', 'animate__animated', 'animate__wobble');
        ciudad.classList.add('was-validated', 'is-valid', 'animate__animated', 'animate__wobble');
        numero.classList.add('was-validated', 'is-valid', 'animate__animated', 'animate__wobble');
        esquina.classList.add('was-validated', 'is-valid', 'animate__animated', 'animate__wobble');
        direccion.classList.add('was-validated', 'is-valid', 'animate__animated', 'animate__wobble');
        document.getElementById('cerrar').setAttribute('data-dismiss', "modal")
        document.getElementById('cerrar').setAttribute('data-toggle', "modal");
        document.getElementById('cerrar').setAttribute('data-target', '#modal2');

        progressbar.innerHTML = '  <div class="progress-bar bg-success" id="progressbar" role="progressbar" style="width:100%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100">Compra Finalizada </div>'

        compraterminada();
        quitar();

    }

}

function validarcarrito() {
    let container1 = document.getElementById('container1');
    let container2 = document.getElementById('container2');

    if (container1 == null) {
        document.getElementById('error').innerHTML = 'Debe agregar articulos al carrito'
    }
    if (container2 == null) {
        document.getElementById('error').innerHTML = 'Debe agregar articulos al carrito'

    }
    if (container1 !== null || container2 !== null) {

        let boton = document.getElementById('boton-comprar')
        boton.setAttribute('data-toggle', "modal")
        boton.setAttribute('data-target', "#modal")
        document.getElementById('error').style.display = "none"


        modal();
    }

};

function modal() {

    let html = "";

    html = `<div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title" id="myModalLabel">Forma De Pago</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                            </div>
                            <div class="modal-body">

                                <form class="needs-validation" novalidate>

                                    <div id="scoring_holder_ans1">
                                        <div class="form-group">
                                            <div>
                                                <label class="checkbox-inline">
                            <input type="radio" class="checkbox_1 form-check-label" data-toggle="collapse" href="#metodoenvio" value="2" name="tipo">
                  Tipo de Envio
                          </label>
                                            </div>
                                            <div class="collapse multi-collapse" id="metodoenvio">
                                                <div class="card card-body">

                                                    <div>
                                                        <label class="checkbox-inline">
                            <input type="radio" class="checkbox_1"  onclick="metodoPago();"  id="standard" value="1" name="tipo" checked>  Standard (12 a 15 días) - Costo del 5% sobre el subtotal.
                          </label>
                          <div class="invalid-feedback">
                                                        Debe Ingresar Datos
                                                      </div>
                                                    </div>
                                                    <div>
                                                        <label class="checkbox-inline">
                            <input type="radio" class="checkbox_1" id="express" onclick="metodoPago();" value="2" name="tipo">
                            Express (5-8 días) - Costo del 7% sobre el subtotal
                          </label>
                                                    </div>
                                                    <div>
                                                        <label class="checkbox-inline">
                            <input type="radio" id="premium" class="checkbox_1" onclick="metodoPago();" value="3" name="tipo">
                            Premium (2-5 días) - Costo del 15% sobre el subtotal
                          </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr>
                                            <div>
                                                <label class="checkbox-inline">
                                <input type="radio" class="checkbox_1" data-toggle="collapse" href="#datosdeenvio" value="2" name="tipo">
                        Datos de envio 
                              </label>
                              <div class="invalid-feedback">
                                                        Debe Ingresar Datos
                                                      </div>
                                            </div>
                                            <div class="collapse multi-collapse" id="datosdeenvio">
                                                <div class="card card-body">
                                                    <div class="input-group mb-3" >
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">*Pais</span>
                                                        </div>
                                                        <input type="text" onblur="validar('pais');" class="form-control" id="pais"  placeholder="Pais" aria-describedby="basic-addon1">
                                                        <div class="invalid-feedback">
                                                        Debe Ingresar Datos
                                                      </div>
                                                        </div>
                                                    <div class="input-group mb-3" >
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">*Ciudad</span>
                                                        </div>
                                                        <input type="text" onblur="validar('ciudad');" class="form-control" id="ciudad"  placeholder="Pais" aria-describedby="basic-addon1">
                                                        <div class="invalid-feedback">
                                                        Debe Ingresar Datos
                                                      </div>
                                                        </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">*Direccion</span>
                                                        </div>
                                                        <input type="text" class="form-control"  id="direccion" onblur="validar('direccion');" placeholder="Direccion" aria-label="Direccion" aria-describedby="basic-addon1">
                                                        <div class="invalid-feedback">
                                                        Debe Ingresar Datos
                                                      </div>
                                                        </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">*Numero</span>
                                                        </div>
                                                        <input type="text" class="form-control" id="numero" onblur="validar('numero');" placeholder="Numero" aria-label="Numero" aria-describedby="basic-addon1">
                                                        <div class="invalid-feedback">
                                                        Debe Ingresar Datos
                                                      </div>
                                                        </div>
                                                    <div class="input-group mb-3">
                                                        <div class="input-group-prepend">
                                                            <span class="input-group-text">*Esquina</span>
                                                        </div>
                                                        <input type="text" class="form-control" id="esquina" onblur="validar('esquina');" placeholder="Esquina" aria-describedby="basic-addon1">
                                                        <div class="invalid-feedback">
                                                        Debe Ingresar Datos
                                                      </div>
                                                        </div>

                                                </div>
                                            </div>
                                        </div>
                                        <hr>
                                        <div>
                                            <label class="checkbox-inline">
                            <input type="radio" id="pago" class="checkbox_1" onclick="validardatos();" data-toggle="collapse" href="#metodopago" value="2" name="tipo">
                    Forma de Pago
                          </label>
                                        </div>
                                        <div class="collapse multi-collapse" id="metodopago">
                                            <div class="card card-body">
                                                <div class="form-group">
                                                    <div id="tarjetac">
                                                        <label class="checkbox-inline">
                            <input type="radio" class="checkbox_1" onclick="validardatos();validarformapago();" id="credito" data-toggle="collapse" href="#tarjeta" value="2" name="tipo">
                    Tarjeta de Credito 
                          </label>
                                                    </div>
                                                    <div class="collapse multi-collapse" id="tarjeta">
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">*Titular</span>
                                                            </div>
                                                            <input type="text" class="form-control" id="titular" onblur="validar('titular');" placeholder="Titular" aria-describedby="basic-addon1">
                                                            <div class="invalid-feedback">
                                                            Por Favor Ingrese un Titular
                                                          </div>
                                                            </div>
                                                        <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">*Nro Tarjeta</span>
                                                            </div>
                                                            <input type="number" class="form-control" id="nrotarjeta" onblur="validar('nrotarjeta');" placeholder="xxxxx-xxxx-xx" aria-describedby="basic-addon1">
                                                            <div class="invalid-feedback">
                                                            Por Favor Ingrese un Nro Tarjeta
                                                          </div>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">*Verificacion</span>
                                                            </div>
                                                            <input type="number" class="form-control" id="verificacion" onblur="validar('verificacion');" placeholder="Cod.Verificacion" aria-describedby="basic-addon1">
                                                            <div class="invalid-feedback">
                                                            Por Favor Ingrese un Nro de Verificacion
                                                          </div>
                                                            </div>
                                                            <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">*Vencimiento</span>
                                                            </div>
                                                            <input type="date" class="form-control" id="vencimiento" onblur="validar('vencimiento');" placeholder="Cod.Verificacion" aria-describedby="basic-addon1">
                                                            <div class="invalid-feedback">
                                                            Por Favor Ingrese un Nro Vencimiento
                                                          </div>
                                                            </div>
                                                        <div class="input-group mb-3">

                                                            <br>

                                                        </div>
                                                    </div>
                                                    <div id="banco">
                                                        <label class="checkbox-inline">
            <input type="radio" class="checkbox_1"  onclick="validardatos();validarformapago();" id="cbanco" data-toggle="collapse" href="#cuenta" value="2" name="tipo"> Cuenta Bancaria
            </label></div>
                                                    <div class="collapse multi-collapse" id="cuenta">
                                                        <div class="card card-body">
                                                            <div class="form-group">
                                                            <div class="input-group mb-3">
                                                            <div class="input-group-prepend">
                                                                <span class="input-group-text">*Nro Cuenta</span>
                                                            </div>
                                                            <input type="text" class="form-control" onblur="validar('nrocuenta');" id="nrocuenta" placeholder="xxxx-xxxxx-xxxxx" aria-describedby="basic-addon1">
                                                            <div class="invalid-feedback">
                                                            Debe Ingresar un Numero de Cuenta Bancaria
                                                          </div>
                                                            </div>
                            </div>
                    </div>
                </div>
                    </div>
                    
                            </div>
                                </div>
            
                                
                            </form>
                        </div>
                        <p class="text-danger" id="error"></p>
                        <div class="modal-footer">
                        
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" id="cerrar"  onclick="validardatos();validarformapago();" class="btn btn-primary"  >Finalizar compra</button>
                            
                        </div>
                    </div>
                </div>`

    document.getElementById('show-modal').innerHTML = html
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            carrito = resultObj.data;
            listadeproductos(carrito);


        }
    });
    getJSONData(CART_BUY_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            mensaje = resultObj.data.msg;




        }
    });
    document.getElementById('boton-comprar').addEventListener('click', function() {


        validarcarrito();
    });


});