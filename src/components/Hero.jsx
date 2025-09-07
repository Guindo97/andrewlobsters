import React, { useState, useEffect } from 'react';

const Hero = ({ setCurrentSection, t }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000); // 1.5 secondes de délai

    return () => clearTimeout(timer);
  }, []);

  return (
    <section 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: 'url(/images/lobsterandrew.jpg)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay pour améliorer la lisibilité du texte */}
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className={`bg-white/90 backdrop-blur-sm rounded-3xl p-12 max-w-4xl mx-auto shadow-2xl transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <h1 className="text-5xl md:text-7xl font-bold text-blue-900 mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-700 mb-6">
            {t.hero.subtitle}
          </p>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            {t.hero.description}
          </p>
          <button
            onClick={() => {
              setCurrentSection('menu');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="lobster-red text-white px-8 py-4 rounded-full text-xl font-semibold hover:scale-105 transform transition-all shadow-lg"
          >
            {t.hero.cta} 🚤
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
