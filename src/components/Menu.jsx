import React, { useState } from 'react';

const Menu = ({ addToCart, t }) => {
  const [quantities, setQuantities] = useState({
    cooked: 1,
    live: 1,
    scallops: 1,
    barClams: 1
  });

  const products = [
    {
      id: 'cooked',
      name: t.menu.cookedLobster,
      price: 12,
      description: t.menu.cookedDesc,
      image: '🦞'
    },
    {
      id: 'live',
      name: t.menu.liveLobster,
      price: 10,
      description: t.menu.liveDesc,
      image: '🦞'
    },
    {
      id: 'scallops',
      name: 'Scallops',
      price: 25,
      description: 'Fresh scallops per bag',
      image: '🐚'
    },
    {
      id: 'barClams',
      name: 'Bar Clams',
      price: 20,
      description: 'Fresh bar clams per jar',
      image: '🦪'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: quantities[product.id]
    });
    setQuantities(prev => ({ ...prev, [product.id]: 1 }));
  };

  return (
    <section className="py-20 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
          {t.menu.title}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transform transition-all">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">{product.image}</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-3xl font-bold text-red-600 mb-4">
                  ${product.price}{product.id === 'scallops' ? '/bag' : product.id === 'barClams' ? '/jar' : '/lb'}
                </p>
                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <label className="text-gray-700">{t.menu.quantity}:</label>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setQuantities(prev => ({
                        ...prev,
                        [product.id]: Math.max(1, prev[product.id] - 1)
                      }))}
                      className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">
                      {quantities[product.id]}
                    </span>
                    <button
                      onClick={() => setQuantities(prev => ({
                        ...prev,
                        [product.id]: prev[product.id] + 1
                      }))}
                      className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  className="lobster-red text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transform transition-all shadow-lg"
                >
                  {t.menu.addToCart}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">
            {t.delivery.title}
          </h3>
          <div className="space-y-2 text-center">
            <p className="text-gray-700">{t.delivery.available}</p>
            <p className="text-gray-700">{t.delivery.fee}</p>
            <p className="text-gray-700">{t.delivery.time}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
