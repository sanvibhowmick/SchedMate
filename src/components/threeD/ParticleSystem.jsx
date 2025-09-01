import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const ParticleSystem = ({ mousePosition, reduceMotion = false }) => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const dotsRef = useRef();
  const animationRef = useRef();
  const cameraRef = useRef();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || !isMounted) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    camera.position.z = 15;

    // Create floating dots using your exact color scheme
    const dotCount = 120;
    const dotsGroup = new THREE.Group();
    const dots = [];

    // Colors matching your design: cyan-400, purple-500, slate colors
    const colors = [
      0x22D3EE, // cyan-400
      0x8B5CF6, // purple-500  
      0x34D399, // emerald-400
      0xF59E0B, // amber-500
      0x06B6D4, // cyan-500
      0xA855F7, // purple-500
    ];

    for (let i = 0; i < dotCount; i++) {
      // Create perfect sphere geometry for round dots
      const radius = 0.03 + Math.random() * 0.04;
      const geometry = new THREE.SphereGeometry(radius, 12, 8);
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.4
      });
      
      const dot = new THREE.Mesh(geometry, material);
      
      // Position dots randomly in 3D space
      dot.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25
      );
      
      // Store animation properties
      dot.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.008,
          (Math.random() - 0.5) * 0.004
        ),
        originalPosition: dot.position.clone(),
        floatOffset: Math.random() * Math.PI * 2,
        floatSpeed: 0.3 + Math.random() * 0.4,
        mouseInfluence: 0.5 + Math.random() * 0.8,
        originalOpacity: material.opacity,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        )
      };
      
      dots.push(dot);
      dotsGroup.add(dot);
    }

    sceneRef.current.add(dotsGroup);
    dotsRef.current = { group: dotsGroup, dots };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [isMounted]);

  // Animation loop
  useEffect(() => {
    if (!sceneRef.current || !rendererRef.current || !dotsRef.current) return;

    const animate = () => {
      const time = Date.now() * 0.001;
      const { dots } = dotsRef.current;

      dots.forEach((dot, index) => {
        if (!reduceMotion) {
          // Gentle floating animation
          const floatY = Math.sin(time * dot.userData.floatSpeed + dot.userData.floatOffset) * 0.3;
          const floatX = Math.cos(time * dot.userData.floatSpeed * 0.7 + dot.userData.floatOffset) * 0.15;
          
          dot.position.y = dot.userData.originalPosition.y + floatY;
          dot.position.x = dot.userData.originalPosition.x + floatX;

          // Continuous slow drift
          dot.userData.originalPosition.x += dot.userData.velocity.x;
          dot.userData.originalPosition.z += dot.userData.velocity.z;

          // Boundary wrapping
          if (dot.userData.originalPosition.x > 25) dot.userData.originalPosition.x = -25;
          if (dot.userData.originalPosition.x < -25) dot.userData.originalPosition.x = 25;
          if (dot.userData.originalPosition.z > 12) dot.userData.originalPosition.z = -12;
          if (dot.userData.originalPosition.z < -12) dot.userData.originalPosition.z = 12;

          // Mouse interaction - dots move away from cursor
          if (mousePosition) {
            const mouseWorld = new THREE.Vector3(
              (mousePosition.x / window.innerWidth) * 2 - 1,
              -(mousePosition.y / window.innerHeight) * 2 + 1,
              0
            );
            mouseWorld.multiplyScalar(12);

            const distance = dot.position.distanceTo(mouseWorld);
            const interactionRadius = 6;
            
            if (distance < interactionRadius) {
              // Push dots away from cursor
              const force = (interactionRadius - distance) / interactionRadius * 0.015 * dot.userData.mouseInfluence;
              const direction = dot.position.clone().sub(mouseWorld).normalize();
              
              dot.position.add(direction.multiplyScalar(force));
              
              // Brighten dots near cursor
              const brightnessFactor = (interactionRadius - distance) / interactionRadius;
              dot.material.opacity = Math.min(1, dot.userData.originalOpacity + brightnessFactor * 0.4);
              
              // Add subtle scale effect
              const scale = 1 + brightnessFactor * 0.3;
              dot.scale.setScalar(scale);
            } else {
              // Return to normal opacity and scale
              dot.material.opacity = THREE.MathUtils.lerp(dot.material.opacity, dot.userData.originalOpacity, 0.03);
              const currentScale = dot.scale.x;
              const targetScale = 1;
              dot.scale.setScalar(THREE.MathUtils.lerp(currentScale, targetScale, 0.05));
            }
          }

          // Subtle rotation for extra visual interest
          dot.rotation.x += dot.userData.rotationSpeed.x;
          dot.rotation.y += dot.userData.rotationSpeed.y;
          dot.rotation.z += dot.userData.rotationSpeed.z;
        } else {
          // Reduced motion mode - minimal animation
          dot.rotation.y += 0.002;
        }
      });

      // Gentle camera movement following mouse
      if (mousePosition && !reduceMotion) {
        const mouseInfluence = new THREE.Vector3(
          (mousePosition.x / window.innerWidth) * 2 - 1,
          -(mousePosition.y / window.innerHeight) * 2 + 1,
          0
        );
        
        cameraRef.current.position.x = THREE.MathUtils.lerp(
          cameraRef.current.position.x, 
          mouseInfluence.x * 1.5, 
          0.015
        );
        cameraRef.current.position.y = THREE.MathUtils.lerp(
          cameraRef.current.position.y, 
          mouseInfluence.y * 0.8, 
          0.015
        );
      }

      // Global rotation for dynamic feel
      if (!reduceMotion) {
        dotsRef.current.group.rotation.y += 0.0005;
        dotsRef.current.group.rotation.x = Math.sin(time * 0.2) * 0.1;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [mousePosition, reduceMotion]);

  if (!isMounted) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 opacity-60 pointer-events-none"
      style={{ 
        pointerEvents: "none"
      }}
    />
  );
};

export default ParticleSystem;