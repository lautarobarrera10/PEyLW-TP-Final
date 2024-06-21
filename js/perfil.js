// Si no está iniciado sesión redirigir al login
if (!localStorage.getItem("sesion")){
    window.location.href = "./login.html";
}

const sessionJSON = localStorage.getItem("sesion");
const session = JSON.parse(sessionJSON);
const nombreUsuario = session.nombreUsuario;

const usernameDom = document.querySelector("#username");

usernameDom.textContent = nombreUsuario;

const cerrarSessionButton = document.querySelector("#cerrar-sesion");

cerrarSessionButton.addEventListener("click", cerrarSession);

function cerrarSession(){
    localStorage.removeItem("sesion");
    window.location.href = "./login.html";
}