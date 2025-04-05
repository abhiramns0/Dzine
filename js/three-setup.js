// Three.js setup
class ThreeScene {
    constructor() {
        console.log("Three.js setup initiated");
        
        // Get the canvas
        this.canvas = document.getElementById('three-canvas');
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        // Initialize Three.js components
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        
        // Setup
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 5;
        
        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);
        
        // Create simple sphere
        this.createObjects();
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Start animation loop
        this.animate();
    }
    
    createObjects() {
        // Create a simple sphere
        const geometry = new THREE.SphereGeometry(2, 32, 32);
        const material = new THREE.MeshStandardMaterial({
            color: 0x6495ed,
            metalness: 0.3,
            roughness: 0.4,
        });
        
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
        
        // Create particles for background
        const particlesGeometry = new THREE.BufferGeometry();
        const count = 2000;
        
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 20;
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.02,
            sizeAttenuation: true
        });
        
        this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(this.particles);
        
        // Mouse interaction
        document.addEventListener('mousemove', (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            gsap.to(this.sphere.rotation, {
                x: mouseY * 0.5,
                y: mouseX * 0.5,
                duration: 1
            });
        });
    }
    
    animate() {
        const tick = () => {
            requestAnimationFrame(tick);
            
            // Simple rotation
            this.sphere.rotation.y += 0.005;
            
            // Rotate particles slightly
            if (this.particles) {
                this.particles.rotation.y += 0.0005;
            }
            
            // Render
            this.renderer.render(this.scene, this.camera);
        };
        
        tick();
    }
}

// Initialize on window load
window.addEventListener('load', () => {
    new ThreeScene();
});
