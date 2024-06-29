// Si no está iniciado sesión redirigir al login
if (!localStorage.getItem("sesion")){
    window.location.href = "./login.html";
}

// Botón de volver atrás
document.querySelector("#volver-atras").addEventListener("click", () => {
    window.location.href = "./cursos.html";
})

// Cuando se cambia el nombre del curso se valida
let nombreCursoIngresado = document.querySelector("#nombre-curso");
nombreCursoIngresado.addEventListener("change", validarNombreCurso);

// Nodo para mostrar error en el nombre
let errorNombre = document.querySelector("#nombre-curso-error");

function validarNombreCurso(){
    let rta = false; // Variable de retorno
    // Si no es un nombre válido
    if (nombreCursoIngresado.value.length < 8 || nombreCursoIngresado.value.length > 30){
        errorNombre.style.display = "block"; // Mostramos el error
        nombreCursoIngresado.style.border = "1px solid red" // Pintamos de rojo el borde
    } else {
        // Si es válido
        rta = true; // Cambiamos el valor de la variable de retorno
        errorNombre.style.display = "none"; // Quitamos el error si es que lo había
        nombreCursoIngresado.style.border = "1px solid green" // Pintamos el borde de verde
    }
    return rta;
}

// Descripción del curso. No hacemos ninguna validación. Solo lo guardamos en una variable para después agregarla al obj de curso
let descripcionCurso = document.querySelector("#descripcion-curso");

let notaAprobado = document.querySelector("#nota-aprobado"); // Nota de aprobado
let notaAprobadoError = document.querySelector("#nota-aprobado-error"); // Mensaje de error de nota de aprobado

notaAprobado.addEventListener("change", validarNotaAprobado); // Cuando cambia la nota, la valdiamos

function validarNotaAprobado(){
    let rta = false; // variable de retorno
    if (Number.isInteger(Number(notaAprobado.value)) &&
        Number(notaAprobado.value) > 3 && Number(notaAprobado.value) <= 10) {
        // Si la nota de aprobado es un entero mayor a 3 y menor o igual a 10
        notaAprobadoError.style.display = "none"; // Quitamos el mensaje de error en caso de que lo hubiera
        notaAprobado.style.border = "1px solid green"; // Pintamos de verde el borde
        rta = true; // Cambiamos la variable de retorno
    } else {
        // Si no cumple la validación
        notaAprobadoError.style.display = "block"; // mostramos el mensaje de error
        notaAprobado.style.border = "1px solid red"; // pintamos el borde de rojo
    }
    return rta;
}

// Nivel del curso
let nivelCurso = document.querySelector("#nivel-curso"); // nodo del nivel del curso

nivelCurso.addEventListener("change", validarNivelCurso);

function validarNivelCurso(){
    let rta = false; // valirable de retorno
    if (nivelCurso.value != ""){
        // Si seleccionó mostramos que está todo bien
        rta = true;
        nivelCurso.style.border = "1px solid green";
    } else {
        // sino indicamos que debe seleccionar con un borde rojo
        nivelCurso.style.border = "1px solid red";
    }
    return rta;
}


// Validar nota de promoción
let notaPromocion = document.querySelector("#nota-promocion");
let notaPromocionError = document.querySelector("#nota-promocion-error");

notaPromocion.addEventListener("change", validarNotaPromocion);

function validarNotaPromocion(){
    let rta = false;
    // Validamos que la nota de promoción sea igual o mayor a 8 e igual o menor a 10
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
let portadas = document.querySelectorAll(".portada"); // Node list de todas las portadas

portadas.forEach(portada => {
    // Escuchamos el click de todas las portadas
    portada.addEventListener("click", () => {
        quitarSelecciones(); // Quitamos todas las selecciones si las hubiera
        portada.classList.add("select"); // Seleccionamos a la que se hizo click
    })
})

// Funcion para quitar el select de todas las portadas
function quitarSelecciones(){
    portadas.forEach(portada => {
        portada.classList.remove("select");
    })
}

// Úlima validación al presionar el botón
const crearCursoButton = document.querySelector("#crear-curso-button");

crearCursoButton.addEventListener("click", validarFormulario);

function validarFormulario(){
    // Validamos todas los campos
    let nombreValidado = validarNombreCurso()
    let nivelValidado = validarNivelCurso()
    let aprobadoValidado = validarNotaAprobado()
    let promocionValidada = validarNotaPromocion()
    // Si todos son correctos
    if (nombreValidado && nivelValidado && aprobadoValidado && promocionValidada){
        let coleccionCursos = buscarLocalStorage("cursos"); // Traemos todos los cursos
        const docente = buscarLocalStorage("sesion")["nombreUsuario"]; // Nombre de usuario del docente
        // Construimos el nuevo curso
        const cursoNuevo = {
                codigo: coleccionCursos.length + 1,
                nombre: nombreCursoIngresado.value,
                descripcion: descripcionCurso.value,
                img: document.querySelector(".portada.select").childNodes[1].src,
                nivel: nivelCurso.value,
                notaAprobado: notaAprobado.value,
                notaPromocion: notaPromocion.value,
                docente: docente,
        };
        coleccionCursos.push(cursoNuevo); // Lo agregamos a la coleccion
        guardarLocalStorage("cursos", coleccionCursos); // Actualizamos el LS

        // Mostramos un mensaje de que el curso se creó correctamente
        document.querySelector("#crear-curso-form").textContent = "";
        document.querySelector("h1").textContent = "Curso creado exitosamente ✅";
    }
}