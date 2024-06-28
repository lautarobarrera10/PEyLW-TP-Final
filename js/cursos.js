const sesion = JSON.parse(localStorage.getItem("sesion"));
const crearCursoButton = document.querySelector("#crear-curso");

if (sesion.tipo == "profesor") {
    crearCursoButton.style.display = "flex";
}

crearCursoButton.addEventListener("click", () => {
    location.href ="./crear-curso.html";
})


// Cursos de principiantes
function mostrarCursosPrincipiante(){
    let principianteContainer = document.querySelector("#cursos-principiante-container");
    let cursos = obtenerCursos();
    let cursosPrincipiante = cursos.filter(curso => curso.nivel == "principiante");
    cursosPrincipiante.forEach(curso => {
        principianteContainer.appendChild(crearNodoCurso(curso));
    });
}

mostrarCursosPrincipiante();

// Cursos intermedios
function mostrarCursosIntermedio(){
    let intermedioContainer = document.querySelector("#cursos-intermedio-container");
    let cursos = obtenerCursos();
    let cursosIntermedio = cursos.filter(curso => curso.nivel == "intermedio");
    cursosIntermedio.forEach(curso => {
        intermedioContainer.appendChild(crearNodoCurso(curso));
    });
}

mostrarCursosIntermedio();

// Cursos intermedios
function mostrarCursosAvanzado(){
    let avanzadoContainer = document.querySelector("#cursos-avanzado-container");
    let cursos = obtenerCursos();
    let cursosAvanzado = cursos.filter(curso => curso.nivel == "avanzado");
    cursosAvanzado.forEach(curso => {
        avanzadoContainer.appendChild(crearNodoCurso(curso));
    });
}

mostrarCursosAvanzado();