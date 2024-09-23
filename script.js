function toggleMenu() {
    const menu = document.querySelector('.menu-links');
    const hamburgerIcon = document.querySelector('.hamburger-icon');

    menu.classList.toggle('open');

    hamburgerIcon.classList.toggle('active');
}

document.querySelectorAll('.menu-links a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.querySelector('.menu-links');
        const hamburgerIcon = document.querySelector('.hamburger-icon');

        menu.classList.remove('open');
        hamburgerIcon.classList.remove('active');
    });
});
