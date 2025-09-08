import React from 'react';

const Footer = ({ t, setCurrentSection }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 md:space-x-4 mb-4">
              <img src="/images/andrew.jpg" alt="Andrew's Lobsters" className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-2 md:border-4 border-blue-500 shadow-xl md:shadow-2xl" />
              <h3 className="text-lg md:text-2xl font-bold">Andrew's Lobsters</h3>
            </div>
            <p className="text-gray-300 mb-4">
              {t.footer.description}
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p><i className="fas fa-map-marker-alt mr-2 text-red-500"></i> 1206 Pabineau Falls Road, Bathurst, NB</p>
              <p><i className="fas fa-phone mr-2 text-green-500"></i> (506) 655-5599</p>
              <p><i className="fas fa-envelope mr-2 text-blue-500"></i> andrewslobster@gmail.com</p>
              <p><i className="fas fa-clock mr-2 text-yellow-500"></i> Monday–Saturday: Until we sell out!</p>
            </div>
          </div>

          {/* Quick Links - Style comme la capture d'écran */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t.footer.quickLinks}</h4>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  setCurrentSection('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <i className="fas fa-home text-xl"></i>
                <span className="text-sm font-medium">Home</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentSection('about');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <i className="fas fa-users text-xl"></i>
                <span className="text-sm font-medium">About Us</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentSection('menu');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <i className="fas fa-utensils text-xl"></i>
                <span className="text-sm font-medium">Menu</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentSection('gallery');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <i className="fas fa-images text-xl"></i>
                <span className="text-sm font-medium">Gallery</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentSection('reviews');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <i className="fas fa-star text-xl"></i>
                <span className="text-sm font-medium">Reviews</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentSection('contact');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <i className="fas fa-envelope text-xl"></i>
                <span className="text-sm font-medium">Contact</span>
              </button>
              
              <button
                onClick={() => {
                  setCurrentSection('cart');
                  setTimeout(() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg transition-all duration-200 flex flex-col items-center space-y-2"
              >
                <i className="fas fa-shopping-cart text-xl"></i>
                <span className="text-sm font-medium">Cart</span>
              </button>
            </div>
          </div>

          {/* Get in Touch Section */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">{t.footer.getInTouch}</h4>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-map-marker-alt text-red-500"></i>
                  <span className="text-gray-300 text-sm">Bathurst, New Brunswick, Canada</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-envelope text-blue-500"></i>
                  <span className="text-gray-300 text-sm">andrewslobster@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <i className="fas fa-phone text-green-500"></i>
                  <span className="text-gray-300 text-sm">(506) 655-5599</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentSection('contact');
                  // Faire défiler vers le haut de la page
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full lobster-red text-white py-3 px-4 rounded-full font-semibold hover:scale-105 transform transition-all shadow-lg flex items-center justify-center space-x-2"
              >
                <i className="fas fa-paper-plane"></i>
                <span>Send a message</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <div className="text-gray-400 text-sm mb-2">
            © 2025 Andrew's Lobsters. {t.footer.copyright}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
