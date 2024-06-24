// Si no está iniciado sesión redirigir al login
if (!localStorage.getItem("sesion")){
    window.location.href = "./login.html";
}

// Botón de volver atrás
const volverAtras = document.querySelector("#volver-atras");
volverAtras.addEventListener("click", () => {
    window.location.href = "./cursos.html";
})

// Validar nombre del curso
const nombreCursoIngresado = document.querySelector("#nombre-curso");
const errorNombre = document.querySelector("#nombre-curso-error");
nombreCursoIngresado.addEventListener("change", validarNombreCurso)

function validarNombreCurso(){
    if (nombreCursoIngresado.value.length < 8 || nombreCursoIngresado.value.length > 30){
        errorNombre.style.display = "block";
        nombreCursoIngresado.style.border = "1px solid red"
    } else {
        errorNombre.style.display = "none";
        nombreCursoIngresado.style.border = "1px solid green"
    }
}