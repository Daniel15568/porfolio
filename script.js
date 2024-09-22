const darkModeButton = document.getElementById('toggle-dark-mode');
darkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        darkModeButton.textContent = 'Disable Dark Mode';
    } else {
        darkModeButton.textContent = 'Enable Dark Mode';
    }
});
