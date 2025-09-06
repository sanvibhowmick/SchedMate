
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Header = ({ isScrolled, onNavigate, onScrollTo, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const headerStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    transition: 'all 0.3s ease',
    background: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.1)',
    backdropFilter: isScrolled ? 'blur(20px)' : 'blur(10px)',
    borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
  };

  const containerStyle = {
    maxWidth: '80rem',
    margin: '0 auto',
    padding: '1rem 2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    cursor: 'pointer'
  };

  const navStyle = {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center'
  };

  const navLinkStyle = {
    color: '#D1D5DB',
    fontSize: '0.9rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    padding: '0.5rem 0'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)',
    color: '#FFFFFF',
    border: 'none'
  };

  const mobileMenuStyle = {
    position: 'fixed',
    top: '80px',
    left: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(20px)',
    padding: '2rem',
    display: isMenuOpen ? 'flex' : 'none',
    flexDirection: 'column',
    gap: '1rem',
    zIndex: 40
  };

  const menuItems = [
    { key: 'home', label: 'Home', action: () => onNavigate('home') },
    { key: 'features', label: 'Features', action: () => onScrollTo ? onScrollTo('features') : onNavigate('features') },
    { key: 'how-it-works', label: 'How It Works', action: () => onScrollTo ? onScrollTo('how-it-works') : onNavigate('how-it-works') },
    { key: 'dashboard', label: 'Dashboard', action: () => onNavigate('dashboard') }
  ];

  const handleMenuItemClick = (item) => {
    item.action();
    setIsMenuOpen(false);
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <div style={logoStyle} onClick={() => onNavigate('home')}>
            SchedMate
          </div>

          {/* Desktop Navigation */}
          <nav style={{ ...navStyle, display: window.innerWidth >= 768 ? 'flex' : 'none' }}>
            {menuItems.map((item) => (
              <div
                key={item.key}
                style={{
                  ...navLinkStyle,
                  color: currentView === item.key ? '#22D3EE' : '#D1D5DB'
                }}
                onClick={() => handleMenuItemClick(item)}
                onMouseEnter={(e) => e.target.style.color = '#22D3EE'}
                onMouseLeave={(e) => e.target.style.color = currentView === item.key ? '#22D3EE' : '#D1D5DB'}
              >
                {item.label}
              </div>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              style={buttonStyle}
              onClick={() => onNavigate('dashboard')}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-1px)';
                e.target.style.boxShadow = '0 4px 20px rgba(34, 211, 238, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Get Started
            </button>

            {/* Mobile Menu Button */}
            <button
              style={{
                display: window.innerWidth < 768 ? 'block' : 'none',
                background: 'none',
                border: 'none',
                color: '#FFFFFF',
                cursor: 'pointer',
                padding: '0.5rem'
              }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div style={mobileMenuStyle}>
        {menuItems.map((item) => (
          <div
            key={item.key}
            style={{
              ...navLinkStyle,
              padding: '1rem 0',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              color: currentView === item.key ? '#22D3EE' : '#D1D5DB'
            }}
            onClick={() => handleMenuItemClick(item)}
          >
            {item.label}
          </div>
        ))}
      </div>
    </>
  );
};

export default Header;