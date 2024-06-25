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

// Validar nota de aprobado
const notaAprobado = document.querySelector("#nota-aprobado");
const notaAprobadoError = document.querySelector("#nota-aprobado-error");

notaAprobado.addEventListener("change", validarNotaAprobado);

function validarNotaAprobado(){
    if (Number.isInteger(Number(notaAprobado.value)) &&
        notaAprobado.value > 5 && notaAprobado.value <= 10) {
        notaAprobadoError.style.display = "none";
        notaAprobado.style.border = "1px solid green";
    } else {
        notaAprobadoError.style.display = "block";
        notaAprobado.style.border = "1px solid red";
    }
}


// Validar nota de promoción
const notaPromocion = document.querySelector("#nota-promocion");
const notaPromocionError = document.querySelector("#nota-promocion-error");

notaPromocion.addEventListener("change", validarNotaPromocion);

function validarNotaPromocion(){
    if (Number(notaPromocion.value) >= 8 && Number(notaPromocion.value) <= 10) {
        notaPromocionError.style.display = "none";
        notaPromocion.style.border = "1px solid green";
    } else {
        notaPromocionError.style.display = "block";
        notaPromocion.style.border = "1px solid red";
    }
}