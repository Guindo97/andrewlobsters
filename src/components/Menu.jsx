import React, { useState } from 'react';

const Menu = ({ addToCart, t }) => {
  const [quantities, setQuantities] = useState({
    lobster: 0,
    jumbo: 0,
    jumboLive: 0,
    liveLobster: 0,
    scallops: 0,
    barClams: 0,
    salmon: 0
  });

  const products = [
    {
      id: 'lobster',
      name: t.menu.lobster,
      price: 15.50,
      description: t.menu.lobsterDesc,
      image: '🦞'
    },
    {
      id: 'jumbo',
      name: t.menu.jumbo,
      price: 16.50,
      description: t.menu.jumboDesc,
      image: '🦞'
    },
    {
      id: 'jumboLive',
      name: t.menu.jumboLive,
      price: 14.50,
      description: t.menu.jumboLiveDesc,
      image: '🦞'
    },
    {
      id: 'liveLobster',
      name: t.menu.liveLobster,
      price: 13.50,
      description: t.menu.liveLobsterDesc,
      image: '🦞'
    },
    {
      id: 'scallops',
      name: t.menu.scallops,
      price: 25,
      description: t.menu.scallopsDesc,
      image: '🐚'
    },
    {
      id: 'barClams',
      name: t.menu.barClams,
      price: 20,
      description: t.menu.barClamsDesc,
      image: '🦪'
    },
    {
      id: 'salmon',
      name: t.menu.salmon,
      price: 110,
      description: t.menu.salmonDesc,
      image: '🐟'
    }
  ];

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: quantities[product.id]
    });
    setQuantities(prev => ({ ...prev, [product.id]: 0 }));
  };

  return (
    <section className="py-20 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-12">
          {t.menu.title}
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:scale-105 transform transition-all">
              <div className="p-8 text-center">
                <div className="text-6xl mb-4">{product.image}</div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-3xl font-bold text-red-600 mb-4">
                  ${product.price}{product.id === 'barClams' ? '/jar' : product.id === 'salmon' ? '/10lb' : '/lb'}
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
                        [product.id]: Math.max(0, prev[product.id] - 1)
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
