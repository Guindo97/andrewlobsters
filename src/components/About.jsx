import React, { useState, useEffect, useRef } from 'react';

const About = ({ t }) => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            const cards = [
              { id: 0, delay: 0 },
              { id: 1, delay: 500 },
              { id: 2, delay: 1000 },
              { id: 3, delay: 1500 }
            ];

            cards.forEach(card => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, card.id]);
              }, card.delay);
            });
          }
        });
      },
      {
        threshold: 0.3, // Déclenche quand 30% de la section est visible
        rootMargin: '0px 0px -50px 0px' // Déclenche un peu avant d'arriver à la section
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-12">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
              Fresh from the Ocean
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 bg-clip-text text-transparent mb-8">
              {t.about.title}
            </h2>
            <p className="text-2xl text-gray-800 mb-6 font-semibold">
              Bringing You the Finest Ocean Treasures
            </p>
            <p className="text-xl text-gray-700 mb-6 leading-relaxed max-w-4xl mx-auto">
              {t.about.description}
            </p>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl mx-auto">
              {t.about.dailyCook}
            </p>
            <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
              {t.about.experience}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <a 
              href="https://maps.google.com/maps?q=1206+Pabineau+Falls+Road,+Bathurst,+NB" 
              target="_blank" 
              rel="noopener noreferrer"
              className={`bg-blue-50 p-6 rounded-xl hover:bg-blue-100 transition-all duration-500 cursor-pointer transform ${
                visibleCards.includes(0) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <i className="fas fa-map-marker-alt text-3xl text-blue-600 mb-4"></i>
              <p className="text-sm text-gray-700">{t.info.location}</p>
            </a>
            <a 
              href="tel:+15066555599" 
              className={`bg-green-50 p-6 rounded-xl hover:bg-green-100 transition-all duration-500 cursor-pointer transform ${
                visibleCards.includes(1) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <i className="fas fa-phone text-3xl text-green-600 mb-4"></i>
              <p className="text-sm text-gray-700">{t.info.phone}</p>
            </a>
            <div className={`bg-yellow-50 p-6 rounded-xl transition-all duration-500 transform ${
              visibleCards.includes(2) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}>
              <i className="fas fa-clock text-3xl text-yellow-600 mb-4"></i>
              <p className="text-sm text-gray-700">{t.info.hours}</p>
            </div>
            <a 
              href="mailto:andrewslobster@gmail.com" 
              className={`bg-red-50 p-6 rounded-xl hover:bg-red-100 transition-all duration-500 cursor-pointer transform ${
                visibleCards.includes(3) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
            >
              <i className="fas fa-envelope text-3xl text-red-600 mb-4"></i>
              <p className="text-sm text-gray-700">{t.info.email}</p>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
