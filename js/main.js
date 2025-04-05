// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    // Handle loading animation
    const loader = document.querySelector('.loader');
    const progress = document.querySelector('.progress');
    
    // Simulate loading progress
    let loadProgress = 0;
    const loadingInterval = setInterval(() => {
        loadProgress += Math.random() * 10;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadingInterval);
            
            // Hide loader after a small delay
            setTimeout(() => {
                gsap.to(loader, {
                    opacity: 0,
                    duration: 1,
                    onComplete: () => {
                        loader.style.display = 'none';
                    }
                });
                
                // Animate in the content
                animateContent();
            }, 400);
        }
        progress.style.width = `${loadProgress}%`;
    }, 200);
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });
    
    // Animation for page content
    function animateContent() {
        const sections = document.querySelectorAll('.section');
        
        // GSAP ScrollTrigger for section animations
        sections.forEach((section, index) => {
            const content = section.querySelector('.content');
            const h1 = content.querySelector('h1, h2');
            const p = content.querySelector('p');
            
            gsap.set([h1, p], { y: 50, opacity: 0 });
            
            gsap.to(h1, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.2
            });
            
            gsap.to(p, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.4
            });
        });
    }
    
    // Handle form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simulate form submission
            const button = contactForm.querySelector('button');
            button.textContent = 'Sending...';
            
            setTimeout(() => {
                button.textContent = 'Message Sent!';
                contactForm.reset();
                
                setTimeout(() => {
                    button.textContent = 'Send Message';
                }, 3000);
            }, 1500);
        });
    }
    
    // Add chromatic aberration effect on cursor movement
    const addChromaticEffect = () => {
        const elements = document.querySelectorAll('h1, h2, .logo');
        
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            elements.forEach(el => {
                el.style.textShadow = `
                    ${(mouseX - 0.5) * 10}px ${(mouseY - 0.5) * 10}px 0 rgba(255,0,0,0.3),
                    ${-(mouseX - 0.5) * 10}px ${-(mouseY - 0.5) * 10}px 0 rgba(0,255,255,0.3)
                `;
            });
        });
    };
    
    addChromaticEffect();
});

// Project data
const projects = [
    {
        title: 'Project One',
        description: 'Interactive 3D experience with fluid simulation',
        image: 'assets/images/project1.jpg',
        category: '3D Animation'
    },
    {
        title: 'Project Two',
        description: 'E-commerce platform with immersive product views',
        image: 'assets/images/project2.jpg',
        category: 'Web Development'
    },
    {
        title: 'Project Three',
        description: 'Mobile AR application for virtual try-on',
        image: 'assets/images/project3.jpg',
        category: 'Augmented Reality'
    }
];

// Populate projects
function populateProjects() {
    const projectGrid = document.querySelector('.project-grid');
    
    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.classList.add('project-item');
        
        projectElement.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <span class="category">${project.category}</span>
                <p>${project.description}</p>
            </div>
        `;
        
        projectGrid.appendChild(projectElement);
        
        // Add hover effect
        gsap.set(projectElement, { opacity: 0, y: 30 });
        gsap.to(projectElement, {
            scrollTrigger: {
                trigger: projectElement,
                start: 'top 90%',
                end: 'bottom 70%',
                toggleActions: 'play none none reverse'
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });
}

// Call function after page load
window.addEventListener('load', populateProjects);

