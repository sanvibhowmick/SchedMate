import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

const ProfessionalParticleBackground = ({ 
  intensity = 'medium',
  interactive = true,
  colorScheme = 'default',
  speed = 1,
  density = 'medium',
  style = {},
  className = ''
}) => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const particlesRef = useRef();
  const animationRef = useRef();
  const cameraRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);
  
  const [isInitialized, setIsInitialized] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Professional color schemes
  const colorSchemes = {
    default: [
      { color: 0x60A5FA, opacity: 0.6 }, // Blue
      { color: 0x8B5CF6, opacity: 0.5 }, // Purple
      { color: 0x10B981, opacity: 0.4 }, // Emerald
      { color: 0xF59E0B, opacity: 0.3 }, // Amber
      { color: 0xEF4444, opacity: 0.35 }, // Red
      { color: 0x06B6D4, opacity: 0.45 }  // Cyan
    ],
    corporate: [
      { color: 0x3B82F6, opacity: 0.4 }, // Corporate Blue
      { color: 0x1E40AF, opacity: 0.3 }, // Dark Blue
      { color: 0x64748B, opacity: 0.25 }, // Slate
      { color: 0x475569, opacity: 0.2 }, // Dark Slate
      { color: 0x334155, opacity: 0.15 }  // Darker Slate
    ],
    warm: [
      { color: 0xF97316, opacity: 0.5 }, // Orange
      { color: 0xEF4444, opacity: 0.4 }, // Red
      { color: 0xDC2626, opacity: 0.35 }, // Dark Red
      { color: 0xF59E0B, opacity: 0.45 }, // Amber
      { color: 0xEAB308, opacity: 0.3 }   // Yellow
    ],
    cool: [
      { color: 0x06B6D4, opacity: 0.5 }, // Cyan
      { color: 0x0EA5E9, opacity: 0.4 }, // Sky
      { color: 0x3B82F6, opacity: 0.45 }, // Blue
      { color: 0x6366F1, opacity: 0.35 }, // Indigo
      { color: 0x8B5CF6, opacity: 0.4 }   // Violet
    ],
    monochrome: [
      { color: 0xFFFFFF, opacity: 0.15 }, // White
      { color: 0xE5E7EB, opacity: 0.1 },  // Gray-200
      { color: 0x9CA3AF, opacity: 0.08 }, // Gray-400
      { color: 0x6B7280, opacity: 0.06 }, // Gray-500
      { color: 0x4B5563, opacity: 0.04 }  // Gray-600
    ]
  };

  // Density configurations
  const densityConfig = {
    low: { count: 150, spread: 60 },
    medium: { count: 250, spread: 80 },
    high: { count: 400, spread: 100 },
    ultra: { count: 600, spread: 120 }
  };

  // Update dimensions on resize
  const updateDimensions = useCallback(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  // Mouse tracking
  useEffect(() => {
    if (!interactive) return;

    const handleMouseMove = (event) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current = {
        x: ((event.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((event.clientY - rect.top) / rect.height) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0 || dimensions.height === 0) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      dimensions.width / dimensions.height, 
      0.1, 
      1000
    );
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });
    
    renderer.setSize(dimensions.width, dimensions.height);
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    containerRef.current.appendChild(renderer.domElement);

    // Store references
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    camera.position.z = 20;

    // Create particle system
    const config = densityConfig[density];
    const colors = colorSchemes[colorScheme] || colorSchemes.default;
    
    const particlesGroup = new THREE.Group();
    const particles = [];

    // Create individual particles
    for (let i = 0; i < config.count; i++) {
      const colorData = colors[Math.floor(Math.random() * colors.length)];
      
      // Geometry - using different sizes for depth
      const radius = 0.02 + Math.random() * 0.06;
      const geometry = new THREE.SphereGeometry(radius, 8, 6);
      
      // Material with professional appearance
      const material = new THREE.MeshBasicMaterial({
        color: colorData.color,
        transparent: true,
        opacity: colorData.opacity * (0.3 + Math.random() * 0.7),
        blending: THREE.AdditiveBlending
      });
      
      const particle = new THREE.Mesh(geometry, material);
      
      // Position particles in 3D space
      particle.position.set(
        (Math.random() - 0.5) * config.spread,
        (Math.random() - 0.5) * (config.spread * 0.7),
        (Math.random() - 0.5) * 30
      );
      
      // Store animation data
      particle.userData = {
        originalPosition: particle.position.clone(),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.005
        ),
        floatAmplitude: 0.5 + Math.random() * 1.5,
        floatSpeed: 0.5 + Math.random() * 1.0,
        floatOffset: Math.random() * Math.PI * 2,
        mouseInfluence: 0.2 + Math.random() * 0.8,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
        originalOpacity: material.opacity,
        pulseSpeed: 2 + Math.random() * 3,
        pulseAmplitude: 0.3 + Math.random() * 0.4
      };
      
      particles.push(particle);
      particlesGroup.add(particle);
    }

    scene.add(particlesGroup);
    particlesRef.current = { group: particlesGroup, particles };

    setIsInitialized(true);

    // Cleanup function
    return () => {
      setIsInitialized(false);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Dispose of Three.js resources
      particles.forEach(particle => {
        particle.geometry.dispose();
        particle.material.dispose();
      });
      
      renderer.dispose();
    };
  }, [dimensions, density, colorScheme]);

  // Animation loop
  useEffect(() => {
    if (!isInitialized || !sceneRef.current || !rendererRef.current || !particlesRef.current) return;

    const animate = () => {
      timeRef.current += 0.01 * speed;
      const time = timeRef.current;
      
      const { particles } = particlesRef.current;
      const intensityMultiplier = intensity === 'low' ? 0.5 : intensity === 'high' ? 1.5 : 1;

      particles.forEach((particle, index) => {
        const userData = particle.userData;
        
        // Floating motion
        const floatX = Math.sin(time * userData.floatSpeed + userData.floatOffset) * 
                     userData.floatAmplitude * 0.3 * intensityMultiplier;
        const floatY = Math.cos(time * userData.floatSpeed * 0.7 + userData.floatOffset) * 
                     userData.floatAmplitude * 0.5 * intensityMultiplier;
        const floatZ = Math.sin(time * userData.floatSpeed * 0.5 + userData.floatOffset) * 
                     userData.floatAmplitude * 0.2 * intensityMultiplier;
        
        particle.position.x = userData.originalPosition.x + floatX;
        particle.position.y = userData.originalPosition.y + floatY;
        particle.position.z = userData.originalPosition.z + floatZ;

        // Continuous drift
        userData.originalPosition.add(userData.velocity);

        // Boundary wrapping
        const bounds = densityConfig[density].spread / 2;
        if (userData.originalPosition.x > bounds) userData.originalPosition.x = -bounds;
        if (userData.originalPosition.x < -bounds) userData.originalPosition.x = bounds;
        if (userData.originalPosition.y > bounds * 0.7) userData.originalPosition.y = -bounds * 0.7;
        if (userData.originalPosition.y < -bounds * 0.7) userData.originalPosition.y = bounds * 0.7;
        if (userData.originalPosition.z > 15) userData.originalPosition.z = -15;
        if (userData.originalPosition.z < -15) userData.originalPosition.z = 15;

        // Mouse interaction
        if (interactive && mouseRef.current) {
          const mouseWorld = new THREE.Vector3(
            mouseRef.current.x * 15,
            mouseRef.current.y * 10,
            0
          );

          const distance = particle.position.distanceTo(mouseWorld);
          const interactionRadius = 8 * intensityMultiplier;
          
          if (distance < interactionRadius) {
            const force = (interactionRadius - distance) / interactionRadius;
            const direction = particle.position.clone().sub(mouseWorld).normalize();
            const pushForce = direction.multiplyScalar(force * 0.3 * userData.mouseInfluence);
            
            particle.position.add(pushForce);
            
            // Enhanced brightness on interaction
            const brightnessBoost = force * 0.6;
            particle.material.opacity = Math.min(1, userData.originalOpacity + brightnessBoost);
            
            // Scale effect
            const scale = 1 + force * 0.5;
            particle.scale.setScalar(scale);
          } else {
            // Return to normal state
            particle.material.opacity = THREE.MathUtils.lerp(
              particle.material.opacity, 
              userData.originalOpacity, 
              0.05
            );
            
            const currentScale = particle.scale.x;
            particle.scale.setScalar(THREE.MathUtils.lerp(currentScale, 1, 0.08));
          }
        }

        // Subtle pulsing
        const pulse = Math.sin(time * userData.pulseSpeed + index * 0.5) * userData.pulseAmplitude;
        particle.material.opacity = userData.originalOpacity + pulse * 0.1;

        // Rotation
        particle.rotation.x += userData.rotationSpeed.x * intensityMultiplier;
        particle.rotation.y += userData.rotationSpeed.y * intensityMultiplier;
        particle.rotation.z += userData.rotationSpeed.z * intensityMultiplier;
      });

      // Camera subtle movement
      if (interactive && mouseRef.current) {
        cameraRef.current.position.x = THREE.MathUtils.lerp(
          cameraRef.current.position.x,
          mouseRef.current.x * 2 * intensityMultiplier,
          0.02
        );
        cameraRef.current.position.y = THREE.MathUtils.lerp(
          cameraRef.current.position.y,
          mouseRef.current.y * 1.5 * intensityMultiplier,
          0.02
        );
      }

      // Global group rotation for subtle movement
      if (particlesRef.current.group) {
        particlesRef.current.group.rotation.y += 0.0005 * speed;
        particlesRef.current.group.rotation.x = Math.sin(time * 0.3) * 0.05 * intensityMultiplier;
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
  }, [isInitialized, interactive, intensity, speed]);

  const containerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    pointerEvents: 'none',
    overflow: 'hidden',
    ...style
  };

  return (
    <div 
      ref={containerRef} 
      style={containerStyle}
      className={className}
    />
  );
};

// Example usage component showing different configurations
const ParticleSystem = () => {
  const [currentScheme, setCurrentScheme] = useState('default');
  const [currentDensity, setCurrentDensity] = useState('medium');
  const [currentIntensity, setCurrentIntensity] = useState('medium');
  
  const schemes = ['default', 'corporate', 'warm', 'cool', 'monochrome'];
  const densities = ['low', 'medium', 'high'];
  const intensities = ['low', 'medium', 'high'];

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)' }}>
      {/* Particle Background */}
      <ProfessionalParticleBackground
        colorScheme={currentScheme}
        density={currentDensity}
        intensity={currentIntensity}
        interactive={true}
        speed={1}
      />
      
      {/* Control Panel */}
      <div style={{
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        background: 'rgba(15, 23, 42, 0.9)',
        backdropFilter: 'blur(20px)',
        padding: '2rem',
        borderRadius: '1rem',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: 'white',
        zIndex: 10,
        minWidth: '250px'
      }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
          Particle Controls
        </h3>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
            Color Scheme:
          </label>
          <select
            value={currentScheme}
            onChange={(e) => setCurrentScheme(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}
          >
            {schemes.map(scheme => (
              <option key={scheme} value={scheme} style={{ background: '#1E293B' }}>
                {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
            Density:
          </label>
          <select
            value={currentDensity}
            onChange={(e) => setCurrentDensity(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}
          >
            {densities.map(density => (
              <option key={density} value={density} style={{ background: '#1E293B' }}>
                {density.charAt(0).toUpperCase() + density.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
            Intensity:
          </label>
          <select
            value={currentIntensity}
            onChange={(e) => setCurrentIntensity(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem',
              borderRadius: '0.5rem',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white'
            }}
          >
            {intensities.map(intensity => (
              <option key={intensity} value={intensity} style={{ background: '#1E293B' }}>
                {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Sample Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '6rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          fontWeight: '800',
          color: 'white',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #34D399)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Professional Particle Background
        </h1>
        
        <p style={{
          fontSize: '1.25rem',
          color: 'rgba(255, 255, 255, 0.8)',
          maxWidth: '600px',
          lineHeight: '1.6',
          marginBottom: '2rem'
        }}>
          A sophisticated, interactive particle system designed for professional applications. 
          Features multiple color schemes, density levels, and smooth performance optimization.
        </p>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: '800px'
        }}>
          {[1, 2, 3, 4].map(num => (
            <div key={num} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white'
            }}>
              <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>
                Section {num}
              </h3>
              <p style={{ opacity: 0.8, lineHeight: '1.5' }}>
                Sample content that would appear over the particle background.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParticleSystem;