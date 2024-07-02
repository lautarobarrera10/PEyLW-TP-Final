const burgerButton = document.querySelector("#burger-button");
const menuDesplegable = document.querySelector("#menu-desplegable");

burgerButton.addEventListener("click", toggleMenu);

function toggleMenu(){
    if (burgerButton.textContent == "menu"){
        burgerButton.textContent = "menu_open";
        menuDesplegable.classList.add("show");
        document.querySelector("body").classList.add("show-menu");
        document.body.style.overflowY = "hidden";
    } else {
        burgerButton.textContent = "menu";
        menuDesplegable.classList.remove("show");
        document.querySelector("body").classList.remove("show-menu");
        document.body.style.overflowY = "auto";
    }
}