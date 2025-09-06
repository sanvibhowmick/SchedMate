import React, { useState } from 'react';
import { useScrollDetection } from './hooks/useScrollDetection';
import { useMousePosition } from './hooks/useMousePosition';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';
import FeaturesSection from './components/sections/FeaturesSection';
import HowItWorksSection from './components/sections/HowItWorksSection';
import LoginSection from './components/sections/LoginSection';
import TimetableDashboard from './pages/DashboardStudent'; // Add this import

const SmartTimetableLanding = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [currentView, setCurrentView] = useState('home'); // Add state for current view
  const isScrolled = useScrollDetection();
  const mousePosition = useMousePosition(reduceMotion);

  const handleNavigation = (section) => {
    setCurrentView(section);
  };

  const scrollToSection = (sectionId) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      // Wait for the view to change, then scroll
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Render different views based on currentView state
  const renderCurrentView = () => {
    switch (currentView) {
      case 'dashboard':
        return <TimetableDashboard onBack={() => setCurrentView('home')} />;
      
      case 'features':
        scrollToSection('features');
        return renderHomeView();
      
      case 'how-it-works':
        scrollToSection('how-it-works');
        return renderHomeView();
      
      case 'home':
      default:
        return renderHomeView();
    }
  };

  const renderHomeView = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
      <Header 
        isScrolled={isScrolled} 
        onNavigate={handleNavigation}
        onScrollTo={scrollToSection}
        currentView={currentView}
      />
      
      <main className="relative">
        <HeroSection onNavigate={handleNavigation} />
        <FeaturesSection />
        <HowItWorksSection />
        <LoginSection />
      </main>
      
      <Footer reduceMotion={reduceMotion} setReduceMotion={setReduceMotion} />
    </div>
  );

  return renderCurrentView();
};

export default SmartTimetableLanding;