// Array con usuarios pre-definidos
const usuarios = [
    {
        nombreUsuario: "admin",
        password: "admin123",
    },
];

// Convertir el array en una cadena JSON
const usuariosJSON = JSON.stringify(usuarios);

// Guardar el array en localStorage
localStorage.setItem("usuarios", usuariosJSON);

// Para evitar que puedan copiar la contraseña para pegarla en la confirmación
window.onload = function() {
    var myInput = document.getElementById('password');
    myInput.oncopy = function(e) {
      e.preventDefault();
    }
}

// Elementos del DOM
const registerButton = document.querySelector('#register-button');
const campoPasswordConfirm = document.querySelector("#password-confirm");
const passwordConfirmContainer = document.querySelector("#password-confirm-container");
const passwordConfirmError = document.querySelector("#password-confirm-error");
const campoPassword = document.querySelector("#password");
const passwordContainer = document.querySelector("#password-container");
const passwordError = document.querySelector("#password-error")
const passwordVisibility = document.querySelector("#password-visibility");
const passwordConfirmVisibility = document.querySelector("#password-confirm-visibility");
const campoUsername = document.querySelector("#nombre-usuario");
const usernameError = document.querySelector("#nombre-usuario-error");


// Event Listeners
campoPasswordConfirm.addEventListener("change", verificarIgualdadPassword);
campoPassword.addEventListener("change", validarPassword);
campoPassword.addEventListener("change", verificarIgualdadPassword);
passwordVisibility.addEventListener("click", togglePasswordVisibility);
passwordConfirmVisibility.addEventListener("click", togglePaswordConfirmVisibility);
campoUsername.addEventListener("change", verificarUsername);


function verificarUsername(evento){
    let usuarioIngresado = evento.target.value;
    campoUsername.style.borderRadius = "5px";
    if (usuarioIngresado.length < 5){
        campoUsername.style.border = "1px solid red";
        usernameError.style.display = "block";
        usernameError.textContent = "La nombre de usuario debe tener al menos 5 caracteres.";
    } else {
        campoUsername.style.border = "1px solid green";
        usernameError.style.display = "none";
    }

    if (usuarios.find(u => u.nombreUsuario === usuarioIngresado)){
        campoUsername.style.border = "1px solid red";
        usernameError.style.display = "block";
        usernameError.textContent = "Usuario no disponible.";
    } else {
        console.log("Usuario valido");
    }
}

function verificarIgualdadPassword(){
    passwordConfirmContainer.style.border = "none";
    campoPasswordConfirm.style.borderRadius = "5px";
    const campoPassword = document.querySelector("#password");
    if (campoPassword.value === campoPasswordConfirm.value){
        campoPasswordConfirm.style.border = "1px solid green";
        passwordConfirmError.style.display = "none";
    } else {
        campoPasswordConfirm.style.border = "1px solid red";
        passwordConfirmError.style.display = "block";
    }
}


function validarPassword(evento){
    passwordContainer.style.border = "none";
    campoPassword.style.borderRadius = "5px";
    if (evento.target.value.length < 8){
        campoPassword.style.border = "1px solid red";
        passwordError.style.display = "block";
    } else {
        campoPassword.style.border = "1px solid green";
        passwordError.style.display = "none";
    }
}


function togglePasswordVisibility(){
    if (!passwordVisibility.src.includes("off")){
        passwordVisibility.src = "./icons/visibility_off_24dp.png";
        campoPassword.type = "password";
    } else {
        passwordVisibility.src = "./icons/visibility_24dp.png";
        campoPassword.type = "text";
    }
}


function togglePaswordConfirmVisibility(){
    if (!passwordConfirmVisibility.src.includes("off")){
        passwordConfirmVisibility.src = "./icons/visibility_off_24dp.png";
        campoPasswordConfirm.type = "password";
    } else {
        passwordConfirmVisibility.src = "./icons/visibility_24dp.png";
        campoPasswordConfirm.type = "text";
    }
}