const sesion = JSON.parse(localStorage.getItem("sesion"));
const crearCursoButton = document.querySelector("#crear-curso");

if (sesion.tipo == "profesor") {
    crearCursoButton.style.display = "flex";
}

crearCursoButton.addEventListener("click", () => {
    location.href ="./crear-curso.html";
})