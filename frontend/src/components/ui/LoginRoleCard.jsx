import React, { useState } from 'react';

const LoginRoleCard = ({ title, desc, icon, colors }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '1.5rem',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    padding: '2.5rem',
    textAlign: 'center',
    transition: 'all 500ms cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
    boxShadow: isHovered
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3)'
      : '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.1)',
  };

  const glowStyle = {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `conic-gradient(from 0deg, ${colors[0]}20, ${colors[1]}20, ${colors[0]}20)`,
    opacity: isHovered ? 0.6 : 0,
    transition: 'opacity 500ms ease',
    animation: isHovered ? 'rotate 3s linear infinite' : 'none',
    zIndex: -1,
  };

  const iconContainerStyle = {
    width: '5rem',
    height: '5rem',
    margin: '0 auto 1.5rem auto',
    background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
    borderRadius: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    position: 'relative',
    boxShadow: `0 8px 32px ${colors[0]}40`,
    transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)',
    transition: 'transform 600ms cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const buttonStyle = {
    width: '100%',
    background: isButtonHovered
      ? `linear-gradient(135deg, ${colors[1]}, ${colors[0]})`
      : `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
    padding: '1rem 2rem',
    borderRadius: '1rem',
    fontWeight: '700',
    color: '#FFFFFF',
    fontSize: '1rem',
    letterSpacing: '0.025em',
    transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
    border: 'none',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: `0 4px 15px ${colors[0]}30`,
    transform: isButtonHovered ? 'translateY(-2px)' : 'translateY(0)',
  };

  const shimmerStyle = {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    transition: 'left 600ms ease',
    left: isButtonHovered ? '100%' : '-100%',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>
        {`
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={glowStyle}></div>
      <div style={iconContainerStyle}>
        <span style={{ transform: isHovered ? 'rotateY(180deg)' : 'rotateY(0deg)', transition: 'transform 600ms' }}>
          {icon}
        </span>
      </div>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        marginBottom: '1rem',
        color: '#FFFFFF',
        background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text'
      }}>
        {title}
      </h3>
      <p style={{
        color: '#D1D5DB',
        marginBottom: '2rem',
        fontSize: '1.1rem',
        lineHeight: '1.6'
      }}>
        {desc}
      </p>
      <button
        style={buttonStyle}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        <div style={shimmerStyle}></div>
        <span style={{ position: 'relative', zIndex: 1 }}>
          Login as {title.split(' ')[0]}
        </span>
      </button>
    </div>
  );
};

export default LoginRoleCard;
