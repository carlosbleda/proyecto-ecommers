//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    var usuario = localStorage.getItem("usuario"); //getItem Obtiene el dato de la posición "usuario"
    var sesion = sessionStorage.getItem("usuario");
    document.getElementById('user').innerHTML = usuario;
    document.getElementById('sesion').innerHTML = sesion;
    //Nótese que si cerramos el navegador y volvemos a abrir, el dato sigue almacenado
});