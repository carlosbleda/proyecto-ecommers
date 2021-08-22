var usuario = document.getElementById('nombre');
var contraseña = document.getElementById('pass');
var span1 = document.getElementById('mensaje');
var span2 = document.getElementById('mensaje2');


function cargarErrores() {
    //Validar nombre

    if (usuario.value == '') {
        span1.style.display = "block";
        span1.innerHTML = 'debe ingresar usuario';
        span1.style.color = 'red'
        usuario.style.border = '1 px solid red';
    }
    if (contraseña.value == '') {
        span2.style.display = "block";
        span2.innerHTML = 'debe ingresar contraseña';
        contraseña.style.border = '1 px solid red';
        span2.style.color = 'red'
    } else {
        contraseña.style.border = '1 px solid black';
        usuario.style.border = '1 px solid black';
        span1.style.display = 'none';
        span2.style.display = 'none';

    }


}



function validar() {
    if (usuario.value == "" || contraseña.value == "") {
        cargarErrores();
    } else {
        localStorage.setItem("usuario", usuario.value); //setItem almacena el dato en la posición "usuario"
        localStorage.setItem("password", contraseña.value); // Almaceno la contraseña
        sessionStorage.setItem("usuario", usuario.value);
        //console.log(" Usuario : " + user + " Password : " + pass);
        location.href = 'index.html'

    }
}


function onSignIn(googleUser) { //funcion de inicio de sesion del boton de google
    var profile = googleUser.getBasicProfile();
    sessionStorage.setItem('ID: ' + profile.getId())
    sessionStorage.setItem('Name: ' + profile.getName());
    sessionStorage.setItem('Image URL: ' + profile.getImageUrl());
    sessionStorage.setItem('Email: ' + profile.getEmail());
    location.href = "/proyecto/index.html" //redireccion a la pagina principal
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {


});