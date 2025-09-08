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
        backgroundImage: 'url(/images/seafood.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Overlay sombre pour le style restaurant de fruits de mer */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      <div className="absolute inset-0 bg-blue-900/20"></div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <div className={`text-center text-white max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <div className="mb-8">
            <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full text-sm font-semibold mb-6 border border-white/30">
              Ocean Variety in Our Store
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 sm:mb-6 text-white drop-shadow-2xl">
              {t.hero.title}
            </h1>
            <p className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg">
              The Place to Be for Sea Food
            </p>
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-6 sm:mb-8 leading-relaxed max-w-4xl mx-auto drop-shadow-md px-4">
              {t.hero.subtitle}
            </p>
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-3xl mx-auto drop-shadow-md px-4">
              {t.hero.description}
            </p>
            <div className="text-lg sm:text-xl font-semibold text-white/90 mb-8 sm:mb-12 drop-shadow-md px-4">
              The Wonders of Ocean in Your Plate
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => {
                setCurrentSection('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:scale-105 transform transition-all shadow-2xl relative overflow-hidden group border-2 border-white/20"
            >
              <span className="relative z-10 flex items-center">
                <i className="fas fa-utensils mr-3"></i>
                {t.hero.cta}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </button>
            <button
              onClick={() => {
                setCurrentSection('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white/20 backdrop-blur-sm text-white border-2 border-white/50 px-8 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl hover:bg-white/30 hover:border-white/70 transform transition-all shadow-2xl"
            >
              <i className="fas fa-info-circle mr-3"></i>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
