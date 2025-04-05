// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    console.log("Main.js loaded");
    
    // Create custom cursor
    createCustomCursor();
    
    // Handle loading animation
    const loader = document.querySelector('.loader');
    const progress = document.querySelector('.progress');
    
    if (!loader || !progress) {
        console.error('Loader elements not found');
        return;
    }
    
    // Simulate loading progress
    let loadProgress = 0;
    const loadingInterval = setInterval(() => {
        loadProgress += Math.random() * 10;
        if (loadProgress >= 100) {
            loadProgress = 100;
            clearInterval(loadingInterval);
            
            // Hide loader after a small delay
            setTimeout(() => {
                loader.style.opacity = 0;
                setTimeout(() => {
                    loader.style.display = 'none';
                    // Animate content after loader is gone
                    animateContent();
                }, 1000);
            }, 400);
        }
        progress.style.width = `${loadProgress}%`;
    }, 200);
    
    // Populate projects
    populateProjects();
    
    // Handle mobile menu
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (menu.classList.contains('active')) {
                menu.classList.remove('active');
            }
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
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
});

// Project data
const projects = [
    {
        title: 'Interactive 3D Portfolio',
        description: 'A WebGL-powered interactive portfolio with 3D animations',
        image: 'assets/images/project1.jpg',
        category: '3D Development'
    },
    {
        title: 'E-Commerce Platform',
        description: 'A modern e-commerce platform with 3D product views',
        image: 'assets/images/project2.jpg',
        category: 'Web Development'
    },
    {
        title: 'Mobile AR Experience',
        description: 'Augmented reality application for iOS and Android',
        image: 'assets/images/project3.jpg',
        category: 'AR/VR'
    }
];

// Function to populate projects
function populateProjects() {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return; // Safety check
    
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
    });
}

// Animation for page content
function animateContent() {
    console.log("Animating content");
    const sections = document.querySelectorAll('.section');
    
    // GSAP animations for each section
    sections.forEach((section, index) => {
        const heading = section.querySelector('h1, h2');
        const paragraph = section.querySelector('p');
        const otherElements = section.querySelectorAll('.about-container, .project-item, form');
        
        if (heading) {
            gsap.from(heading, {
                y: 50,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                }
            });
        }
        
        if (paragraph) {
            gsap.from(paragraph, {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.3,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                }
            });
        }
        
        otherElements.forEach(element => {
            gsap.from(element, {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none none'
                }
            });
        });
    });
}

// Custom cursor function
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
    });
}

// Add chromatic aberration effect on cursor movement
function addChromaticEffect() {
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
}

// Call this after animations are set up
window.addEventListener('load', () => {
    addChromaticEffect();
});
