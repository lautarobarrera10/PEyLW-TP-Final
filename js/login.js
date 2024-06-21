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

    usuarios.forEach(usuario => {
        if (usuario["nombreUsuario"] == usuarioIngresado){
            if (usuario["password"] == password){
                usuarioValidado = true;
            }
        }
    });

    if (usuarioValidado){
        window.location.href = "./home.html";
    } else {
        campoError.style.display = "block";
    }
}