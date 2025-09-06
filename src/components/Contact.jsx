import React, { useState } from 'react';
import Map from './Map';

const Contact = ({ t }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="py-20 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
          {t.contact.title}
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-xl space-y-6">
              <input
                type="text"
                placeholder={t.contact.name}
                value={formData.name}
                onChange={(e) => setFormData(prev => ({...prev, name: e.target.value}))}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder={t.contact.email}
                value={formData.email}
                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <textarea
                placeholder={t.contact.message}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({...prev, message: e.target.value}))}
                rows="5"
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full lobster-red text-white py-4 rounded-lg text-lg font-semibold hover:scale-105 transform transition-all shadow-lg"
              >
                {t.contact.send}
              </button>
            </form>
          </div>
          
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Visit Us</h3>
              <div className="space-y-4">
                <a 
                  href="https://maps.google.com/maps?q=1206+Pabineau+Falls+Road,+Bathurst,+NB" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:bg-blue-50 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="fas fa-map-marker-alt text-blue-600"></i>
                  <span className="text-gray-700">1206 Pabineau Falls Road, Bathurst, NB</span>
                </a>
                
                <a 
                  href="tel:+15066555599" 
                  className="flex items-center space-x-3 hover:bg-green-50 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="fas fa-phone text-green-600"></i>
                  <span className="text-gray-700">(506) 655-5599</span>
                </a>
                
                <a 
                  href="mailto:andrewslobster@gmail.com" 
                  className="flex items-center space-x-3 hover:bg-red-50 p-2 rounded-lg transition-colors cursor-pointer"
                >
                  <i className="fas fa-envelope text-red-600"></i>
                  <span className="text-gray-700">andrewslobster@gmail.com</span>
                </a>
                
                <div className="flex items-center space-x-3 p-2">
                  <i className="fas fa-clock text-yellow-600"></i>
                  <span className="text-gray-700">Monday–Saturday: Until we sell out!</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Location Map</h3>
              <div className="mb-4">
                <p className="text-gray-700 mb-2">Find us at:</p>
                <p className="text-sm text-gray-500">1206 Pabineau Falls Road, Bathurst, NB</p>
              </div>
              <Map />
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-blue-900 mb-6">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="bg-pink-600 text-white p-3 rounded-full hover:bg-pink-700 transition-colors">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="bg-blue-400 text-white p-3 rounded-full hover:bg-blue-500 transition-colors">
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
