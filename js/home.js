// Si no está iniciado sesión redirigir al login
if (!localStorage.getItem("sesion")){
    window.location.href = "./login.html";
}

// Obtenemos el nombre de usuario
const sessionJSON = localStorage.getItem("sesion");
const session = JSON.parse(sessionJSON);
const nombreUsuario = session.nombreUsuario;

const saludo = document.querySelector("#saludo");

saludo.textContent = "Hola " + nombreUsuario;
