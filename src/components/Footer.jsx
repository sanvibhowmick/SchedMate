import React, { useState } from 'react';

const Footer = ({ reduceMotion, setReduceMotion }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  const footerStyle = {
    backgroundColor: '#0F172A',
    borderTop: '1px solid #1E293B',
    padding: '4rem 1.5rem 2rem',
  };

  const containerStyle = {
    maxWidth: '80rem',
    margin: '0 auto',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '3rem',
    marginBottom: '3rem',
  };

  const logoStyle = {
    width: '2.5rem',
    height: '2.5rem',
    backgroundImage: 'linear-gradient(135deg, #22D3EE 0%, #8B5CF6 100%)',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 12px rgba(34, 211, 238, 0.15)',
  };

  const textWhite = { color: '#FFFFFF' };
  const textGray = { color: '#94A3B8' };
  const textMuted = { color: '#64748B' };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    border: isButtonHovered ? '2px solid #22D3EE' : '2px solid #334155',
    borderRadius: '0.75rem',
    color: isButtonHovered ? '#22D3EE' : '#94A3B8',
    transition: 'all 300ms ease',
    backgroundColor: isButtonHovered ? 'rgba(34, 211, 238, 0.05)' : 'transparent',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '0.875rem',
    outline: 'none',
    transform: isButtonHovered ? 'translateY(-1px)' : 'translateY(0)',
    boxShadow: isButtonHovered ? '0 4px 12px rgba(34, 211, 238, 0.15)' : 'none',
  };

  const sectionHeadingStyle = {
    fontSize: '1.125rem',
    fontWeight: '600',
    ...textWhite,
    marginBottom: '1.5rem',
    letterSpacing: '0.025em',
  };

  const linkStyle = {
    ...textGray,
    textDecoration: 'none',
    transition: 'all 300ms ease',
    fontSize: '0.9rem',
    lineHeight: '1.6',
    display: 'block',
    padding: '0.25rem 0',
  };

  const getLinkStyle = (linkName) => ({
    ...linkStyle,
    color: hoveredLink === linkName ? '#22D3EE' : '#94A3B8',
    transform: hoveredLink === linkName ? 'translateX(4px)' : 'translateX(0)',
  });

  const dividerStyle = {
    borderTop: '1px solid #1E293B',
    marginTop: '3rem',
    paddingTop: '2rem',
  };

  const copyrightStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem',
    ...textMuted,
    fontSize: '0.875rem',
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '1rem',
  };

  const socialLinkStyle = {
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '50%',
    backgroundColor: '#1E293B',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#94A3B8',
    textDecoration: 'none',
    transition: 'all 300ms ease',
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle}>
          {/* Company Info Section */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
              <div style={logoStyle}></div>
              <div>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', ...textWhite, display: 'block' }}>
                  SchedMate
                </span>
                <span style={{ fontSize: '0.875rem', ...textMuted }}>
                  Educational Solutions
                </span>
              </div>
            </div>
            <p style={{ ...textGray, lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Streamlining academic operations with intelligent timetable management 
              and comprehensive educational tools for modern institutions.
            </p>
            <div style={socialLinksStyle}>
              <a 
                href="#" 
                style={socialLinkStyle}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = '#22D3EE';
                  e.target.style.color = '#0F172A';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = '#1E293B';
                  e.target.style.color = '#94A3B8';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                📧
              </a>
              <a 
                href="#" 
                style={socialLinkStyle}
                onMouseEnter={e => {
                  e.target.style.backgroundColor = '#22D3EE';
                  e.target.style.color = '#0F172A';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  e.target.style.backgroundColor = '#1E293B';
                  e.target.style.color = '#94A3B8';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                🌐
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h4 style={sectionHeadingStyle}>Quick Links</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a 
                href="#" 
                style={getLinkStyle('about')}
                onMouseEnter={() => setHoveredLink('about')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                About Us
              </a>
              <a 
                href="#" 
                style={getLinkStyle('features')}
                onMouseEnter={() => setHoveredLink('features')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Features
              </a>
              <a 
                href="#" 
                style={getLinkStyle('pricing')}
                onMouseEnter={() => setHoveredLink('pricing')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Pricing
              </a>
              <a 
                href="#" 
                style={getLinkStyle('contact')}
                onMouseEnter={() => setHoveredLink('contact')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Contact Us
              </a>
            </nav>
          </div>

          {/* Support Section */}
          <div>
            <h4 style={sectionHeadingStyle}>Support</h4>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <a 
                href="#" 
                style={getLinkStyle('help')}
                onMouseEnter={() => setHoveredLink('help')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Help Center
              </a>
              <a 
                href="#" 
                style={getLinkStyle('docs')}
                onMouseEnter={() => setHoveredLink('docs')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Documentation
              </a>
              <a 
                href="#" 
                style={getLinkStyle('faq')}
                onMouseEnter={() => setHoveredLink('faq')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                FAQ
              </a>
              <a 
                href="#" 
                style={getLinkStyle('privacy')}
                onMouseEnter={() => setHoveredLink('privacy')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                style={getLinkStyle('terms')}
                onMouseEnter={() => setHoveredLink('terms')}
                onMouseLeave={() => setHoveredLink(null)}
              >
                Terms of Service
              </a>
            </nav>
          </div>

          {/* Settings Section */}
          <div>
            <h4 style={sectionHeadingStyle}>Preferences</h4>
            
            <div style={{ ...textMuted, fontSize: '0.875rem', lineHeight: '1.5' }}>
              <p style={{ margin: '0 0 0.5rem 0' }}>📞 Support: +1 (555) 123-4567</p>
              <p style={{ margin: '0 0 0.5rem 0' }}>📧 hello@edumanage.com</p>
              <p style={{ margin: '0' }}>🕒 Mon-Fri, 9AM-6PM EST</p>
            </div>
          </div>
        </div>

        <div style={dividerStyle}>
          <div style={copyrightStyle}>
            <div>
              <p style={{ margin: 0 }}>
                © 2025 EduManage Educational Solutions. All rights reserved.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem' }}>
              <a 
                href="#" 
                style={{ ...textMuted, textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#22D3EE'}
                onMouseLeave={e => e.target.style.color = '#64748B'}
              >
                Legal
              </a>
              <a 
                href="#" 
                style={{ ...textMuted, textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#22D3EE'}
                onMouseLeave={e => e.target.style.color = '#64748B'}
              >
                Cookies
              </a>
              <a 
                href="#" 
                style={{ ...textMuted, textDecoration: 'none' }}
                onMouseEnter={e => e.target.style.color = '#22D3EE'}
                onMouseLeave={e => e.target.style.color = '#64748B'}
              >
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;