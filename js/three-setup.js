// Three.js setup
class ThreeScene {
    constructor() {
        this.canvas = document.getElementById('three-canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        
        this.initialize();
        this.createObjects();
        this.setupEvents();
        this.animate();
    }
    
    initialize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.camera.position.z = 5;
        
        // Add ambient light
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        this.scene.add(ambientLight);
        
        // Add directional light
        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(1, 2, 3);
        this.scene.add(dirLight);
    }
    
    createObjects() {
        // Create a fluid-like sphere with distortion
        const geometry = new THREE.SphereGeometry(2, 64, 64);
        
        // Create custom shader material
        const material = new THREE.ShaderMaterial({
            vertexShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                uniform float uTime;
                
                void main() {
                    vUv = uv;
                    vNormal = normal;
                    
                    // Create wave effect
                    vec3 newPosition = position;
                    newPosition.x += sin(position.y * 10.0 + uTime) * 0.1;
                    newPosition.y += sin(position.x * 10.0 + uTime) * 0.1;
                    newPosition.z += sin(position.x * position.y * 10.0 + uTime) * 0.1;
                    
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
                }
            `,
            fragmentShader: `
                varying vec2 vUv;
                varying vec3 vNormal;
                uniform float uTime;
                
                void main() {
                    vec3 baseColor1 = vec3(0.2, 0.4, 0.8);
                    vec3 baseColor2 = vec3(0.9, 0.4, 0.7);
                    
                    // Create gradient based on normal
                    float fresnel = dot(vNormal, vec3(0.0, 0.0, 1.0));
                    vec3 color = mix(baseColor1, baseColor2, fresnel);
                    
                    // Add time-based effect
                    color += 0.1 * sin(vUv.x * 10.0 + uTime) * sin(vUv.y * 10.0 + uTime);
                    
                    gl_FragColor = vec4(color, 0.8);
                }
            `,
            uniforms: {
                uTime: { value: 0 }
            },
            transparent: true
        });
        
        this.sphere = new THREE.Mesh(geometry, material);
        this.scene.add(this.sphere);
        
        // Add stars to background
        const starGeometry = new THREE.BufferGeometry();
        const starMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 0.02
        });
        
        const starVertices = [];
        for (let i = 0; i < 1000; i++) {
            const x = (Math.random() - 0.5) * 100;
            const y = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            starVertices.push(x, y, z);
        }
        
        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.stars);
    }
    
    setupEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
        
        // Mouse movement effect
        document.addEventListener('mousemove', (event) => {
            const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
            const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
            
            gsap.to(this.sphere.rotation, {
                x: mouseY * 0.3,
                y: mouseX * 0.3,
                duration: 2,
                ease: 'power2.out'
            });
        });
    }
    
    animate() {
        const clock = new THREE.Clock();
        
        const tick = () => {
            const elapsedTime = clock.getElapsedTime();
            
            // Update shader uniforms
            this.sphere.material.uniforms.uTime.value = elapsedTime;
            
            // Rotate the sphere slightly
            this.sphere.rotation.y += 0.005;
            
            // Render
            this.renderer.render(this.scene, this.camera);
            
            // Call tick again on the next frame
            window.requestAnimationFrame(tick);
        };
        
        tick();
    }
}

// Initialize the scene when window loads
window.addEventListener('load', () => {
    const threeScene = new ThreeScene();
});

// Performance optimization
optimizePerformance() {
    // Lower resolution for mobile devices
    if (window.innerWidth < 768) {
        this.renderer.setPixelRatio(1);
        // Use simpler geometry
        this.sphere.geometry = new THREE.SphereGeometry(2, 32, 32);
    }
    
    // Check if device is low-performance
    const isLowPerformance = () => {
        // This is a basic check - you might want to implement more sophisticated detection
        const fps = this.renderer.info.render.fps || 60;
        return fps < 30;
    };
    
    // Adjust quality based on performance
    const adjustQuality = () => {
        if (isLowPerformance()) {
            this.renderer.setPixelRatio(1);
            // Remove some stars to improve performance
            if (this.stars && this.scene.children.includes(this.stars)) {
                this.scene.remove(this.stars);
            }
        }
    };
    
    // Check performance after 5 seconds
    setTimeout(adjustQuality, 5000);
}

