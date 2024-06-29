/**
 * Busca en LocalStorage con la clave y lo retorna parseado
 * @param {String} clave clave con la que se guardó
 * @returns {*}
 */
function buscarLocalStorage(clave){
    return JSON.parse(localStorage.getItem(clave));
}

/**
 * Toma cualquier tipo de archivo, lo convierte en string y lo guarda en LocalStorage con la clave que le pasemos
 * @param {String} clave nombre de la clave
 * @param {*} valor Lo que quieras guardar
 */
function guardarLocalStorage(clave, valor){
    localStorage.setItem(clave, JSON.stringify(valor));
}

/**
 * Dado un objeto de tipo curso retorna un nodo para pintar el curso. Distingue si el curso está en "misCursos" o no.
 * @param {Object} objCurso Curso en formato Obj
 * @returns {Node}
 */
function crearNodoCurso(objCurso){
    // Contenedor del curso
    let container = document.createElement("div");
    container.classList.add("curso");

    // Contenedor de la imagen
    let imgContainer = document.createElement("div");
    imgContainer.classList.add("img-container");
    container.appendChild(imgContainer);

    // La imagen del curso
    let img = document.createElement("img");
    img.src = objCurso.img;
    imgContainer.appendChild(img);

    // Preparamos las clases del botón
    let tomarCurso = document.createElement("span");
    tomarCurso.classList.add("material-symbols-outlined");
    tomarCurso.classList.add("tomarCursoButton");

    // Array con mis curso
    let sesion = buscarLocalStorage("sesion");
    let misCursos = sesion.misCursos;

    // Si el curso ya está en mis cursos personalizamos el contenido y color del botón
    if (misCursos.includes(objCurso.codigo)){
        tomarCurso.textContent = "remove_circle_outline";
        tomarCurso.style.color = "red";
    } else {
        // Si no está en mis cursos son otros estilos
        tomarCurso.textContent = "add_circle_outline";
        tomarCurso.style.color = "green";
    }

    // Escuchamos el click
    tomarCurso.addEventListener("click", toggleTomarCurso);

    /**
     * Función que se ejecuta al hacer click en el botón de agregar/quitar curso
     * Si el curso está en mis cursos lo quita y si no está lo agrega.
     */
    function toggleTomarCurso(){
        // Obtenemos el array de la sesión para ver mis cursos
        let sesion = buscarLocalStorage("sesion");
        let misCursos = sesion.misCursos;
        // Si el cursó está en mis cursos lo quitamos con splice
        if (misCursos.includes(objCurso.codigo)) {
            let i = misCursos.indexOf(objCurso.codigo);
            misCursos.splice(i, 1);
            // Cambiamos el estilo del botón
            tomarCurso.textContent = "add_circle_outline";
            tomarCurso.style.color = "green";
        } else {
            // Si está en misCursos lo agregamos y cambiamos los estilos del botón
            misCursos.push(objCurso.codigo);
            tomarCurso.textContent = "remove_circle_outline";
            tomarCurso.style.color = "red";
        }

        // Acutalizamos el atributo misCursos de la sesión con el array modificado
        sesion.misCursos = misCursos;

        // Actualizamos el local storage
        guardarLocalStorage("sesion", sesion)

        // Actualizamos los cursos en usuarios
        // Obtenemos el array de usuarios
        let usuarios = buscarLocalStorage("usuarios");

        // Buscamos el usuario actual
        let usuarioActual = usuarios.find(usuario => usuario.nombreUsuario == sesion.nombreUsuario);

        // Acutalizamos el atributo misCursos del usuario con el array modificado
        usuarioActual.misCursos = misCursos;

        // Eliminamos el usuario actual del array de usuarios
        let indexUsuarioActual = usuarios.indexOf(usuario => usuario.nombreUsuario == sesion.nombreUsuario);
        usuarios.splice(indexUsuarioActual, 1);

        // Agregamos el usuario modificado
        usuarios.push(usuarioActual);

        // Actualizamos el local storage
        guardarLocalStorage("usuarios", usuarios);
    }

    // Agregamos el botón al contendor de la imagen
    imgContainer.appendChild(tomarCurso);

    // Nodo con nombre del curso
    const nombre = document.createElement("h3");
    nombre.textContent = objCurso.nombre;
    container.appendChild(nombre);

    // Nodo del curso
    return container;
}