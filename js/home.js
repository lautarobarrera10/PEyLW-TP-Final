// Si no está iniciado sesión redirigir al login
if (!localStorage.getItem("sesion")){
    window.location.href = "./login.html";
}

if (!localStorage.getItem("cursos")){
    const coleccionCursos = [
        {
            codigo: 1,
            nombre: "Introducción (A1)",
            descripcion: "En este nivel, los estudiantes adquieren las habilidades básicas para comunicarse en situaciones cotidianas y familiares.",
            img: "../img/francia.png",
            nivel: "principiante",
            notaAprobado: 4,
            notaPromocion: 8,
            docente: "Dana Acevedo"
        },
        {
            codigo: 2,
            nombre: "Intermedio (B1)",
            descripcion: "Tercer nivel de competencia lingüística. Este nivel está diseñado para estudiantes que ya tienen una comprensión y uso básico del idioma y quieren mejorar su capacidad para comunicarse de manera más eficaz y fluida en una variedad de situaciones.",
            img: "../img/canada.png",
            nivel: "intermedio",
            notaAprobado: 4,
            notaPromocion: 8,
            docente: "Dana Acevedo"
        },
        {
            codigo: 3,
            nombre: "Dominio operativo eficaz (C1)",
            descripcion: "En este nivel, los estudiantes son capaces de usar el idioma de manera flexible y eficaz para propósitos sociales, académicos y profesionales.",
            img: "../img/belgica.png",
            nivel: "avanzado",
            notaAprobado: 4,
            notaPromocion: 8,
            docente: "Dana Acevedo"
        }
    ]
    localStorage.setItem("cursos", JSON.stringify(coleccionCursos));
}


// Obtenemos el nombre de usuario
const sessionJSON = localStorage.getItem("sesion");
const session = JSON.parse(sessionJSON);
const nombreUsuario = session.nombreUsuario;

const saludo = document.querySelector("#saludo");

saludo.textContent = "Hola " + nombreUsuario;


// Seccion de explorar cursos
let cursosContainer = document.querySelector("#cursos-container");
let misCursosContainer = document.querySelector("#mis-cursos-container");


// Agregamos los cursos a la sección de cursos
let cursos = obtenerCursos();
cursos.forEach(curso => {
    const nodo = crearNodoCurso(curso);
    cursosContainer.appendChild(nodo)

    // Sección explorar
    let misCursos = JSON.parse(localStorage.getItem("sesion")).misCursos
    if (misCursos.includes(curso.codigo)){
        misCursosContainer.appendChild(nodo)
    }
});

