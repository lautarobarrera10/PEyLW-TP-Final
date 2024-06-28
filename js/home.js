// Si no está iniciado sesión redirigir al login
if (!localStorage.getItem("sesion")){
    window.location.href = "./login.html";
}

if (!localStorage.getItem("cursos")){
    const coleccionCursos = [
        {
            nombre: "Introducción (A1)",
            descripcion: "En este nivel, los estudiantes adquieren las habilidades básicas para comunicarse en situaciones cotidianas y familiares.",
            img: "francia",
            nivel: "principiante",
            notaAprobado: 4,
            notaPromocion: 8,
            docente: "Dana Acevedo"
        },
        {
            nombre: "Intermedio (B1)",
            descripcion: "Tercer nivel de competencia lingüística. Este nivel está diseñado para estudiantes que ya tienen una comprensión y uso básico del idioma y quieren mejorar su capacidad para comunicarse de manera más eficaz y fluida en una variedad de situaciones.",
            img: "canada",
            nivel: "intermedio",
            notaAprobado: 4,
            notaPromocion: 8,
            docente: "Dana Acevedo"
        },
        {
            nombre: "Dominio operativo eficaz (C1)",
            descripcion: "En este nivel, los estudiantes son capaces de usar el idioma de manera flexible y eficaz para propósitos sociales, académicos y profesionales.",
            img: "belgica",
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
cursosContainer = document.querySelector("#cursos-container");


// Agregamos los cursos a la sección de cursos
const cursos = obtenerCursos();
cursos.forEach(curso => {
    const nodo = crearNodoCurso(curso);
    cursosContainer.appendChild(nodo)
});