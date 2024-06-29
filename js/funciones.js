// Obtener un array de los cursos
function obtenerCursos(){
    const cursoJSON = localStorage.getItem("cursos");
    const cursos = JSON.parse(cursoJSON);
    return cursos;
}

// Retorna un nodo de curso
function crearNodoCurso(objCurso){
    const container = document.createElement("div");
    container.classList.add("curso");

    const imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    container.appendChild(imgContainer);

    const img = document.createElement("img");
    img.src = objCurso.img;
    imgContainer.appendChild(img);

    // Botón agregar/quitar
    const tomarCurso = document.createElement("span");
    tomarCurso.classList.add("material-symbols-outlined");
    tomarCurso.classList.add("tomarCursoButton");
    let sesion = JSON.parse(localStorage.getItem("sesion"));
    let misCursos = sesion.misCursos;

    // Agregamos el boton que corresponda
    if (misCursos.includes(objCurso.codigo)){
        tomarCurso.textContent = "remove_circle_outline";
        tomarCurso.style.color = "red";
    } else {
        tomarCurso.textContent = "add_circle_outline";
        tomarCurso.style.color = "green";
    }

    // Escuchamos el click
    tomarCurso.addEventListener("click", toggleTomarCurso);

    function toggleTomarCurso(){
        let sesion = JSON.parse(localStorage.getItem("sesion"));
        let misCursos = sesion.misCursos;
        if (misCursos.includes(objCurso.codigo)) {
            let i = misCursos.indexOf(objCurso.codigo);
            misCursos.splice(i, 1);
            tomarCurso.textContent = "add_circle_outline";
            tomarCurso.style.color = "green";
        } else {
            tomarCurso.textContent = "remove_circle_outline";
            tomarCurso.style.color = "red";
            misCursos.push(objCurso.codigo);
        }

        sesion.misCursos = misCursos;
        localStorage.setItem("sesion", JSON.stringify(sesion))
        console.log(localStorage.getItem("sesion"))


        // Actualizamos los cursos en usuarios
        let usuarios = JSON.parse(localStorage.getItem("usuarios"));
        let usuarioActual = usuarios.find(usuario => usuario.nombreUsuario == sesion.nombreUsuario);
        usuarioActual.misCursos = misCursos;

        let indexUsuarioActual = usuarios.indexOf(usuario => usuario.nombreUsuario == sesion.nombreUsuario);
        usuarios.splice(indexUsuarioActual, 1);

        usuarios.push(usuarioActual);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log(localStorage.getItem("usuarios"))
    }

    imgContainer.appendChild(tomarCurso);

    const nombre = document.createElement("h3");
    nombre.textContent = objCurso.nombre;
    container.appendChild(nombre);

    return container;
}