import React, { useState } from 'react';

const LoginRoleCard = ({ title, desc, icon, color, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const cardStyle = {
    position: 'relative',
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderRadius: '1rem',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    padding: '2rem 1.5rem',
    textAlign: 'center',
    transition: 'all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    cursor: 'pointer',
    overflow: 'hidden',
    transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
    boxShadow: isHovered 
      ? '0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)'
      : '0 4px 20px -8px rgba(0, 0, 0, 0.15)',
    animationDelay: `${index * 100}ms`,
    animation: 'fadeInUp 600ms ease-out forwards',
    opacity: 0,
  };

  const iconContainerStyle = {
    width: '4rem',
    height: '4rem',
    margin: '0 auto 1.25rem auto',
    background: `linear-gradient(135deg, ${getGradientColors(color)})`,
    borderRadius: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    boxShadow: `0 8px 25px rgba(0, 0, 0, 0.2)`,
    transition: 'all 300ms ease',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  };

  const titleStyle = {
    fontSize: '1.375rem',
    fontWeight: '600',
    marginBottom: '0.75rem',
    color: '#FFFFFF',
    transition: 'all 300ms ease',
    letterSpacing: '-0.015em',
    lineHeight: '1.3',
  };

  const descStyle = {
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: '1.75rem',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    fontWeight: '400',
    letterSpacing: '0.005em',
  };

  const buttonStyle = {
    width: '100%',
    background: isButtonHovered
      ? `linear-gradient(135deg, ${getGradientColors(color)})`
      : 'rgba(255, 255, 255, 0.08)',
    padding: '0.875rem 1.25rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    color: '#FFFFFF',
    fontSize: '0.875rem',
    letterSpacing: '0.01em',
    transition: 'all 300ms ease',
    border: '1px solid rgba(255, 255, 255, 0.12)',
    cursor: 'pointer',
    boxShadow: isButtonHovered 
      ? '0 4px 15px rgba(0, 0, 0, 0.2)' 
      : '0 2px 8px rgba(0, 0, 0, 0.1)',
    transform: isButtonHovered ? 'translateY(-1px)' : 'translateY(0)',
    position: 'relative',
    overflow: 'hidden',
  };

  function getGradientColors(colorClass) {
    const colorMap = {
      'from-blue-600 to-indigo-700': '#2563EB, #4338CA',
      'from-emerald-600 to-teal-700': '#059669, #0F766E',
      'from-orange-500 to-red-600': '#F97316, #DC2626',
    };
    return colorMap[colorClass] || '#2563EB, #4338CA';
  }

  return (
    <div
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick && onClick(title)}
    >
      <div style={iconContainerStyle}>
        <span>{icon}</span>
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
        Access Portal
      </button>
    </div>
  );
};

const NavigationBar = () => {
  const [activeLink, setActiveLink] = useState('');

  const navStyle = {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    zIndex: 50,
    background: 'rgba(15, 23, 42, 0.8)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  };

  const navContainerStyle = {
    maxWidth: '85rem',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#FFFFFF',
    textDecoration: 'none',
    background: 'linear-gradient(135deg, #60A5FA, #A78BFA)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
  };

  const linkStyle = (isActive) => ({
    color: isActive ? '#60A5FA' : 'rgba(255, 255, 255, 0.8)',
    textDecoration: 'none',
    fontSize: '0.875rem',
    fontWeight: '500',
    transition: 'all 300ms ease',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    background: isActive ? 'rgba(96, 165, 250, 0.1)' : 'transparent',
    border: isActive ? '1px solid rgba(96, 165, 250, 0.2)' : '1px solid transparent',
  });

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#features', label: 'Features' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];


};

const LoginSection = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const roles = [
    {
      title: 'Administrator',
      desc: 'Complete system management with advanced scheduling tools, user oversight, and comprehensive analytics.',
      icon: '👨‍💼',
      color: 'from-blue-600 to-indigo-700',
    },
    {
      title: 'Faculty',
      desc: 'Streamlined schedule management with workload optimization and preference configuration.',
      icon: '👩‍🏫',
      color: 'from-emerald-600 to-teal-700',
    },
    {
      title: 'Student',
      desc: 'Access personalized timetables, course information, and real-time schedule notifications.',
      icon: '👨‍🎓',
      color: 'from-orange-500 to-red-600',
    }
  ];

  const handleRoleClick = (role) => {
    setSelectedRole(role);
    // Here you would typically handle navigation to the specific portal
    console.log(`Navigating to ${role} portal...`);
  };

  const sectionStyle = {
    position: 'relative',
    padding: '8rem 2rem 6rem 2rem',
    background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    overflow: 'hidden',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
  };

  const containerStyle = {
    maxWidth: '75rem',
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
    width: '100%',
  };

  const headerContainerStyle = {
    textAlign: 'center',
    marginBottom: '4rem',
    position: 'relative',
  };

  const titleStyle = {
    fontSize: 'clamp(2.25rem, 4vw, 3rem)',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#FFFFFF',
    letterSpacing: '-0.025em',
    lineHeight: '1.2',
  };

  const subtitleStyle = {
    fontSize: '1.125rem',
    color: 'rgba(255, 255, 255, 0.7)',
    maxWidth: '42rem',
    margin: '0 auto',
    lineHeight: '1.6',
    fontWeight: '400',
  };

  const cardsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
    alignItems: 'stretch',
  };

  const backgroundPatternStyle = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)
    `,
    zIndex: 1,
  };

  const keyframesStyle = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <section id="login" style={sectionStyle}>
        <NavigationBar />
        <div style={backgroundPatternStyle} />
        
        <div style={containerStyle}>
          <div style={headerContainerStyle}>
            <h1 style={titleStyle}>
              Welcome to SchedMate
            </h1>
            
            <p style={subtitleStyle}>
              Select your role to access the appropriate dashboard and tools designed for your needs
            </p>
          </div>
          
          <div style={cardsContainerStyle}>
            {roles.map((role, index) => (
              <LoginRoleCard 
                key={index} 
                {...role} 
                index={index}
                onClick={handleRoleClick}
              />
            ))}
          </div>

          {selectedRole && (
            <div style={{
              marginTop: '3rem',
              textAlign: 'center',
              padding: '1rem',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '0.75rem',
              color: '#60A5FA',
              fontSize: '0.875rem',
            }}>
              Redirecting to {selectedRole} portal...
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LoginSection;