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
            tipo: "profesor",
            misCursos: []
        },
    ];

    guardarLocalStorage("usuarios", usuarios);
}

let loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', login);

function login(){
    let usuarios = buscarLocalStorage("usuarios");

    // Obtenemos los valores ingresados
    let usuarioIngresado = document.querySelector('#nombre-usuario').value;
    let password = document.querySelector('#password').value;

    // Campo de error por si tenemos que mostrar un error
    let campoError = document.querySelector("#credenciales-error");


    // Buscamos el usuario
    let usuarioEncontrado = usuarios.find(usuario => usuario["nombreUsuario"] == usuarioIngresado);

    // Validamos la contraseña 
    if (usuarioEncontrado.password == password){
        window.location.href = "./home.html";
        guardarLocalStorage("sesion", usuarioEncontrado)
    } else {
        campoError.style.display = "block"; // Mostramos el error
    }
}