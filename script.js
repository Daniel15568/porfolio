function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    menu.classList.toggle("open");
}

document.querySelector(".hamburger").addEventListener("click", toggleMenu);
