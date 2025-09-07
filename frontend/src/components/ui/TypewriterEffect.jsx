import React, { useState, useEffect } from 'react';

const typewriterTextStyle = {
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  backgroundImage: 'linear-gradient(to right, #22D3EE, #8B5CF6)',
};

const cursorStyle = {
  animation: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  color: '#22D3EE',
};

const keyframes = `
  @keyframes pulse {
    50% { opacity: 0.5; }
  }
`;

const TypewriterEffect = ({ texts, className, style }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const current = texts[currentIndex];
      
      if (isDeleting) {
        setCurrentText(current.substring(0, currentText.length - 1));
        if (currentText === '') {
          setIsDeleting(false);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        }
      } else {
        setCurrentText(current.substring(0, currentText.length + 1));
        if (currentText === current) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, texts]);

  return (
    <>
      <style>{keyframes}</style>
      <span className={className} style={{...typewriterTextStyle, ...style}}>
        {currentText}
        <span style={cursorStyle}>|</span>
      </span>
    </>
  );
};

export default TypewriterEffect;
