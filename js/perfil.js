// Si no está iniciado sesión redirigir al login
if (!localStorage.getItem("sesion")){
    window.location.href = "./login.html";
}

function imprimirNombre(){
    let nombreUsuario = buscarLocalStorage("sesion").nombreUsuario;
    document.querySelector("#username").textContent = nombreUsuario;
}

imprimirNombre();

// Botón de cerrar sesión
document.querySelector("#cerrar-sesion").addEventListener("click", () => {
    localStorage.removeItem("sesion");
    window.location.href = "./login.html";
});