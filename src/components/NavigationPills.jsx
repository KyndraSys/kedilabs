// src/components/NavigationPills.jsx
import React from 'react';

const NavigationPills = () => {
  const handleHashClick = (e, hash) => {
    e.preventDefault();
    
    // Update URL with hash
    window.history.pushState(null, null, hash);
    
    // Smooth scroll to element
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <nav className="relative z-20 flex justify-center pt-8">
      <div className="flex space-x-12 bg-white/10 backdrop-blur-md rounded-full px-12 py-4">
        <a 
          href="#programs" 
          onClick={(e) => handleHashClick(e, '#programs')}
          className="text-white hover:text-gray-200 transition-colors font-medium text-sm"
        >
          Downloads
        </a>
        <a 
          href="#research" 
          onClick={(e) => handleHashClick(e, '#research')}
          className="text-white hover:text-gray-200 transition-colors font-medium text-sm"
        >
          Certifications
        </a>
        <a 
          href="#partnerships" 
          onClick={(e) => handleHashClick(e, '#partnerships')}
          className="text-white hover:text-gray-200 transition-colors font-medium text-sm"
        >
          STEM Validated
        </a>
        <a 
          href="#impact" 
          onClick={(e) => handleHashClick(e, '#impact')}
          className="text-white hover:text-gray-200 transition-colors font-medium text-sm"
        >
          Training
        </a>
        <a 
          href="#community" 
          onClick={(e) => handleHashClick(e, '#community')}
          className="text-white hover:text-gray-200 transition-colors font-medium text-sm"
        >
          Community
        </a>
        <a 
          href="#support" 
          onClick={(e) => handleHashClick(e, '#support')}
          className="text-white hover:text-gray-200 transition-colors font-medium text-sm"
        >
          Support
        </a>
      </div>
    </nav>
  );
};

export default NavigationPills;