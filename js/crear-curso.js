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
    let rta;
    if (nombreCursoIngresado.value.length < 8 || nombreCursoIngresado.value.length > 30){
        errorNombre.style.display = "block";
        nombreCursoIngresado.style.border = "1px solid red"
    } else {
        rta = true;
        errorNombre.style.display = "none";
        nombreCursoIngresado.style.border = "1px solid green"
    }
    return rta;
}

// Descripción del curso
const descripcionCurso = document.querySelector("#descripcion-curso");

// Validar nota de aprobado
const notaAprobado = document.querySelector("#nota-aprobado");
const notaAprobadoError = document.querySelector("#nota-aprobado-error");

notaAprobado.addEventListener("change", validarNotaAprobado);

function validarNotaAprobado(){
    let rta = false;
    if (Number.isInteger(Number(notaAprobado.value)) &&
        Number(notaAprobado.value) > 3 && Number(notaAprobado.value) <= 10) {
        notaAprobadoError.style.display = "none";
        notaAprobado.style.border = "1px solid green";
        rta = true;
    } else {
        notaAprobadoError.style.display = "block";
        notaAprobado.style.border = "1px solid red";
    }
    return rta;
}

// Nivel del curso
const nivelCurso = document.querySelector("#nivel-curso");

nivelCurso.addEventListener("change", validarNivelCurso);

function validarNivelCurso(){
    let rta = false;
    if (nivelCurso.value != ""){
        rta = true;
        nivelCurso.style.border = "1px solid green";
    } else {
        nivelCurso.style.border = "1px solid red";
    }
    return rta;
}


// Validar nota de promoción
const notaPromocion = document.querySelector("#nota-promocion");
const notaPromocionError = document.querySelector("#nota-promocion-error");

notaPromocion.addEventListener("change", validarNotaPromocion);

function validarNotaPromocion(){
    let rta = false;
    if (Number(notaPromocion.value) >= 8 && Number(notaPromocion.value) <= 10) {
        notaPromocionError.style.display = "none";
        notaPromocion.style.border = "1px solid green";
        rta = true;
    } else {
        notaPromocionError.style.display = "block";
        notaPromocion.style.border = "1px solid red";
    }
    return rta;
}

// Seleccionar portada
let portadas = document.querySelectorAll(".portada");

portadas.forEach(portada => {
    portada.addEventListener("click", () => {
        quitarSelecciones();
        portada.classList.add("select");
    })
})

function quitarSelecciones(){
    portadas.forEach(portada => {
        portada.classList.remove("select");
    })
}

// Úlima validación al presionar el botón
const crearCursoButton = document.querySelector("#crear-curso-button");

crearCursoButton.addEventListener("click", validarFormulario);

function validarFormulario(){
    const nombreValidado = validarNombreCurso()
    const nivelValidado = validarNivelCurso()
    const aprobadoValidado = validarNotaAprobado()
    const promocionValidada = validarNotaPromocion()
    if (nombreValidado && nivelValidado && aprobadoValidado && promocionValidada){
        const coleccionCursos = JSON.parse(localStorage.getItem("cursos"));
        const docente = JSON.parse(localStorage.getItem("sesion"))["nombreUsuario"];
        console.log(document.querySelector(".portada.select").src)
        const cursoNuevo = {
                nombre: nombreCursoIngresado.value,
                descripcion: descripcionCurso.value,
                img: document.querySelector(".portada.select").childNodes[1].src,
                nivel: nivelCurso.value,
                notaAprobado: notaAprobado.value,
                notaPromocion: notaPromocion.value,
                docente: docente,
        };
        coleccionCursos.push(cursoNuevo);
        localStorage.setItem("cursos", JSON.stringify(coleccionCursos));
        document.querySelector("#crear-curso-form").textContent = "";
        document.querySelector("h1").textContent = "Curso crea exitosamente ✅";
    }
}