import React, { useState } from 'react';

const Header = ({ currentSection, setCurrentSection, language, setLanguage, cartItems, t }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSectionClick = (section) => {
    setCurrentSection(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-lg z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img src="/images/andrew.jpg" alt="Andrew's Lobsters" className="w-10 h-10 rounded-full object-cover" />
            <h1 className="text-2xl font-bold text-blue-900">Andrew's Lobsters</h1>
          </div>
          
          {/* Desktop Navigation */}
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
            {/* Mobile Cart Button */}
            <button
              onClick={() => setCurrentSection('cart')}
              className="md:hidden relative p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
            >
              <i className="fas fa-shopping-cart text-xl"></i>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Language Button */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {language === 'en' ? 'FR' : 'EN'}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-blue-900 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg border">
            <nav className="flex flex-col space-y-2 p-4">
              {['home', 'menu', 'gallery', 'contact'].map(section => (
                <button
                  key={section}
                  onClick={() => handleSectionClick(section)}
                  className={`px-4 py-3 rounded-lg transition-all text-left ${
                    currentSection === section 
                      ? 'bg-blue-600 text-white' 
                      : 'text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  {t.nav[section]}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
