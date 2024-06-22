// Si está iniciado sesión redirigir al home
if (localStorage.getItem("sesion")){
    window.location.href = "./home.html";
}

// Verificar si el array de usuarios ya está definido en localStorage
if (!localStorage.getItem("usuarios")) {
    // Array con usuarios pre-definidos
    const usuarios = [
        {
            nombreUsuario: "admin",
            password: "admin123",
            tipo: "administrador"
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
    let usuarioValidado = false;

    // Variables donde vamos a guardar los datos en caso de que el inicio sea correcto
    let nombreUsuario = "";
    let tipoUsuario = "";
    let passwordUsuario = "";

    usuarios.forEach(usuario => {
        if (usuario["nombreUsuario"] == usuarioIngresado){
            if (usuario["password"] == password){
                usuarioValidado = true;
                nombreUsuario = usuario["nombreUsuario"];
                tipoUsuario = usuario["tipo"];
                passwordUsuario = usuario["password"];
            }
        }
    });

    if (usuarioValidado){
        window.location.href = "./home.html";
        guardarSesion(nombreUsuario, passwordUsuario, tipoUsuario);
    } else {
        campoError.style.display = "block";
    }
}

function guardarSesion(nombre, password, tipo){
    // Array con usuarios pre-definidos
    const sesion = {
            nombreUsuario: nombre,
            password: password,
            tipo: tipo
    };

    // Convertir el array en una cadena JSON
    const sesionJSON = JSON.stringify(sesion);

    // Guardar el array en localStorage
    localStorage.setItem("sesion", sesionJSON);
}