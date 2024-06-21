// Si está iniciado sesión redirigir al home
if (localStorage.getItem("sesion")){
    window.location.href = "./home.html";
}

// Verificar si el array de usuarios ya está definido en localStorage
if (!localStorage.getItem("usuarios")) {
    // Array con usuarios pre-definidos
    const usuarios = [
        {
            nombreUsuario: "admin",
            password: "admin123",
            tipo: "administrador"
        },
    ];

    // Convertir el array en una cadena JSON
    const usuariosJSON = JSON.stringify(usuarios);

    // Guardar el array en localStorage
    localStorage.setItem("usuarios", usuariosJSON);
}


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
const campoTipo = document.querySelector("#tipo-usuario");


// Event Listeners
campoPasswordConfirm.addEventListener("change", verificarIgualdadPassword);
campoPassword.addEventListener("change", validarPassword);
campoPassword.addEventListener("change", verificarIgualdadPassword);
passwordVisibility.addEventListener("click", togglePasswordVisibility);
passwordConfirmVisibility.addEventListener("click", togglePaswordConfirmVisibility);
campoUsername.addEventListener("change", verificarUsername);
registerButton.addEventListener("click", registrar);

/**
 * Función para verificar el nombre de usuario ingresado
 * @returns {boolean} - Retorna true si el nombre de usuario es válido, false en caso contrario
 */
function verificarUsername(){
    let respuesta = false; // Variable para almacenar el estado de la validación

    // Obtenemos el valor ingresado por el usuario desde el evento
    let usuarioIngresado = campoUsername.value;

    // Cambiamos el radio del borde del input
    campoUsername.style.borderRadius = "5px";

    // Recuperar la cadena JSON desde localStorage
    const usuariosJSON = localStorage.getItem("usuarios");

    // Convertir la cadena JSON de nuevo en un array
    const usuarios = JSON.parse(usuariosJSON);
    

    // Verificamos si el nombre de usuario tiene menos de 5 caracteres
    if (usuarioIngresado.length < 5){
        // Si es así, mostramos un mensaje de error y cambiamos el borde a rojo
        campoUsername.style.border = "1px solid red";
        usernameError.style.display = "block";
        usernameError.textContent = "El nombre de usuario debe tener al menos 5 caracteres.";
    } else if (usuarios.find(u => u.nombreUsuario === usuarioIngresado)) {
        // Verificamos si el nombre de usuario ya existe en la lista de usuarios
        // Si es así, mostramos un mensaje de error y cambiamos el borde a rojo
        campoUsername.style.border = "1px solid red";
        usernameError.style.display = "block";
        usernameError.textContent = "Usuario no disponible.";
    } else {
        // Si el nombre de usuario es válido y no está en uso, cambiamos el borde a verde y ocultamos el mensaje de error
        campoUsername.style.border = "1px solid green";
        usernameError.style.display = "none";
        respuesta = true; // Actualizamos la variable de retorno a true
    }

    return respuesta; // Retornamos el estado de la validación
}

/**
 * Esta función compara el valor del campo de contraseña con el campo de confirmación de contraseña.
 * Si coinciden, cambia el borde del campo de confirmación de contraseña a verde y oculta el mensaje de error.
 * Si no coinciden, cambia el borde a rojo y muestra el mensaje de error.
 *
 * @returns {boolean} - Retorna `true` si las contraseñas coinciden, `false` si no coinciden.
 */
function verificarIgualdadPassword(){
    let respuesta = false; // Variable para almacenar el estado de la validación

    // Quitamos el borde del contenedor
    passwordConfirmContainer.style.border = "none";

    // Cambiamos el radio del borde del input
    campoPasswordConfirm.style.borderRadius = "5px";

    // Validamos que ambos campos sean iguales
    if (campoPassword.value === campoPasswordConfirm.value){
        campoPasswordConfirm.style.border = "1px solid green";
        passwordConfirmError.style.display = "none";
        respuesta = true;
    } else {
        // Si no son iguales mostramos el error
        campoPasswordConfirm.style.border = "1px solid red";
        passwordConfirmError.style.display = "block";
    }

    return respuesta;
}

/**
 * 
 * @returns {boolean} - Retorna `true` si las contraseñas es valida, `false` si no.
 */
function validarPassword(){
    let respuesta = false; // Variable para almacenar el estado de la validación

    // Quitamos el borde del contenedor
    passwordContainer.style.border = "none";

    // Cambiamos el radio del borde del input
    campoPassword.style.borderRadius = "5px";

    // Validamos que la contraseña contenga al menos 8 caracteres
    if (campoPassword.value.length < 8){
        // Si no es asi mostramos el error
        campoPassword.style.border = "1px solid red";
        passwordError.style.display = "block";
    } else {
        // Si cumple quitamos el error, ponemos el campo en verde y cambiamos la variable de validación
        campoPassword.style.border = "1px solid green";
        passwordError.style.display = "none";
        respuesta = true;
    }

    return respuesta;
}

/**
 * Cambia si se ve la contraseña o no
 */
function togglePasswordVisibility(){
    if (!passwordVisibility.src.includes("off")){
        passwordVisibility.src = "../icons/visibility_off_24dp.png";
        campoPassword.type = "password";
    } else {
        passwordVisibility.src = "../icons/visibility_24dp.png";
        campoPassword.type = "text";
    }
}

/**
 * Cambia si se ve la confirmación de contraseña o no
 */
function togglePaswordConfirmVisibility(){
    if (!passwordConfirmVisibility.src.includes("off")){
        passwordConfirmVisibility.src = "../icons/visibility_off_24dp.png";
        campoPasswordConfirm.type = "password";
    } else {
        passwordConfirmVisibility.src = "../icons/visibility_24dp.png";
        campoPasswordConfirm.type = "text";
    }
}

function registrar(){
    if (verificarUsername() && validarPassword() && verificarIgualdadPassword()){
        // Recuperar la cadena JSON desde localStorage
        let usuariosJSON = localStorage.getItem("usuarios");

        // Convertir la cadena JSON de nuevo en un array
        const usuarios = JSON.parse(usuariosJSON);

        // Sumamos el usuario
        usuarios.push({
            nombreUsuario: campoUsername.value,
            password: campoPassword.value,
            tipo: campoTipo.value
        })

        // Lo volvemos a convertir en JSON
        usuariosJSON = JSON.stringify(usuarios);

        // Lo volvemos a guardar en localstorage
        localStorage.setItem("usuarios", usuariosJSON);

        // Redirigir a pagina de registro exitoso
        window.location.href = "./registroExitoso.html";
    }
}