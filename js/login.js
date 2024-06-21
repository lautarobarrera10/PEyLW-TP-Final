const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', login);

function login(){
    // Recuperar la cadena JSON desde localStorage
    let usuariosJSON = localStorage.getItem("usuarios");

    // Convertir la cadena JSON de nuevo en un array
    const usuarios = JSON.parse(usuariosJSON);

    const usuarioIngresado = document.querySelector('#nombre-usuario').value;
    const password = document.querySelector('#password').value;

    let usuarioValidado = false;

    usuarios.forEach(usuario => {
        if (usuario["nombreUsuario"] == usuarioIngresado){
            console.log("usuario encontrado");
            if (usuario["password"] == password){
                console.log("La contraseña coincide");
                usuarioValidado = true;
            } else {
                console.log("La contraseña no coincide")
            }
        }
    });

    if (usuarioValidado){
        window.location.href = "./home.html";
    }
}