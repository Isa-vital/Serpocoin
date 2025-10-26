// ================================
// 3D PLANET ANIMATION - THREE.JS
// ================================

document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('planet-canvas');
    
    // Only run if container exists (home page)
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true, 
        antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Create planet sphere
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    
    // Planet material with glow effect
    const planetMaterial = new THREE.MeshPhongMaterial({
        color: 0x4361ee,
        emissive: 0x112244,
        shininess: 100,
        specular: 0x00ffff
    });
    
    const planet = new THREE.Mesh(geometry, planetMaterial);
    scene.add(planet);

    // Create glow effect
    const glowGeometry = new THREE.SphereGeometry(5.2, 32, 32);
    const glowMaterial = new THREE.ShaderMaterial({
        uniforms: {
            c: { type: "f", value: 0.3 },
            p: { type: "f", value: 4.5 },
            glowColor: { type: "c", value: new THREE.Color(0x00ffff) },
            viewVector: { type: "v3", value: camera.position }
        },
        vertexShader: `
            uniform vec3 viewVector;
            varying float intensity;
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                vec3 actual_normal = vec3(modelMatrix * vec4(normal, 0.0));
                intensity = pow(dot(normalize(viewVector), actual_normal), 6.0);
            }
        `,
        fragmentShader: `
            uniform vec3 glowColor;
            varying float intensity;
            void main() {
                vec3 glow = glowColor * intensity;
                gl_FragColor = vec4(glow, 0.8);
            }
        `,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        transparent: true
    });
    
    const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    // Add stars/particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 100;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.05,
        color: 0x00ffff,
        transparent: true,
        opacity: 0.8
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0x00ffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    const pointLight2 = new THREE.PointLight(0x9d4edd, 0.8, 100);
    pointLight2.position.set(-10, -10, -5);
    scene.add(pointLight2);

    // Camera position
    camera.position.z = 15;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (event) => {
        mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate planet
        planet.rotation.y += 0.002;
        planet.rotation.x += 0.0005;
        
        // Rotate glow
        glowMesh.rotation.y += 0.002;
        glowMesh.rotation.x += 0.0005;
        
        // Animate particles
        particlesMesh.rotation.y += 0.0005;
        particlesMesh.rotation.x += 0.0002;
        
        // Mouse interaction - subtle camera movement
        camera.position.x += (mouseX * 2 - camera.position.x) * 0.05;
        camera.position.y += (mouseY * 2 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);
        
        renderer.render(scene, camera);
    }
    
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        geometry.dispose();
        planetMaterial.dispose();
        glowGeometry.dispose();
        glowMaterial.dispose();
        particlesGeometry.dispose();
        particlesMaterial.dispose();
        renderer.dispose();
    });
});
