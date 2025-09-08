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
    <section className="py-20 relative overflow-hidden" style={{ backgroundImage: 'url(/images/menu.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-red-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-yellow-200 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-green-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full text-sm font-semibold mb-6 border border-white/30">
            Ocean Variety in Our Store
          </div>
          <div className="overflow-hidden">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-2xl transform -translate-y-full opacity-0 animate-whirlwind-in">
              {t.menu.title}
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="text-2xl text-white/90 mb-6 font-semibold drop-shadow-lg transform -translate-y-full opacity-0 animate-whirlwind-in-delayed">
              The Wonders of Ocean in Your Plate
            </p>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-white/60 to-white/30 mx-auto rounded-full transform scale-x-0 animate-scale-in"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="group bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden hover:scale-105 hover:shadow-3xl transform transition-all duration-500 border border-white/30 hover:border-white/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image Container */}
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-red-100 flex items-center justify-center overflow-hidden">
                {product.id === 'lobster' ? (
                  <img 
                    src="/images/lobster.jpg" 
                    alt={product.name}
                    className="w-72 h-72 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                ) : product.id === 'scallops' ? (
                  <img 
                    src="/images/scallops.jpg" 
                    alt={product.name}
                    className="w-72 h-72 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                ) : product.id === 'salmon' ? (
                  <img 
                    src="/images/salmon.jpg" 
                    alt={product.name}
                    className="w-72 h-72 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                ) : product.id === 'barClams' ? (
                  <img 
                    src="/images/clamsjar.jpg" 
                    alt={product.name}
                    className="w-72 h-72 object-contain group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-500">
                    {product.image}
                  </div>
                )}
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>

              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {product.name}
                </h3>
                
                <div className="mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                    ${product.price}
                  </span>
                  <span className="text-lg text-gray-500 ml-1">
                    {product.id === 'barClams' ? '/jar' : product.id === 'salmon' ? '/10lb' : '/lb'}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {product.description}
                </p>
                
                {/* Quantity Selector */}
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <label className="text-gray-700 font-medium">{t.menu.quantity}:</label>
                  <div className="flex items-center space-x-3 bg-gray-100 rounded-full p-1">
                    <button
                      onClick={() => setQuantities(prev => ({
                        ...prev,
                        [product.id]: Math.max(0, prev[product.id] - 1)
                      }))}
                      className="w-8 h-8 rounded-full bg-white shadow-md hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-all duration-200 font-bold"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-bold text-lg text-gray-800">
                      {quantities[product.id]}
                    </span>
                    <button
                      onClick={() => setQuantities(prev => ({
                        ...prev,
                        [product.id]: prev[product.id] + 1
                      }))}
                      className="w-8 h-8 rounded-full bg-white shadow-md hover:bg-green-50 hover:text-green-600 flex items-center justify-center transition-all duration-200 font-bold"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-6 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center">
                    <i className="fas fa-shopping-cart mr-2"></i>
                    {t.menu.addToCart}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Info Card */}
        <div className="mt-20 relative">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-white/20">
            <div className="text-center text-white">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 border border-white/30">
                <i className="fas fa-truck text-2xl"></i>
              </div>
              <h3 className="text-3xl font-bold mb-6 drop-shadow-lg">
                {t.delivery.title}
              </h3>
              <div className="space-y-3 text-lg">
                <p className="flex items-center justify-center text-white/90">
                  <i className="fas fa-check-circle mr-3 text-green-300"></i>
                  {t.delivery.available}
                </p>
                <p className="flex items-center justify-center text-white/90">
                  <i className="fas fa-dollar-sign mr-3 text-yellow-300"></i>
                  {t.delivery.fee}
                </p>
                <p className="flex items-center justify-center text-white/90">
                  <i className="fas fa-clock mr-3 text-orange-300"></i>
                  {t.delivery.time}
                </p>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-4 right-4 w-20 h-20 border-2 border-white/20 rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-12 h-12 border-2 border-white/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Menu;
