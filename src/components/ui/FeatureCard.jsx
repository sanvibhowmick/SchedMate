import React, { useState, useEffect, useRef } from 'react';

const FeatureCard = ({ icon, title, description, delay, size, fontSize }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const cardBaseStyle = {
    position: 'relative',
    backgroundColor: 'rgba(30, 41, 59, 0.5)',
    backdropFilter: 'blur(4px)',
    borderRadius: '2rem 0.5rem 2rem 0.5rem',
    padding: size === 'large' ? '3rem' : '2.5rem',
    transition: 'all 500ms ease-out',
    cursor: 'pointer',
    boxShadow: isHovered ? '0 25px 50px -12px rgba(6, 182, 212, 0.2)' : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    border: isHovered ? '1px solid rgba(6, 182, 212, 0.5)' : '1px solid #334155',
    transformStyle: 'preserve-3d',
    flex: '1',
    minWidth: size === 'large' ? '400px' : '350px',
  };

  const cardDynamicStyle = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
    transition: 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out',
    transitionDelay: `${delay}ms`,
  };

  const combinedCardStyle = {
    ...cardBaseStyle,
    ...cardDynamicStyle,
    transform: isHovered ? 'scale(1.15) rotateX(5deg) rotateY(5deg)' : cardDynamicStyle.transform,
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    borderRadius: '2rem 0.5rem 2rem 0.5rem',
    transition: 'opacity 300ms',
    backgroundImage: 'linear-gradient(to right, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))',
    opacity: isHovered ? 1 : 0,
  };

  const iconStyle = {
    fontSize: size === 'large' ? '3.5rem' : '3rem',
    marginBottom: '1rem',
    color: '#22D3EE',
  };

  const titleStyle = {
    fontSize: fontSize === 'large' ? '2rem' : '1.75rem',
    fontWeight: 'bold',
    marginBottom: '0.75rem',
    color: '#FFFFFF',
  };

  const descriptionStyle = {
    fontSize: fontSize === 'large' ? '1.25rem' : '1.125rem',
    color: '#D1D5DB',
    lineHeight: '1.625',
  };

  return (
    <div 
      ref={cardRef}
      style={combinedCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={iconStyle}>{icon}</div>
      <h3 style={titleStyle}>{title}</h3>
      <p style={descriptionStyle}>{description}</p>
      
      <div style={overlayStyle} />
    </div>
  );
};

export default FeatureCard;
