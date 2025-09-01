import React, { useState, useEffect, useRef } from 'react';

const FeaturesSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const features = [
    {
      id: 1,
      icon: '🤖',
      title: 'AI-Powered Optimization',
      description: 'Advanced machine learning algorithms automatically resolve scheduling conflicts and optimize resource allocation across all departments.',
      highlight: 'Smart Automation',
      stats: '99.2% accuracy',
      color: 'rgba(34, 211, 238, 0.1)',
      borderColor: 'rgba(34, 211, 238, 0.3)',
      iconBg: 'linear-gradient(135deg, #22D3EE, #0EA5E9)'
    },
    {
      id: 2,
      icon: '📊',
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboards provide instant insights into faculty workload, room utilization, and schedule efficiency.',
      highlight: 'Live Insights',
      stats: '15+ metrics',
      color: 'rgba(139, 92, 246, 0.1)',
      borderColor: 'rgba(139, 92, 246, 0.3)',
      iconBg: 'linear-gradient(135deg, #8B5CF6, #7C3AED)'
    },
    {
      id: 3,
      icon: '🏢',
      title: 'Multi-Department Support',
      description: 'Seamlessly coordinate schedules across multiple departments, faculties, and campuses with centralized management.',
      highlight: 'Unified Platform',
      stats: '50+ departments',
      color: 'rgba(34, 197, 94, 0.1)',
      borderColor: 'rgba(34, 197, 94, 0.3)',
      iconBg: 'linear-gradient(135deg, #22C55E, #16A34A)'
    },
    {
      id: 4,
      icon: '⚡',
      title: 'Instant Conflict Resolution',
      description: 'Detect and resolve scheduling conflicts in real-time with intelligent suggestions and automated rescheduling.',
      highlight: 'Zero Conflicts',
      stats: '<0.1s response',
      color: 'rgba(249, 115, 22, 0.1)',
      borderColor: 'rgba(249, 115, 22, 0.3)',
      iconBg: 'linear-gradient(135deg, #F97316, #EA580C)'
    },
    {
      id: 5,
      icon: '👥',
      title: 'Faculty Management',
      description: 'Optimize faculty workloads, track availability, and ensure fair distribution of teaching responsibilities.',
      highlight: 'Smart Allocation',
      stats: '95% satisfaction',
      color: 'rgba(236, 72, 153, 0.1)',
      borderColor: 'rgba(236, 72, 153, 0.3)',
      iconBg: 'linear-gradient(135deg, #EC4899, #DB2777)'
    },
    {
      id: 6,
      icon: '📱',
      title: 'Mobile Accessibility',
      description: 'Access your timetables anywhere with our responsive mobile app and progressive web application.',
      highlight: 'Always Connected',
      stats: 'iOS & Android',
      color: 'rgba(99, 102, 241, 0.1)',
      borderColor: 'rgba(99, 102, 241, 0.3)',
      iconBg: 'linear-gradient(135deg, #6366F1, #4F46E5)'
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cardIndex = cardRefs.current.indexOf(entry.target);
          if (cardIndex !== -1 && !visibleCards.includes(cardIndex)) {
            setTimeout(() => {
              setVisibleCards(prev => [...prev, cardIndex]);
            }, cardIndex * 150); // Staggered animation
          }
        }
      });
    }, observerOptions);

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [visibleCards]);

  const sectionStyle = {
    padding: '8rem 1.5rem',
    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.98) 100%)',
    position: 'relative',
    overflow: 'hidden',
  };

  const backgroundPattern = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)
    `,
    zIndex: 1,
  };

  const containerStyle = {
    maxWidth: '85rem',
    margin: '0 auto',
    position: 'relative',
    zIndex: 10,
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '5rem',
  };

  const eyebrowStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#22D3EE',
    background: 'rgba(34, 211, 238, 0.1)',
    border: '1px solid rgba(34, 211, 238, 0.2)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    marginBottom: '1.5rem',
  };

  const titleStyle = {
    fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
    fontWeight: '700',
    lineHeight: '1.2',
    color: '#FFFFFF',
    marginBottom: '1.5rem',
    letterSpacing: '-0.02em',
    background: 'linear-gradient(135deg, #FFFFFF 0%, #E2E8F0 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: '#CBD5E1',
    lineHeight: '1.7',
    maxWidth: '50rem',
    margin: '0 auto',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
    gap: '2rem',
    alignItems: 'start',
  };

  const getCardStyle = (index, feature) => ({
    background: `linear-gradient(135deg, ${feature.color}, rgba(15, 23, 42, 0.8))`,
    border: `1px solid ${feature.borderColor}`,
    borderRadius: '1.5rem',
    padding: '2.5rem',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transform: visibleCards.includes(index) 
      ? (hoveredCard === index ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)')
      : 'translateY(30px) scale(0.95)',
    opacity: visibleCards.includes(index) ? 1 : 0,
    transition: 'all 600ms cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    boxShadow: hoveredCard === index
      ? `0 25px 50px -12px ${feature.borderColor}`
      : '0 10px 30px -12px rgba(0, 0, 0, 0.3)',
  });

  const iconContainerStyle = (feature) => ({
    width: '4rem',
    height: '4rem',
    borderRadius: '1rem',
    background: feature.iconBg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
  });

  const cardHeaderStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '1rem',
  };

  const highlightBadgeStyle = (feature) => ({
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    fontWeight: '600',
    background: feature.borderColor,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  });

  const cardTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '1rem',
    lineHeight: '1.3',
  };

  const cardDescriptionStyle = {
    fontSize: '1rem',
    color: '#CBD5E1',
    lineHeight: '1.6',
    marginBottom: '1.5rem',
  };

  const statsStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#22D3EE',
  };

  const overlayStyle = {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%)',
    borderRadius: '1.5rem',
    pointerEvents: 'none',
    opacity: hoveredCard !== null ? 1 : 0,
    transition: 'opacity 300ms ease',
  };

  return (
    <>
      <style>
        {`
          @keyframes slideInUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          .feature-card:hover .feature-icon {
            animation: pulse 0.6s ease-in-out;
          }
          
          @media (max-width: 768px) {
            .features-grid {
              grid-template-columns: 1fr !important;
              gap: 1.5rem !important;
            }
            .feature-card {
              padding: 2rem !important;
            }
          }
        `}
      </style>
      
      <section ref={sectionRef} style={sectionStyle}>
        <div style={backgroundPattern} />
        
        <div style={containerStyle}>
          <div style={headerStyle}>
            
            
            <h2 style={titleStyle}>
              Everything You Need for
              <br />
              Perfect Scheduling
            </h2>
            
            <p style={subtitleStyle}>
              Our comprehensive suite of features ensures seamless timetable management, 
              from AI-powered optimization to real-time conflict resolution.
            </p>
          </div>
          
          <div style={gridStyle} className="features-grid">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                ref={(el) => cardRefs.current[index] = el}
                style={getCardStyle(index, feature)}
                className="feature-card"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div style={overlayStyle} />
                
                <div style={iconContainerStyle(feature)} className="feature-icon">
                  {feature.icon}
                </div>
                
                <div style={cardHeaderStyle}>
                  <div>
                    <h3 style={cardTitleStyle}>{feature.title}</h3>
                  </div>
                  <div style={highlightBadgeStyle(feature)}>
                    {feature.highlight}
                  </div>
                </div>
                
                <p style={cardDescriptionStyle}>
                  {feature.description}
                </p>
                
                <div style={statsStyle}>
                  <span>📈</span>
                  <span>{feature.stats}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturesSection;