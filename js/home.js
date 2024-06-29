// Si no está iniciado sesión redirigir al login
if (!localStorage.getItem("sesion")){
    window.location.href = "./login.html";
}

// Si no hay cursos en LocalStorage creamos unos por defecto
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
    guardarLocalStorage("cursos", coleccionCursos);
}

function imprimirSaludo(){
    // Obtenemos el nombre del usuario
    let sesion = buscarLocalStorage("sesion");
    let nombreUsuario = sesion.nombreUsuario;

    document.querySelector("#saludo").textContent = "Hola " + nombreUsuario;
}

imprimirSaludo();

function imprimirCursosHome(){
    // Contenedores de cursos
    let cursosContainer = document.querySelector("#cursos-container");
    let misCursosContainer = document.querySelector("#mis-cursos-container");

    // Buscamos los cursos en LocalStorage
    let cursos = buscarLocalStorage("cursos");
    let misCursos = buscarLocalStorage("sesion").misCursos;

    // Recorremos todos los cursos
    cursos.forEach(curso => {
        // Creamos el nodo del curso
        const nodo = crearNodoCurso(curso);
    
        // Si el curso está en mis cursos lo agregamos a la sección de mis cursos
        if (misCursos.includes(curso.codigo)){
            misCursosContainer.appendChild(nodo);
        } else {
            // Si no lo agregamos en la sección explorar
            cursosContainer.appendChild(nodo)
        }
    });
}

imprimirCursosHome();
