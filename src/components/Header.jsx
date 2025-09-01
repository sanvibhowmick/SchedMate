import React from 'react';

const Header = ({ isScrolled }) => {
  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    padding: '1.5rem 2rem',
    transition: 'all 300ms',
    backgroundColor: isScrolled ? 'rgba(15, 23, 42, 0.95)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(8px)' : 'none',
    borderBottom: isScrolled ? '1px solid rgba(6, 182, 212, 0.2)' : 'none',
  };

  const navStyle = {
    maxWidth: '80rem',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  const logoStyle = {
    width: '2.5rem',
    height: '2.5rem',
    backgroundImage: 'linear-gradient(to right, #22D3EE, #8B5CF6)',
    borderRadius: '0.5rem',
  };

  const navLinkStyle = {
    color: '#D1D5DB',
    transition: 'color 300ms',
    textDecoration: 'none',
    fontSize: '1.125rem',
  };

  const buttonStyle = {
    backgroundImage: 'linear-gradient(to right, #06B6D4, #7C3AED)',
    padding: '0.75rem 2rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    color: '#FFFFFF',
    transition: 'all 300ms',
    border: 'none',
    cursor: 'pointer',
    fontSize: '1.125rem',
  };

  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={logoStyle}></div>
          <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#FFFFFF' }}>Smart Timetable Manager</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <a href="#" style={navLinkStyle}>Home</a>
          <a href="#features" style={navLinkStyle}>Features</a>
          <a href="#how-it-works" style={navLinkStyle}>How It Works</a>
          <a href="#login" style={navLinkStyle}>Login</a>
          <a href="#" style={navLinkStyle}>Help</a>
        </div>
        
        <button style={buttonStyle}>
          Get Started
        </button>
      </nav>
    </header>
  );
};

export default Header;
