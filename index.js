const usuarioLautaro = ['Lautaro', '1234'];
const usuarios = [usuarioLautaro];

const loginButton = document.querySelector('#login-button');

function login(){
    const usuarioIngresado = document.querySelector('#nombre-usuario').value;
    const password = document.querySelector('#password').value;

    let usuarioValidado = false;

    usuarios.forEach(usuario => {
        if (usuario[0] == usuarioIngresado){
            console.log("usuario encontrado");
            if (usuario[1] == password){
                console.log("La contraseña coincide");
                usuarioValidado = true;
            } else {
                console.log("La contraseña no coincide")
            }
        }
    });

    if (usuarioValidado){
        window.location.href = "home.html";
    } 
}

loginButton.addEventListener('click', login);