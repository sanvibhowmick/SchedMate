import React, { useState, useEffect, useRef } from 'react';

const HowItWorksSection = () => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const [activeStep, setActiveStep] = useState(0);
  const [hoveredStep, setHoveredStep] = useState(null);
  const sectionRef = useRef(null);
  const stepRefs = useRef([]);

  const steps = [
    {
      id: 1,
      number: '01',
      title: 'Data Input & Configuration',
      subtitle: 'Setup Your Parameters',
      description: 'Import your institutional data including faculty information, course catalogs, room availability, and scheduling constraints. Our intelligent system adapts to your specific requirements.',
      features: ['Faculty profiles', 'Course database', 'Room specifications', 'Time constraints'],
      icon: '⚙️',
      color: '#22D3EE',
      bgGradient: 'linear-gradient(135deg, rgba(34, 211, 238, 0.1) 0%, rgba(6, 182, 212, 0.05) 100%)',
      borderColor: 'rgba(34, 211, 238, 0.3)',
      duration: '5-10 minutes'
    },
    {
      id: 2,
      number: '02',
      title: 'AI Algorithm Processing',
      subtitle: 'Intelligent Optimization',
      description: 'Our advanced machine learning algorithms analyze all variables, predict potential conflicts, and generate multiple optimized scheduling scenarios tailored to your institution.',
      features: ['Conflict prediction', 'Resource optimization', 'Load balancing', 'Preference matching'],
      icon: '🧠',
      color: '#8B5CF6',
      bgGradient: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(124, 58, 237, 0.05) 100%)',
      borderColor: 'rgba(139, 92, 246, 0.3)',
      duration: '2-3 seconds'
    },
    {
      id: 3,
      number: '03',
      title: 'Real-Time Validation',
      subtitle: 'Conflict Resolution',
      description: 'The system performs comprehensive validation checks, identifies any remaining conflicts, and provides intelligent suggestions for resolution with automated alternatives.',
      features: ['Conflict detection', 'Auto-resolution', 'Alternative suggestions', 'Validation reports'],
      icon: '✅',
      color: '#22C55E',
      bgGradient: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(22, 163, 74, 0.05) 100%)',
      borderColor: 'rgba(34, 197, 94, 0.3)',
      duration: 'Instant'
    },
    {
      id: 4,
      number: '04',
      title: 'Final Review & Deployment',
      subtitle: 'Seamless Integration',
      description: 'Review the optimized timetable, make any final adjustments, and deploy across your institution. Stakeholders receive automatic notifications and access permissions.',
      features: ['Visual preview', 'Manual adjustments', 'Stakeholder notifications', 'System integration'],
      icon: '🚀',
      color: '#F59E0B',
      bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)',
      borderColor: 'rgba(245, 158, 11, 0.3)',
      duration: '1-2 minutes'
    }
  ];

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-100px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepIndex = stepRefs.current.indexOf(entry.target);
          if (stepIndex !== -1 && !visibleSteps.includes(stepIndex)) {
            setTimeout(() => {
              setVisibleSteps(prev => [...prev, stepIndex]);
              setActiveStep(stepIndex);
            }, stepIndex * 200);
          }
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect();
  }, [visibleSteps]);

  const sectionStyle = {
    padding: '8rem 1.5rem',
    background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.98) 0%, rgba(15, 23, 42, 0.95) 100%)',
    position: 'relative',
    overflow: 'hidden',
  };

  const backgroundPattern = {
    position: 'absolute',
    inset: 0,
    backgroundImage: `
      radial-gradient(circle at 20% 30%, rgba(139, 92, 246, 0.06) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(34, 211, 238, 0.06) 0%, transparent 50%),
      linear-gradient(45deg, transparent 49%, rgba(148, 163, 184, 0.03) 50%, transparent 51%)
    `,
    backgroundSize: '100% 100%, 100% 100%, 50px 50px',
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
    marginBottom: '6rem',
  };

  const eyebrowStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.5rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#8B5CF6',
    background: 'rgba(139, 92, 246, 0.1)',
    border: '1px solid rgba(139, 92, 246, 0.2)',
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

  const stepsContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4rem',
    position: 'relative',
  };

  const timelineStyle = {
    position: 'absolute',
    left: '3rem',
    top: '5rem',
    bottom: '5rem',
    width: '2px',
    background: 'linear-gradient(180deg, rgba(148, 163, 184, 0.3) 0%, rgba(148, 163, 184, 0.1) 100%)',
    zIndex: 1,
  };

  const getStepStyle = (index, step) => ({
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: '2.5rem', // Adjusted for smaller cards
    alignItems: 'center',
    padding: '2.5rem', // Adjusted for smaller cards
    background: step.bgGradient,
    border: `1px solid ${step.borderColor}`,
    borderRadius: '2rem',
    position: 'relative',
    overflow: 'hidden',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    transform: visibleSteps.includes(index)
      ? (hoveredStep === index ? 'translateX(10px) scale(1.02)' : 'translateX(0) scale(1)')
      : 'translateX(-50px) scale(0.95)',
    opacity: visibleSteps.includes(index) ? 1 : 0,
    transition: 'all 800ms cubic-bezier(0.4, 0, 0.2, 1)',
    cursor: 'pointer',
    boxShadow: hoveredStep === index
      ? `0 25px 50px -12px ${step.borderColor}`
      : '0 15px 35px -12px rgba(0, 0, 0, 0.3)',
  });

  const stepNumberContainerStyle = (step, index) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '6rem',
  });

  const stepNumberStyle = (step, index) => ({
    width: '5rem',
    height: '5rem',
    borderRadius: '50%',
    background: `linear-gradient(135deg, ${step.color}, ${step.color}dd)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: '700',
    color: '#FFFFFF',
    boxShadow: `0 10px 25px ${step.borderColor}`,
    border: '3px solid rgba(255, 255, 255, 0.2)',
    position: 'relative',
    zIndex: 3,
    transform: activeStep === index ? 'scale(1.1)' : 'scale(1)',
    transition: 'transform 400ms cubic-bezier(0.4, 0, 0.2, 1)',
  });

  const stepContentStyle = {
    flex: 1,
  };

  const stepHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    gap: '1rem',
  };

  const stepTitleStyle = {
    fontSize: '2.25rem', // Increased font size
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: '0.5rem',
    lineHeight: '1.3',
  };

  const stepSubtitleStyle = {
    fontSize: '1.1rem', // Increased font size
    color: '#94A3B8',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '1.5rem',
  };

  const durationBadgeStyle = (step) => ({
    padding: '0.5rem 1rem',
    borderRadius: '1rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    background: `${step.color}20`,
    color: step.color,
    border: `1px solid ${step.color}40`,
    whiteSpace: 'nowrap',
  });

  const stepDescriptionStyle = {
    fontSize: '1.25rem', // Increased font size
    color: '#CBD5E1',
    lineHeight: '1.7',
    marginBottom: '2rem',
  };

  const featuresGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
  };

  const featureItemStyle = (step) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    borderRadius: '0.75rem',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
  });

  const iconStyle = (step) => ({
    fontSize: '1.5rem',
    width: '2.5rem',
    height: '2.5rem',
    borderRadius: '0.75rem',
    background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: `0 4px 15px ${step.borderColor}`,
  });

  const processFlowStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    marginTop: '4rem',
    padding: '2rem',
    background: 'rgba(15, 23, 42, 0.5)',
    borderRadius: '1rem',
    border: '1px solid rgba(148, 163, 184, 0.1)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
  };

  const flowItemStyle = {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: '2rem',
    fontWeight: '500',
  };

  const arrowStyle = {
    color: '#22D3EE',
    fontSize: '1.5rem',
  };

  return (
    <>
      <style>
        {`
          @keyframes slideInLeft {
            from {
              transform: translateX(-50px);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          
          @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .step-icon:hover {
            animation: pulse 0.6s ease-in-out;
          }
          
          .step-number.active::after {
            content: '';
            position: absolute;
            inset: -10px;
            border-radius: 50%;
            background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2));
            animation: rotate 2s linear infinite;
            z-index: -1;
          }
          
          @media (max-width: 768px) {
            .steps-container {
              gap: 2rem !important;
            }
            .step-item {
              grid-template-columns: 1fr !important;
              gap: 2rem !important;
              text-align: center !important;
              padding: 2rem !important;
            }
            .features-grid {
              grid-template-columns: 1fr !important;
            }
            .timeline {
              display: none !important;
            }
            .process-flow {
              flex-direction: column !important;
            }
          }
        `}
      </style>
      
      <section 
        ref={sectionRef} 
        style={sectionStyle}
        id="how-it-works"
        data-section="how-it-works"
      >
        <div style={backgroundPattern} />
        
        <div style={containerStyle}>
          <div style={headerStyle}>
            
            
            <h2 style={titleStyle}>
              How Our AI-Powered
              <br />
              System Works
            </h2>
            
            <p style={subtitleStyle}>
              From data input to final deployment, our streamlined 4-step process 
              ensures perfect timetable generation in minutes, not hours.
            </p>
          </div>
          
          <div style={stepsContainerStyle} className="steps-container">
            <div style={timelineStyle} className="timeline" />
            
            {steps.map((step, index) => (
              <div
                key={step.id}
                ref={(el) => stepRefs.current[index] = el}
                style={getStepStyle(index, step)}
                className="step-item"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div style={stepNumberContainerStyle(step, index)}>
                  <div 
                    style={stepNumberStyle(step, index)}
                    className={`step-number ${activeStep === index ? 'active' : ''}`}
                  >
                    {step.number}
                  </div>
                </div>
                
                <div style={stepContentStyle}>
                  <div style={stepHeaderStyle}>
                    <div>
                      <h3 style={stepTitleStyle}>{step.title}</h3>
                      <p style={stepSubtitleStyle}>{step.subtitle}</p>
                    </div>
                    <div style={durationBadgeStyle(step)}>
                      ⏱️ {step.duration}
                    </div>
                  </div>
                  
                  <p style={stepDescriptionStyle}>
                    {step.description}
                  </p>
                  
                  <div style={featuresGridStyle} className="features-grid">
                    {step.features.map((feature, idx) => (
                      <div key={idx} style={featureItemStyle(step)}>
                        <div style={iconStyle(step)} className="step-icon">
                          {step.icon}
                        </div>
                        <span style={{ color: '#E2E8F0', fontWeight: '500', fontSize: '1.1rem' }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div style={processFlowStyle} className="process-flow">
            <div style={flowItemStyle}>
              <div>📥 Input Data</div>
            </div>
            <div style={arrowStyle}>→</div>
            <div style={flowItemStyle}>
              <div>🧠 AI Processing</div>
            </div>
            <div style={arrowStyle}>→</div>
            <div style={flowItemStyle}>
              <div>✅ Validation</div>
            </div>
            <div style={arrowStyle}>→</div>
            <div style={flowItemStyle}>
              <div>🚀 Deployment</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorksSection;