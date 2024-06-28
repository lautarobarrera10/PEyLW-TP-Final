// Obtener un array de los cursos
function obtenerCursos(){
    const cursoJSON = localStorage.getItem("cursos");
    const cursos = JSON.parse(cursoJSON);
    return cursos;
}

// Obtener un array de los cursos
function obtenerMisCursos(){
    const cursoJSON = localStorage.getItem("mis-cursos");
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


    // Si no tengo cursos aun
    if (!localStorage.getItem("mis-cursos")){
        // Creamos el botón para agregar este curso
        let tomarCurso = document.createElement("span");
        tomarCurso.classList.add("material-symbols-outlined");
        tomarCurso.classList.add("tomarCursoButton");
        tomarCurso.textContent = "add_circle_outline";

        // Si hacemos click en el botón de agregar, se agrega el primer curso
        tomarCurso.addEventListener("click", () => {
            let misCursos = JSON.stringify([objCurso]);
            localStorage.setItem("mis-cursos", misCursos);

            // Cambiamos el tipo de botón
            tomarCurso.textContent = "remove_circle_outline";
            tomarCurso.style.color = "red";

            // Recargamos la página
            location.reload();
        });

        // Por último agregamos el nodo al contenedor
        imgContainer.appendChild(tomarCurso);

    } else {
        // Si ya tenemos cursos, evaluamos si este ya forma parte
        let misCursos = JSON.parse(localStorage.getItem("mis-cursos"));
        let yaEstoyCursando = misCursos.find(curso => curso.nombre == objCurso.nombre);

        // Si ya estoy cursando este curso
        if (yaEstoyCursando){
            // Le agregamos el botón de dejar de cursar
            let tomarCurso = document.createElement("span");
            tomarCurso.classList.add("material-symbols-outlined");
            tomarCurso.classList.add("tomarCursoButton");
            tomarCurso.style.color = "red";
            tomarCurso.textContent = "remove_circle_outline";

            // Si hacemos click en el botón de quitar
            tomarCurso.addEventListener("click", () => {
                // Quitamos el curso del local storage
                index = misCursos.indexOf(yaEstoyCursando);
                misCursos.splice(index, 1);

                // Actualizamos el local storage
                localStorage.setItem("mis-cursos", JSON.stringify(misCursos));

                // Actualizamos el boton
                tomarCurso.style.color = "green";
                tomarCurso.textContent = "add_circle_outline";

                // Recargamos la página
                location.reload();
            });

            // Por último agregamos el nodo al contenedor
            imgContainer.appendChild(tomarCurso);
        } else {
            // Si ya existe mis cursos pero este no forma parte le agregamos el botón para sumarlo
            // Creamos el botón para agregar este curso
            let tomarCurso = document.createElement("span");
            tomarCurso.classList.add("material-symbols-outlined");
            tomarCurso.classList.add("tomarCursoButton");
            tomarCurso.textContent = "add_circle_outline";

            // Si hacemos click en el botón de agregar, se agrega al array de cursos
            tomarCurso.addEventListener("click", () => {
                let misCursos = JSON.parse(localStorage.getItem("mis-cursos"));
                misCursos.push(objCurso);

                // Actualizamos el local storage
                localStorage.setItem("mis-cursos", JSON.stringify(misCursos));

                // Cambiamos el tipo de botón
                tomarCurso.textContent = "remove_circle_outline";
                tomarCurso.style.color = "red";

                // Recargamos la página
                location.reload();
            });

            // Por último agregamos el nodo al contenedor
            imgContainer.appendChild(tomarCurso);

        }
    }

    const nombre = document.createElement("h3");
    nombre.textContent = objCurso.nombre;
    container.appendChild(nombre);

    return container;
}