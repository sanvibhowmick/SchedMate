import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';

const Header = ({ isScrolled, onNavigate, onScrollTo, currentView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showLoginDropdown && !event.target.closest('.login-dropdown')) {
        setShowLoginDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLoginDropdown]);

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
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
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

  const loginButtonStyle = {
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '500',
    fontSize: '0.875rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    background: 'rgba(255, 255, 255, 0.1)',
    color: '#FFFFFF',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const dropdownStyle = {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: '0.5rem',
    background: 'rgba(0, 0, 0, 0.95)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '0.75rem',
    padding: '1rem',
    minWidth: '200px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
    display: showLoginDropdown ? 'block' : 'none'
  };

  const dropdownItemStyle = {
    padding: '0.75rem 1rem',
    borderRadius: '0.5rem',
    color: '#FFFFFF',
    fontSize: '0.875rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    marginBottom: '0.5rem'
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

  // Improved scroll-to function
  const scrollToSection = (sectionId) => {
    console.log('Trying to scroll to:', sectionId);
    
    // First try to find element by ID
    let element = document.getElementById(sectionId);
    
    // If not found, try to find by data-section attribute
    if (!element) {
      element = document.querySelector(`[data-section="${sectionId}"]`);
    }
    
    // If still not found, try to find by class name
    if (!element) {
      element = document.querySelector(`.${sectionId}`);
    }
    
    if (element) {
      console.log('Found element:', element);
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    } else {
      console.log('Element not found, trying onScrollTo prop');
      if (onScrollTo) {
        onScrollTo(sectionId);
      } else {
        console.warn(`Section "${sectionId}" not found on page`);
        // Fallback: scroll to approximate positions
        const fallbackPositions = {
          'features': window.innerHeight,
          'how-it-works': window.innerHeight * 2,
          'login': window.innerHeight * 3
        };
        
        if (fallbackPositions[sectionId]) {
          window.scrollTo({
            top: fallbackPositions[sectionId],
            behavior: 'smooth'
          });
        }
      }
    }
  };

  const menuItems = [
    { 
      key: 'home', 
      label: 'Home', 
      action: () => {
        console.log('Home clicked');
        if (onNavigate) {
          onNavigate('home');
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    },
    { 
      key: 'features', 
      label: 'Features', 
      action: () => {
        console.log('Features clicked');
        scrollToSection('features');
      }
    },
    { 
      key: 'how-it-works', 
      label: 'How It Works', 
      action: () => {
        console.log('How It Works clicked');
        scrollToSection('how-it-works');
      }
    },
    { 
      key: 'login', 
      label: 'Login', 
      action: () => {
        console.log('Login clicked');
        scrollToSection('login');
      }
    }
  ];

  const loginRoles = [
    {
      key: 'admin',
      label: 'Administrator',
      icon: '👨‍💼',
      color: '#3B82F6'
    },
    {
      key: 'faculty',
      label: 'Faculty',
      icon: '👩‍🏫',
      color: '#10B981'
    },
    {
      key: 'student',
      label: 'Student',
      icon: '👨‍🎓',
      color: '#F59E0B'
    }
  ];

  const handleMenuItemClick = (item) => {
    if (item.action) {
      item.action();
    }
    setIsMenuOpen(false);
  };

  const handleLoginRoleClick = (role) => {
    console.log(`Login as ${role.label} clicked`);
    setShowLoginDropdown(false);
    
    // Here you would typically handle the login navigation
    if (onNavigate) {
      onNavigate(`login-${role.key}`);
    } else {
      // Scroll to login section
      scrollToSection('login');
    }
  };

  const handleGetStartedClick = () => {
    console.log('Get Started clicked');
    scrollToSection('login');
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          <div style={logoStyle} onClick={() => handleMenuItemClick(menuItems[0])}>
            <img 
              src="./src/assets/logo.png" 
              alt="Logo" 
              style={{ 
                width: '4rem', 
                height: '3rem', 
                marginRight: '0.5rem'
              }} 
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            SchedMate
          </div>

          {/* Desktop Navigation */}
          <nav style={{ ...navStyle, display: isMobile ? 'none' : 'flex' }}>
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
            {/* Login Dropdown */}
            {!isMobile && (
              <div style={{ position: 'relative' }} className="login-dropdown">
                <button
                  style={loginButtonStyle}
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.15)';
                    e.target.style.borderColor = 'rgba(34, 211, 238, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                  }}
                >
                  <User size={16} />
                  Login
                </button>

                <div style={dropdownStyle}>
                  <div style={{
                    marginBottom: '1rem',
                    paddingBottom: '1rem',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    Select Your Role
                  </div>

                  {loginRoles.map((role) => (
                    <div
                      key={role.key}
                      style={dropdownItemStyle}
                      onClick={() => handleLoginRoleClick(role)}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.transform = 'translateX(4px)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                        e.target.style.transform = 'translateX(0)';
                      }}
                    >
                      <span style={{ fontSize: '1.125rem' }}>{role.icon}</span>
                      {role.label}
                    </div>
                  ))}

                  <div style={{
                    marginTop: '1rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    <div
                      style={{
                        ...dropdownItemStyle,
                        color: '#22D3EE',
                        fontSize: '0.9rem'
                      }}
                      onClick={() => {
                        console.log('Browse as Guest clicked - Opening dashboard');
                        setShowLoginDropdown(false);
                        // Navigate to mock dashboard
                        if (onNavigate) {
                          onNavigate('dashboard');
                        } else {
                          console.log('Opening mock dashboard as guest');
                          // window.location.href = '/dashboard'; // Uncomment if you have a dashboard route
                        }
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(34, 211, 238, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'transparent';
                      }}
                    >
                      <LogIn size={14} />
                      Browse as Guest
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              style={buttonStyle}
              onClick={handleGetStartedClick}
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
            {isMobile && (
              <button
                style={{
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
            )}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobile && (
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
          
          {/* Mobile Login Options */}
          <div style={{
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '1rem'
            }}>
              Login Options
            </div>
            
            {loginRoles.map((role) => (
              <div
                key={role.key}
                style={{
                  ...navLinkStyle,
                  padding: '1rem 0',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
                }}
                onClick={() => handleLoginRoleClick(role)}
              >
                <span style={{ fontSize: '1rem' }}>{role.icon}</span>
                Login as {role.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;