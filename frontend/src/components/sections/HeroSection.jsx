import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import TypewriterEffect from '../ui/TypewriterEffect';
import unnamed_pic from '../../assets/unnamed.png';

const HeroSection = ({ onNavigate }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [reduceMotion, setReduceMotion] = useState(false);
  
  // Three.js refs
  const containerRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const dotsRef = useRef();
  const animationRef = useRef();
  const cameraRef = useRef();
  const [isMounted, setIsMounted] = useState(false);

  const typewriterTexts = [
    'Conflict-Free Scheduling',
    'Faculty-Friendly Optimization', 
    'AI-Powered Timetables',
    'Multi-Department Support'
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const sectionStyle = {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 2rem',
    overflow: 'hidden',
    background: 'radial-gradient(ellipse at center, rgba(6, 182, 212, 0.15) 0%, rgba(139, 92, 246, 0.1) 35%, rgba(0, 0, 0, 0.8) 70%)',
  };

  const containerStyle = {
    width: '100%',
    maxWidth: '80rem',
    height: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    alignItems: 'center',
    gap: '4rem',
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    paddingRight: '2rem',
  };

  const titleStyle = {
    fontSize: 'clamp(2.5rem, 5vw, 3.75rem)',
    fontWeight: 'bold',
    lineHeight: '1.1',
    color: '#FFFFFF',
    marginBottom: '1.5rem',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
  };

  const subtitleStyle = {
    fontSize: 'clamp(1rem, 2vw, 1.25rem)',
    color: '#D1D5DB',
    lineHeight: '1.6',
    marginBottom: '2rem',
    maxWidth: '90%',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
  };

  const buttonGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    maxWidth: '20rem',
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    borderRadius: '0.75rem',
    fontWeight: '600',
    fontSize: '1rem',
    color: '#FFFFFF',
    transition: 'all 300ms ease',
    cursor: 'pointer',
    border: 'none',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
    boxShadow: '0 8px 32px rgba(34, 211, 238, 0.3)',
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  };

  const imageContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    position: 'relative',
  };

  const imageStyle = {
    width: '100%',
    maxWidth: '32rem',
    height: '24rem',
    borderRadius: '1.5rem',
    background: 'rgba(0, 0, 0, 0.4)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(6, 182, 212, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#22D3EE',
    cursor: 'pointer',
    transition: 'all 400ms ease-out',
    transform: 'perspective(1000px) rotateY(-2deg) rotateX(1deg)',
    boxShadow: `
      0 25px 50px -12px rgba(6, 182, 212, 0.3),
      0 0 0 1px rgba(255, 255, 255, 0.08),
      inset 0 1px 0 rgba(255, 255, 255, 0.15)
    `,
  };

  const imageHoverStyle = {
    transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale(1.05)',
    filter: 'drop-shadow(0 35px 60px rgba(6, 182, 212, 0.35))',
    boxShadow: `
      0 35px 60px -12px rgba(6, 182, 212, 0.4),
      0 0 0 1px rgba(6, 182, 212, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
  };

  // Mobile styles
  const mobileContainerStyle = {
    ...containerStyle,
    gridTemplateColumns: '1fr',
    gridTemplateRows: '1fr auto',
    gap: '2rem',
    padding: '2rem 0',
  };

  const mobileContentStyle = {
    ...contentStyle,
    paddingRight: '0',
    textAlign: 'center',
    height: 'auto',
  };

  const mobileImageContainerStyle = {
    ...imageContainerStyle,
    height: 'auto',
    paddingBottom: '2rem',
  };

  const mobileImageStyle = {
    ...imageStyle,
    maxWidth: '24rem',
    transform: 'none',
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  // Dashboard Preview Component
const DashboardPreview = ({ isMobile, onNavigate }) => (
  <div
    style={isMobile ? mobileImageContainerStyle : imageContainerStyle}
    onClick={() => onNavigate('dashboard')}
  >
    <img
      src={unnamed_pic}
      alt="AI-Powered Timetable Management Dashboard"
      style={isMobile ? mobileImageStyle : imageStyle}
      onMouseEnter={(e) => {
        if (!isMobile) {
          Object.assign(e.target.style, imageHoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (!isMobile) {
          Object.assign(e.target.style, imageStyle);
        }
      }}
      loading="eager"
    />
  </div>
);

  return (
    <section id="hero" style={sectionStyle}>
      {/* Particle System Background */}
      {isMounted && (
        <div 
          ref={containerRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />
      )}
      
      {/* Content Overlay */}
      <div style={isMobile ? mobileContainerStyle : containerStyle}>
        <div style={isMobile ? mobileContentStyle : contentStyle}>
          <h1 style={titleStyle}>
            <span>Generate Optimized</span>
            <br />
            <TypewriterEffect texts={typewriterTexts} />
            <br />
            <span>Effortlessly</span>
          </h1>
          
          <p style={subtitleStyle}>
            Solve faculty workload distribution and class scheduling conflicts with our 
            AI-powered timetable management system designed for educational institutions.
          </p>
          
          <div style={buttonGroupStyle}>
            <button 
              style={primaryButtonStyle}
              onClick={() => onNavigate('dashboard')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 12px 40px rgba(34, 211, 238, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 8px 32px rgba(34, 211, 238, 0.3)';
              }}
            >
              Get Started
            </button>
            <button 
              style={secondaryButtonStyle}
              onClick={() => onNavigate('features')}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              Learn More
            </button>
          </div>
        </div>
        
        <div style={isMobile ? mobileImageContainerStyle : imageContainerStyle}>
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;