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
import OrdersManagement from './components/OrdersManagement';
import Footer from './components/Footer';
import AdminNotificationStatus from './components/AdminNotificationStatus';
import { adminNotificationsService } from './services/adminNotificationsService';

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

  // Demander la permission pour les notifications admin au démarrage
  useEffect(() => {
    // Attendre 2 secondes pour que l'app se charge complètement
    const timer = setTimeout(async () => {
      try {
        console.log('🔔 Requesting permission for admin notifications...');
        await adminNotificationsService.requestNotificationPermission();
      } catch (error) {
        console.warn('Error requesting notification permission:', error);
      }
    }, 2000);

    return () => clearTimeout(timer);
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
    console.log('Current section:', currentSection);
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
            setCartItems={setCartItems}
            updateCartItem={updateCartItem}
            removeFromCart={removeFromCart}
            setCurrentSection={setCurrentSection}
            t={t}
          />
        );
      case 'orders':
        console.log('Rendering OrdersManagement component');
        return <OrdersManagement t={t} />;
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
             
             {/* Statut des notifications admin - uniquement sur la page Orders */}
             {currentSection === 'orders' && <AdminNotificationStatus />}
    </div>
  );
};

export default App;
