import React, { useState, useEffect } from 'react';
import { translations } from './data/translations';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import AboutUs from './components/AboutUs';
import Menu from './components/Menu';
import Cart from './components/Cart';
import Gallery from './components/Gallery';
import Reviews from './components/Reviews';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [language, setLanguage] = useState('en');
  const [cartItems, setCartItems] = useState([]);

  const t = translations[language];

  // Charger le panier depuis localStorage au montage
  useEffect(() => {
    const savedCart = localStorage.getItem('andrewsLobstersCart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Sauvegarder le panier dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('andrewsLobstersCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      }
      return [...prev, product];
    });
  };

  const updateCartItem = (id, quantity) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'home':
        return (
          <>
            <Hero setCurrentSection={setCurrentSection} t={t} />
            <About t={t} />
          </>
        );
      case 'about':
        return <AboutUs t={t} />;
      case 'menu':
        return <Menu addToCart={addToCart} t={t} setCurrentSection={setCurrentSection} />;
      case 'gallery':
        return <Gallery t={t} />;
      case 'reviews':
        return <Reviews t={t} />;
      case 'contact':
        return <Contact t={t} />;
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            updateCartItem={updateCartItem}
            removeFromCart={removeFromCart}
            setCurrentSection={setCurrentSection}
            t={t}
          />
        );
      default:
        return <Hero setCurrentSection={setCurrentSection} t={t} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        language={language}
        setLanguage={setLanguage}
        cartItems={cartItems}
        t={t}
      />
      <main className="pt-20 flex-1">
        {renderSection()}
      </main>
      <Footer t={t} setCurrentSection={setCurrentSection} />
    </div>
  );
};

export default App;
