const usuarioLautaro = ['Lautaro', '1234'];
const usuarios = [usuarioLautaro];

const loginButton = document.querySelector('#login-button');

function login(){
    const usuarioIngresado = document.querySelector('#nombre-usuario').value;
    const password = document.querySelector('#password').value;

    usuarios.forEach(usuario => {
        if (usuario[0] == usuarioIngresado){
            console.log("usuario encontrado");
        }
    });
}

loginButton.addEventListener('click', login);