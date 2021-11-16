var comentarios = [];
var estrella = '<label class="text-warning" for="radio1">★</label>';

function calificacionestrellas(nroestrellas) {
    let html = '';
    if (nroestrellas == 5) {
        html += `<p class="clasificacion">
` + estrella + estrella + estrella + estrella + estrella + `

</p> `
        return html;
    } else if (nroestrellas == 4) {
        html += `<p class="clasificacion">
        ` + estrella + estrella + estrella + estrella + `
        
        </p> `
        return html;
    } else if (nroestrellas == 3) {
        html += `<p class="clasificacion">
        ` + estrella + estrella + estrella + `
        
        </p> `
        return html;
    } else if (nroestrellas == 2) {
        html += `<p class="clasificacion">
        ` + estrella + estrella + `
        </p> `
        return html;
    } else if (nroestrellas == 1) {
        html += `<p class="clasificacion">
        ` + estrella + `
        
        </p> `
        return html;
    }

}


function mostrarcomentarios(array) {
    let html = "";
    for (let i = 0; i < array.length; i++) {
        let obj = array[i];
        let score = obj.score;
        html += `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">` + "Usuario:" + " " + obj.user + `</h5>
          <p class="card-text">` + "Comentario:" + " " + obj.description + `</p>
          <p class="card-text">` + obj.dateTime + `</p>
          <p class="card-text">` + calificacionestrellas(obj.score) + `</p>
        </div>
      </div>
    `

    }
    document.getElementById("comentarios").innerHTML = html;
}

function agregarcomentario() {
    var nombre = sessionStorage.getItem('usuario');
    let estrellas = document.getElementById('cantidadestrellas').value;
    let comentario = document.getElementById('comentarioagregado').value;
    let error = document.getElementById('error');
    var hoy = new Date()
    var fecha = hoy.getDate() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var agregar = document.getElementById('comentarios');
    if (estrellas == " " || comentario == " ") {
        error.innerHTML = 'Debe ingresar un comentario';
    } else {
        let html = "";
        html += `<div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">` + "Usuario:" + " " + nombre + `</h5>
          <p class="card-text">` + "Comentario:" + comentario + `</p>
          <p class="card-text">` + calificacionestrellas(estrellas) + `</p>
          <p class="card-text">` + fecha + " " + hora + `</p>
        </div>
      </div>
    `
        agregar.innerHTML += html;
    }
}
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            comentarios = resultObj.data;
            mostrarcomentarios(comentarios);

        }
    });
});