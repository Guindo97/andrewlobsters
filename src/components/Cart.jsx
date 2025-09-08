import React, { useState } from 'react';

const Cart = ({ cartItems, setCartItems, updateCartItem, removeFromCart, setCurrentSection, t }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('pickup'); // 'pickup' or 'delivery'
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryOption === 'delivery' ? 5 : 0;
  const grandTotal = total + deliveryFee;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    
    // Créer la commande
    const order = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      customerInfo: { ...customerInfo },
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      subtotal: total,
      deliveryFee: deliveryFee,
      total: grandTotal,
      deliveryOption: deliveryOption,
      status: 'pending'
    };

    // Sauvegarder la commande dans localStorage
    const existingOrders = JSON.parse(localStorage.getItem('andrewsLobstersOrders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('andrewsLobstersOrders', JSON.stringify(existingOrders));

    // Vider le panier
    setCartItems([]);
    setCustomerInfo({ name: '', email: '', phone: '', address: '' });
    setDeliveryOption('pickup');

    console.log('Order placed successfully!');
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl shadow-2xl">
          <div className="text-8xl mb-6 animate-bounce">✅</div>
          <h2 className="text-4xl font-bold text-green-600 mb-4">
            {t.orders.orderSuccess}
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            {t.orders.orderSuccessMessage}
          </p>
          <button
            onClick={() => {
              setOrderPlaced(false);
              setShowCheckout(false);
              setCurrentSection('menu');
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  if (showCheckout) {
    return (
      <section className="py-20 bg-white/90 backdrop-blur-sm min-h-screen">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
            {t.checkout.title}
          </h2>
          
          <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {t.checkout.customerInfo}
              </h3>
              
              {/* Delivery Option Display */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <i className={`fas ${deliveryOption === 'pickup' ? 'fa-store' : 'fa-truck'} text-lg`}></i>
                  <span className="font-semibold">
                    {deliveryOption === 'pickup' ? t.cart.pickup : t.cart.delivery}
                  </span>
                  <span className="text-sm text-gray-600">
                    ({deliveryOption === 'pickup' ? t.cart.pickupDesc : t.cart.deliveryDesc})
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={t.contact.name}
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({...prev, name: e.target.value}))}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  placeholder={t.contact.email}
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({...prev, email: e.target.value}))}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({...prev, phone: e.target.value}))}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                {deliveryOption === 'delivery' && (
                  <input
                    type="text"
                    placeholder="Delivery Address"
                    value={customerInfo.address}
                    onChange={(e) => setCustomerInfo(prev => ({...prev, address: e.target.value}))}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                )}
                {deliveryOption === 'pickup' && (
                  <div className="w-full p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    Pickup at: 1206 Pabineau Falls Road, Bathurst, NB
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {t.checkout.paymentInfo}
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder={t.checkout.cardNumber}
                  value={paymentInfo.cardNumber}
                  onChange={(e) => setPaymentInfo(prev => ({...prev, cardNumber: e.target.value}))}
                  className="w-full p-3 border rounded-lg"
                  required
                />
                <div className="grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder={t.checkout.expiryDate}
                    value={paymentInfo.expiryDate}
                    onChange={(e) => setPaymentInfo(prev => ({...prev, expiryDate: e.target.value}))}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder={t.checkout.cvv}
                    value={paymentInfo.cvv}
                    onChange={(e) => setPaymentInfo(prev => ({...prev, cvv: e.target.value}))}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Name on Card"
                    value={paymentInfo.nameOnCard}
                    onChange={(e) => setPaymentInfo(prev => ({...prev, nameOnCard: e.target.value}))}
                    className="w-full p-3 border rounded-lg"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{deliveryOption === 'delivery' ? t.cart.deliveryFee : t.cart.noDeliveryFee}:</span>
                  <span className={deliveryFee > 0 ? 'text-red-600' : 'text-green-600'}>
                    {deliveryFee > 0 ? `+$${deliveryFee.toFixed(2)}` : '$0.00'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                  <span>Total:</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setShowCheckout(false)}
                className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="flex-1 lobster-red text-white py-3 rounded-lg hover:scale-105 transform transition-all"
              >
                {t.checkout.placeOrder}
              </button>
            </div>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white/90 backdrop-blur-sm min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            Your Order
          </div>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 bg-clip-text text-transparent mb-6">
            {t.cart.title}
          </h2>
          <p className="text-xl text-gray-800 mb-6 font-semibold">
            The Wonders of Ocean in Your Plate
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto rounded-full"></div>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="flex justify-center mb-4">
              <img 
                src="/images/pannier.jpg" 
                alt="Empty Cart"
                className="w-full max-w-md h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
            <p className="text-xl text-gray-600 mb-6">{t.cart.empty} 😢</p>
            <button
              onClick={() => setCurrentSection('menu')}
              className="lobster-red text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transform transition-all"
            >
              View Menu
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Delivery Option Selection */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-blue-900 mb-4">
                {t.cart.deliveryOption}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryOption('pickup')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    deliveryOption === 'pickup'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <i className="fas fa-store text-2xl mb-2"></i>
                    <h4 className="font-semibold">{t.cart.pickup}</h4>
                    <p className="text-sm text-gray-600">{t.cart.pickupDesc}</p>
                    <p className="text-sm text-green-600 font-medium mt-1">{t.cart.noDeliveryFee}</p>
                  </div>
                </button>
                
                <button
                  onClick={() => setDeliveryOption('delivery')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    deliveryOption === 'delivery'
                      ? 'border-red-600 bg-red-50 text-red-900'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <i className="fas fa-truck text-2xl mb-2"></i>
                    <h4 className="font-semibold">{t.cart.delivery}</h4>
                    <p className="text-sm text-gray-600">{t.cart.deliveryDesc}</p>
                    <p className="text-sm text-red-600 font-medium mt-1">+$5.00 {t.cart.deliveryFee}</p>
                  </div>
                </button>
              </div>
            </div>

            {cartItems.map(item => (
              <div key={item.id} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl">{item.image}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-blue-900">{item.name}</h3>
                      <p className="text-gray-600">${item.price}/lb</p>
                    </div>
                  </div>
                  
                  {/* Bouton de corbeille - Repositionné au-dessus du prix */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors"
                    title="Supprimer cet article"
                  >
                    <i className="fas fa-trash text-lg"></i>
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => {
                        if (item.quantity <= 1) {
                          removeFromCart(item.id);
                        } else {
                          updateCartItem(item.id, item.quantity - 1);
                        }
                      }}
                      className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartItem(item.id, item.quantity + 1)}
                      className="bg-gray-200 hover:bg-gray-300 w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="flex justify-between items-center mb-2">
                <span>Subtotal:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span>{deliveryOption === 'delivery' ? t.cart.deliveryFee : t.cart.noDeliveryFee}:</span>
                <span className={deliveryFee > 0 ? 'text-red-600' : 'text-green-600'}>
                  {deliveryFee > 0 ? `+$${deliveryFee.toFixed(2)}` : '$0.00'}
                </span>
              </div>
              <div className="flex justify-between items-center text-xl font-bold border-t pt-2">
                <span>{t.cart.total}:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
            
            <button
              data-checkout-button
              onClick={() => {
                setShowCheckout(true);
                // Scroll vers le formulaire de paiement après un court délai
                setTimeout(() => {
                  const checkoutForm = document.getElementById('checkout-form');
                  if (checkoutForm) {
                    checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }, 100);
              }}
              className="w-full lobster-red text-white py-4 rounded-xl text-xl font-semibold hover:scale-105 transform transition-all"
            >
              {t.cart.checkout}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
