// Si está iniciado sesión redirigir al home
if (localStorage.getItem("sesion")){
    window.location.href = "./home.html";
}

// Verificar si el array de usuarios ya está definido en localStorage
if (!localStorage.getItem("usuarios")) {
    // Array con usuarios pre-definidos
    const usuarios = [
        {
            email: "admin@admin.com",
            nombreUsuario: "admin",
            password: "admin123",
            fechaNacimiento: "2024-07-24",
            tipo: "administrador",
            misCursos: []
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
const campoFechaNacimiento = document.querySelector("#fecha-nacimiento");
const fechaNacimientoError = document.querySelector("#fecha-nacimiento-error");
const campoCorreoElectronico = document.querySelector("#correo-electronico");
const correoElectronicoError = document.querySelector("#correo-electronico-error");



// Event Listeners
campoPasswordConfirm.addEventListener("change", verificarIgualdadPassword);
campoPassword.addEventListener("change", validarPassword);
campoPassword.addEventListener("change", verificarIgualdadPassword);
passwordVisibility.addEventListener("click", togglePasswordVisibility);
passwordConfirmVisibility.addEventListener("click", togglePaswordConfirmVisibility);
campoUsername.addEventListener("change", verificarUsername);
registerButton.addEventListener("click", registrar);
campoFechaNacimiento.addEventListener("change", validarFecha);
campoCorreoElectronico.addEventListener("change", validarEmailIngresado);

function validarEmailIngresado(){
    let respuesta = false;
    const emailIngresado = campoCorreoElectronico.value;
    if (validarEmail(emailIngresado)){
        campoCorreoElectronico.style.border = "1px solid green";
        correoElectronicoError.style.display = "none";
        respuesta = true;
    } else {
        campoCorreoElectronico.style.border = "1px solid red";
        correoElectronicoError.style.display = "block";
    }
    return respuesta;
}

function validarEmail(email) {
    let esValido = true;

    // Verificar que el email tenga solo un '@'
    const partes = email.split('@');
    if (partes.length !== 2) {
        esValido = false;
    }

    const [local, dominio] = partes;

    // Verificar que haya algo antes y después del '@'
    if (esValido && (local.length === 0 || dominio.length === 0)) {
        esValido = false;
    }

    // Verificar que el dominio tenga al menos un punto '.'
    const dominioPartes = dominio ? dominio.split('.') : [];
    if (esValido && dominioPartes.length < 2) {
        esValido = false;
    }

    // Verificar que cada parte del dominio no esté vacía
    if (esValido) {
        esValido = verificarPartesDominio(dominioPartes);
    }

    // Verificar que la última parte del dominio tenga al menos 2 caracteres y no contenga números ni tildes
    if (esValido) {
        esValido = verificarUltimaParteDominio(dominioPartes[dominioPartes.length - 1]);
    }

    // Verificar que la parte local no contenga caracteres inválidos
    if (esValido) {
        esValido = esParteLocalValida(local);
    }

    // Verificar que la parte del dominio (excepto la última parte) no contenga caracteres inválidos
    if (esValido) {
        esValido = verificarPartesDominioExceptoUltima(dominioPartes);
    }

    // Función para verificar que todas las partes del dominio no estén vacías
    function verificarPartesDominio(dominioPartes) {
        let esValido = true;
        let i = 0;
        while (i < dominioPartes.length && esValido) {
            if (dominioPartes[i].length === 0) {
                esValido = false;
            }
            i++;
        }
        return esValido;
    }

    // Función para verificar la última parte del dominio
    function verificarUltimaParteDominio(ultimaParte) {
        let esValido = true;
        if (ultimaParte.length < 2 || !esSoloLetras(ultimaParte)) {
            esValido = false;
        }
        return esValido;
    }

    // Función para verificar las partes del dominio excepto la última
    function verificarPartesDominioExceptoUltima(dominioPartes) {
        let esValido = true;
        let m = 0;
        while (m < dominioPartes.length - 1 && esValido) {
            if (!esParteDominioValida(dominioPartes[m])) {
                esValido = false;
            }
            m++;
        }
        return esValido;
    }

    // Función para verificar que un texto contenga solo letras
    function esSoloLetras(texto) {
        let esValido = true;
        let i = 0;
        while (i < texto.length && esValido) {
            const char = texto[i];
            if (char.toLowerCase() === char.toUpperCase() || 'áéíóúÁÉÍÓÚ'.includes(char)) {
                esValido = false;
            }
            i++;
        }
        return esValido;
    }

    // Función para verificar la parte local del correo
    function esParteLocalValida(local) {
        let esValido = true;
        let i = 0;
        while (i < local.length && esValido) {
            const char = local[i];
            if (!(char.toLowerCase() !== char.toUpperCase() || (char >= '0' && char <= '9') || char === '.' || char === '_' || char === '-')) {
                esValido = false;
            }
            i++;
        }
        return esValido;
    }

    // Función para verificar las partes del dominio (excepto la última)
    function esParteDominioValida(parteDominio) {
        let esValido = true;
        let i = 0;
        while (i < parteDominio.length && esValido) {
            const char = parteDominio[i];
            if (!(char.toLowerCase() !== char.toUpperCase() || (char >= '0' && char <= '9'))) {
                esValido = false;
            }
            i++;
        }
        return esValido;
    }

    return esValido;
}

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
    if (verificarUsername() && validarPassword() && verificarIgualdadPassword() && validarFecha() && validarEmailIngresado() ){
        // Recuperar la cadena JSON desde localStorage
        let usuariosJSON = localStorage.getItem("usuarios");

        // Convertir la cadena JSON de nuevo en un array
        const usuarios = JSON.parse(usuariosJSON);

        // Sumamos el usuario
        usuarios.push({
            email: campoCorreoElectronico.value,
            nombreUsuario: campoUsername.value,
            password: campoPassword.value,
            fechaNacimiento: campoFechaNacimiento.value,
            tipo: campoTipo.value,
            misCursos: []
        })

        // Lo volvemos a convertir en JSON
        usuariosJSON = JSON.stringify(usuarios);

        // Lo volvemos a guardar en localstorage
        localStorage.setItem("usuarios", usuariosJSON);

        // Redirigir a pagina de registro exitoso
        window.location.href = "./registroExitoso.html";
    }
}

function validarFecha() {
    let respuesta = false;
    const fechaIngresada = campoFechaNacimiento.value;

    // Obtener la fecha actual
    let currentDate = new Date();

    // Restarle 18 años a la fecha actual para obtener la fecha máxima permitida
    let fechaMaxima = new Date(currentDate);
    fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18);

    // Restarle 60 años a la fecha actual para obtener la fecha mínima permitida
    let fechaMinima = new Date(currentDate);
    fechaMinima.setFullYear(fechaMinima.getFullYear() - 60);

    // Convertir las fechas a string en formato yyyy-mm-dd
    function formatDate(date) {
        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    let formattedFechaMaxima = formatDate(fechaMaxima);
    let formattedFechaMinima = formatDate(fechaMinima);

    if (fechaIngresada <= formattedFechaMaxima && fechaIngresada >= formattedFechaMinima) {
        campoFechaNacimiento.style.border = "1px solid green";
        fechaNacimientoError.style.display = "none";
        respuesta = true;
    } else {
        campoFechaNacimiento.style.border = "1px solid red";
        fechaNacimientoError.style.display = "block";
    }

    return respuesta;
}