// Si está iniciado sesión redirigir al home
if (localStorage.getItem("sesion")){
    window.location.href = "./home.html";
}

// Verificar si el array de usuarios ya está definido en localStorage
if (!localStorage.getItem("usuarios")) {
    // Array con usuarios pre-definidos
    const usuarios = [
        {
            email: "admin@admin.com",
            nombreUsuario: "admin",
            password: "admin123",
            fechaNacimiento: "2024-07-24",
            tipo: "administrador",
            misCursos: []
        },
    ];

    // Convertir el array en una cadena JSON
    const usuariosJSON = JSON.stringify(usuarios);

    // Guardar el array en localStorage
    localStorage.setItem("usuarios", usuariosJSON);
}

const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', login);

function login(){
    // Recuperar la cadena JSON desde localStorage
    let usuariosJSON = localStorage.getItem("usuarios");

    console.log(usuariosJSON)

    // Convertir la cadena JSON de nuevo en un array
    const usuarios = JSON.parse(usuariosJSON);

    console.log(usuarios)

    // Obtenemos los valores ingresados
    const usuarioIngresado = document.querySelector('#nombre-usuario').value;
    const password = document.querySelector('#password').value;

    // Campo de error por si tenemos que mostrar un error
    const campoError = document.querySelector("#credenciales-error");

    // Variable que guarda si el usuario es valido
    let usuarioEncontrado = null;

    usuarios.forEach(usuario => {
        if (usuario["nombreUsuario"] == usuarioIngresado){
            if (usuario["password"] == password){
                usuarioEncontrado = usuario;
            }
        }
    });

    if (usuarioEncontrado){
        window.location.href = "./home.html";
        guardarSesion(usuarioEncontrado);
    } else {
        campoError.style.display = "block";
    }
}

function guardarSesion(objSesion){
    // Convertir el obj en una cadena JSON
    const sesionJSON = JSON.stringify(objSesion);

    // Guardar el array en localStorage
    localStorage.setItem("sesion", sesionJSON);
}