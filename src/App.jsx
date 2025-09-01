import React, { useState } from 'react';
import { useScrollDetection } from './hooks/useScrollDetection';
import { useMousePosition } from './hooks/useMousePosition';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import LoginSection from './components/sections/LoginSection';

const SmartTimetableLanding = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const isScrolled = useScrollDetection();
  const mousePosition = useMousePosition(reduceMotion);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
      <Header isScrolled={isScrolled} />
      
      <main className="relative">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <LoginSection />
      </main>
      
      <Footer reduceMotion={reduceMotion} setReduceMotion={setReduceMotion} />
    </div>
  );
};

export default SmartTimetableLanding;