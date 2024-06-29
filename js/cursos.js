// Si es profesor mostramos el botón de agregar curso
if (buscarLocalStorage("sesion").tipo == "profesor"){
    mostrarBotonAgregarCurso();
}

function mostrarBotonAgregarCurso(){
    let crearCursoButton = document.querySelector("#crear-curso");
    crearCursoButton.style.display = "flex";
    // Al hacer click enviar a la página de creación
    crearCursoButton.addEventListener("click", () => {
        location.href ="./crear-curso.html";
    })
}

function imprimirCursosFiltrados(nivel, contenedor){
    let cursos = buscarLocalStorage("cursos");
    let cursosFiltrados = cursos.filter(curso => curso.nivel == nivel);
    cursosFiltrados.forEach(curso => {
        contenedor.appendChild(crearNodoCurso(curso));
    });
}

imprimirCursosFiltrados("principiante", document.querySelector("#cursos-principiante-container"));
imprimirCursosFiltrados("intermedio", document.querySelector("#cursos-intermedio-container"));
imprimirCursosFiltrados("avanzado", document.querySelector("#cursos-avanzado-container"));