import React, { useState } from 'react';

const LoginRoleCard = ({ title, desc, icon, color, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const cardStyle = {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.05)',
    backdropFilter: 'blur(24px)',
    WebkitBackdropFilter: 'blur(24px)',
    borderRadius: '1.25rem',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    padding: '2.5rem 2rem',
    textAlign: 'center',
    transition: 'all 600ms cubic-bezier(0.23, 1, 0.32, 1)',
    cursor: 'pointer',
    overflow: 'hidden',
    transform: isHovered ? 'translateY(-12px) scale(1.02)' : 'translateY(0) scale(1)',
    boxShadow: isHovered 
      ? '0 32px 64px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      : '0 8px 32px -8px rgba(0, 0, 0, 0.3)',
    animationDelay: `${index * 150}ms`,
    animation: 'fadeInUp 800ms ease-out forwards',
    opacity: 0,
  };

  const iconContainerStyle = {
    width: '5rem',
    height: '5rem',
    margin: '0 auto 1.75rem auto',
    background: `linear-gradient(135deg, ${getGradientColors(color)})`,
    borderRadius: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '2rem',
    boxShadow: `0 12px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
    transition: 'all 500ms cubic-bezier(0.23, 1, 0.32, 1)',
    transform: isHovered ? 'scale(1.1) rotateY(8deg) rotateX(5deg)' : 'scale(1)',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    marginBottom: '0.875rem',
    color: '#FFFFFF',
    transition: 'all 400ms ease',
    letterSpacing: '-0.025em',
    lineHeight: '1.3',
  };

  const descStyle = {
    color: 'rgba(255, 255, 255, 0.75)',
    marginBottom: '2.25rem',
    fontSize: '1rem',
    lineHeight: '1.6',
    fontWeight: '400',
    letterSpacing: '0.01em',
  };

  const buttonStyle = {
    width: '100%',
    background: isButtonHovered
      ? `linear-gradient(135deg, ${getGradientColors(color, true)})`
      : 'rgba(255, 255, 255, 0.1)',
    padding: '1rem 1.5rem',
    borderRadius: '0.875rem',
    fontWeight: '600',
    color: '#FFFFFF',
    fontSize: '1rem',
    letterSpacing: '0.025em',
    transition: 'all 400ms cubic-bezier(0.23, 1, 0.32, 1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    boxShadow: isButtonHovered 
      ? '0 8px 25px rgba(0, 0, 0, 0.3)' 
      : '0 4px 15px rgba(0, 0, 0, 0.2)',
    transform: isButtonHovered ? 'translateY(-3px)' : 'translateY(0)',
    position: 'relative',
    overflow: 'hidden',
  };

  const glowStyle = {
    position: 'absolute',
    top: '-50%',
    left: '-50%',
    width: '200%',
    height: '200%',
    background: `radial-gradient(circle, ${getGradientColors(color).split(', ')[0]}20 0%, transparent 70%)`,
    opacity: isHovered ? 1 : 0,
    transition: 'opacity 600ms ease',
    pointerEvents: 'none',
  };

  function getGradientColors(colorClass, reversed = false) {
    const colorMap = {
      'from-blue-500 to-purple-600': reversed ? '#A855F7, #3B82F6' : '#3B82F6, #A855F7',
      'from-emerald-500 to-blue-600': reversed ? '#2563EB, #10B981' : '#10B981, #2563EB',
      'from-amber-500 to-red-600': reversed ? '#DC2626, #F59E0B' : '#F59E0B, #DC2626',
    };
    return colorMap[colorClass] || '#3B82F6, #A855F7';
  }

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={glowStyle} />
      
      <div style={iconContainerStyle}>
        <span style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}>
          {icon}
        </span>
      </div>
      
      <h3 style={titleStyle}>
        {title}
      </h3>
      
      <p style={descStyle}>
        {desc}
      </p>
      
      <button
        style={buttonStyle}
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
      >
        <span style={{ position: 'relative', zIndex: 2 }}>
          Continue as {title.split(' ')[0]}
        </span>
      </button>
    </div>
  );
};

const LoginSection = () => {
  const roles = [
    {
      title: 'Administrator',
      desc: 'Complete system control with advanced scheduling tools, user management, and comprehensive analytics dashboard',
      icon: '⚡',
      color: 'from-blue-500 to-purple-600',
    },
    {
      title: 'Faculty Member',
      desc: 'Streamlined schedule management with workload optimization, conflict resolution, and preference settings',
      icon: '📚',
      color: 'from-emerald-500 to-blue-600',
    },
    {
      title: 'Student',
      desc: 'Instant access to personalized timetables, course information, and real-time schedule updates',
      icon: '🎓',
      color: 'from-amber-500 to-red-600',
    }
  ];

  const sectionStyle = {
    position: 'relative',
    padding: '8rem 2rem',
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
    overflow: 'hidden',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  };

  const containerStyle = {
    maxWidth: '85rem',
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
    width: '100%',
  };

  const headerContainerStyle = {
    textAlign: 'center',
    marginBottom: '5rem',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
    fontWeight: '800',
    marginBottom: '1.5rem',
    color: '#FFFFFF',
    background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #34D399)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    letterSpacing: '-0.02em',
    lineHeight: '1.1',
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: 'rgba(255, 255, 255, 0.8)',
    maxWidth: '48rem',
    margin: '0 auto',
    lineHeight: '1.7',
    fontWeight: '400',
    letterSpacing: '0.01em',
  };

  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2.5rem',
    alignItems: 'stretch',
  };

  const backgroundPatternStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)
    `,
    zIndex: 1,
  };

  const gridStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage:'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(139, 92, 246, 0.1))',
    backgroundSize: '50px 50px',
    zIndex: 2,
  };

  const keyframesStyle = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <section id="login" style={sectionStyle}>
        <div style={backgroundPatternStyle} />
        <div style={gridStyle} />
        
        <div style={containerStyle}>
          <div style={headerContainerStyle}>
            <h2 style={titleStyle}>
              Access Your Portal
            </h2>
            
            <p style={subtitleStyle}>
              Choose your role to access tailored features designed for your specific needs in our comprehensive timetable management ecosystem
            </p>
          </div>
          
          <div style={cardsContainerStyle}>
            {roles.map((role, index) => (
              <LoginRoleCard key={index} {...role} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginSection;