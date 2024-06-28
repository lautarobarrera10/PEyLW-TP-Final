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
    img.src = "../img/" + objCurso.img + ".png";
    imgContainer.appendChild(img);

    const nombre = document.createElement("h3");
    nombre.textContent = objCurso.nombre;
    container.appendChild(nombre);

    return container;
}