document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        window.scrollTo({
            top: section.offsetTop,
            behavior: 'smooth'
        });
    }
}

const projectsBtn = document.querySelector('.projects-btn');


projectsBtn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
projectsBtn.style.fontSize = '1.2rem';
projectsBtn.style.letterSpacing = '1.5px';
projectsBtn.style.transition = 'all 0.3s ease-in-out';

projectsBtn.addEventListener('mouseover', () => {
    projectsBtn.style.transform = 'scale(1.1)';  
    projectsBtn.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.3)';
});

projectsBtn.addEventListener('mouseout', () => {
    projectsBtn.style.transform = 'scale(1)';  
    projectsBtn.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';  
});
