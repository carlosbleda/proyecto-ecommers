var usuario = document.getElementById('nombre');
var contraseña = document.getElementById('pass');
var span1 = document.getElementById('mensaje');
var span2 = document.getElementById('mensaje2');

function validar() {
    if (usuario.value == "" || contraseña.value == "") {
        cargarErrores();
    } else {
        localStorage.setItem("usuario", usuario.value); //setItem almacena el dato en la posición "usuario"
        localStorage.setItem("password", contraseña.value); // Almaceno la contraseña
        location.href = 'index.html'

    }
}

function cargarErrores() {
    //Validar nombre

    if (usuario.value == '') {
        span1.style.display = "block";
        span1.innerHTML = 'debe ingresar usuario';
        span1.style.color = 'red'

    }
    if (contraseña.value == '') {
        span2.style.display = "block";
        span2.innerHTML = 'debe ingresar contraseña';

        span2.style.color = 'red'
    } else {


        span1.style.display = 'none';
        span2.style.display = 'none';

    }


}






//funcion de inicio de sesion del boton de google
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    location.href = "index.html" //redireccion a la pagina principal
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {


});