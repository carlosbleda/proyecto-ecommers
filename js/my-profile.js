const obj = { firstname: "", lastname: "", age: 0, email: "", address: "", tel: 0 };
var local = window.localStorage
let nombre = document.getElementById('Nombre');
let apellido = document.getElementById('Apellido');
let telefono = document.getElementById('Telefono');
let direccion = document.getElementById('Direccion');
let edad = document.getElementById('Edad');
let email = document.getElementById('Email');

function modificardatos() {
    var Objnew = obj;
    var error = document.getElementById('error');
    if (nombre.value == "" || apellido.value == "" || telefono.value == "" || edad.value == 0 || direccion.value == 0 || email.value == 0) {

        error.textContent = 'Debe Llenar los campos'
    } else {
        Objnew.firstname = nombre.value
        Objnew.lastname = apellido.value
        Objnew.age = edad.value
        Objnew.email = email.value
        Objnew.address = direccion.value
        Objnew.tel = telefono.value
        error.textContent = ''
        var ObjStr = JSON.stringify(Objnew);
        local.setItem('dato', ObjStr)
        mostrardatos();


    }


}

function mostrardatos() {
    let traerdatos = local.getItem('dato');
    let json = JSON.parse(traerdatos);
    if (json !== "") {
        document.getElementById('mensaje1').innerHTML = ': ' + json.firstname;
        document.getElementById('mensaje2').innerHTML = ': ' + json.lastname;
        document.getElementById('mensaje3').innerHTML = ': ' + json.email;
        document.getElementById('mensaje4').innerHTML = ': ' + json.age;
        document.getElementById('mensaje5').innerHTML = ': ' + json.tel;
        document.getElementById('mensaje6').innerHTML = ': ' + json.address;
        document.getElementById('boton').style.display = "none";
        document.getElementById('limpiar').style.display = "inline";
        disableinput();
    }
}

function disableinput() {

    nombre.style.display = 'none';
    apellido.style.display = 'none';
    email.style.display = 'none';
    direccion.style.display = 'none';
    telefono.style.display = 'none';
    edad.style.display = 'none';


}

function borrarDatos() {

    nombre.style.display = 'inline';
    apellido.style.display = 'inline';
    email.style.display = 'inline';
    direccion.style.display = 'inline';
    telefono.style.display = 'inline';
    edad.style.display = 'inline';
    document.getElementById('mensaje1').innerHTML = "";
    document.getElementById('mensaje2').innerHTML = "";
    document.getElementById('mensaje3').innerHTML = "";
    document.getElementById('mensaje4').innerHTML = "";
    document.getElementById('mensaje5').innerHTML = "";
    document.getElementById('mensaje6').innerHTML = "";
    document.getElementById('boton').style.display = "inline";
    document.getElementById('limpiar').style.display = "none";
}

document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById('limpiar').style.display = "none";
    let datosCargados = local.getItem('dato');
    if (datosCargados == null) {
        modificardatos();
    } else {
        mostrardatos();
    }
    document.getElementById('boton').addEventListener('click', function() {
        modificardatos();
    });
    document.getElementById('limpiar').addEventListener('click', function() {
        borrarDatos();
        local.clear();
    });
    document.getElementById('imagen').addEventListener('change', function() {
        var pintar = new FileReader();
        pintar.addEventListener('load', function() {
            localStorage.setItem('img', pintar.result)
        });
        pintar.readAsDataURL(this.files[0]);
    });
    const img = localStorage.getItem('img');
    if (img !== null) {
        document.getElementById('imganencargada').setAttribute('src', img);
        document.getElementById('imganencargada').setAttribute('width', '40%');
        document.getElementById('imganencargada').style.display = 'block'
        document.getElementById('contenedorImg').style.display = 'none';
    } else {
        document.getElementById('contenedorImg').style.display = 'inline';
        document.getElementById('imganencargada').style.display = 'none';
    }

});