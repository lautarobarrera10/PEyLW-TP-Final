// Si está iniciado sesión redirigir al home
if (localStorage.getItem("sesion")){
    window.location.href = "./home.html";
}

const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', login);

function login(){
    // Recuperar la cadena JSON desde localStorage
    let usuariosJSON = localStorage.getItem("usuarios");

    // Convertir la cadena JSON de nuevo en un array
    const usuarios = JSON.parse(usuariosJSON);

    // Obtenemos los valores ingresados
    const usuarioIngresado = document.querySelector('#nombre-usuario').value;
    const password = document.querySelector('#password').value;

    // Campo de error por si tenemos que mostrar un error
    const campoError = document.querySelector("#credenciales-error");

    // Variable que guarda si el usuario es valido
    let usuarioValidado = false;

    // Variables donde vamos a guardar los datos en caso de que el inicio sea correcto
    let nombreUsuario = "";
    let tipoUsuario = "";
    let passwordUsuario = "";

    usuarios.forEach(usuario => {
        if (usuario["nombreUsuario"] == usuarioIngresado){
            if (usuario["password"] == password){
                usuarioValidado = true;
                nombreUsuario = usuario["nombreUsuario"];
                tipoUsuario = usuario["tipo"];
                passwordUsuario = usuario["password"];
            }
        }
    });

    if (usuarioValidado){
        window.location.href = "./home.html";
        guardarSesion(nombreUsuario, passwordUsuario, tipoUsuario);
    } else {
        campoError.style.display = "block";
    }
}

function guardarSesion(nombre, password, tipo){
    // Array con usuarios pre-definidos
    const sesion = {
            nombreUsuario: nombre,
            password: password,
            tipo: tipo
    };

    // Convertir el array en una cadena JSON
    const sesionJSON = JSON.stringify(sesion);

    // Guardar el array en localStorage
    localStorage.setItem("sesion", sesionJSON);
}