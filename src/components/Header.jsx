import React from 'react';

const Header = ({ currentSection, setCurrentSection, language, setLanguage, cartItems, t }) => {
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">🦞</span>
            <h1 className="text-2xl font-bold text-blue-900">Andrew's Lobsters</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            {['home', 'menu', 'gallery', 'contact'].map(section => (
              <button
                key={section}
                onClick={() => setCurrentSection(section)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  currentSection === section 
                    ? 'bg-blue-600 text-white' 
                    : 'text-blue-900 hover:bg-blue-100'
                }`}
              >
                {t.nav[section]}
              </button>
            ))}
            <button
              onClick={() => setCurrentSection('cart')}
              className={`px-4 py-2 rounded-lg transition-all relative ${
                currentSection === 'cart' 
                  ? 'bg-red-600 text-white' 
                  : 'text-red-600 hover:bg-red-100'
              }`}
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              {t.nav.cart}
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
