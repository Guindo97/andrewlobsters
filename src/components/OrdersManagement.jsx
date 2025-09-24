import React, { useState, useEffect } from 'react';
import { useOrders } from '../hooks/useOrders';
import { testSupabaseConnection } from '../lib/supabase';

const OrdersManagement = ({ t }) => {
  console.log('OrdersManagement component loaded');
  const { 
    orders, 
    loading, 
    error, 
    loadOrders, 
    updateOrderStatus, 
    deleteOrder, 
    getStats 
  } = useOrders();
  
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(true);
  const [passwordError, setPasswordError] = useState('');

  // Fonction d'authentification
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'andrew2025') {
      setIsAuthenticated(true);
      setShowPasswordForm(false);
      setPasswordError('');
    } else {
      setPasswordError(t.orders.wrongPassword);
    }
  };

  // Test de connexion Supabase au chargement
  useEffect(() => {
    testSupabaseConnection();
  }, []);

  // Les commandes sont maintenant chargées automatiquement par le hook useOrders

  // Filtrer les commandes
  useEffect(() => {
    let filtered = orders;

    // Filtre par recherche (nom, email, téléphone)
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.phone.includes(searchTerm)
      );
    }

    // Filtre par statut
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    // Filtre par date
    if (dateFilter !== 'all') {
      const today = new Date();
      const orderDate = new Date(order.created_at);
      
      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(order => 
            new Date(order.created_at).toDateString() === today.toDateString()
          );
          break;
        case 'week':
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(order => new Date(order.created_at) >= weekAgo);
          break;
        case 'month':
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(order => new Date(order.created_at) >= monthAgo);
          break;
      }
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter, dateFilter]);

  // État pour les statistiques
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    todayOrders: 0,
    todayRevenue: 0,
    statusCounts: {}
  });

  // Charger les statistiques
  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsData = await getStats();
        setStats(statsData);
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    };
    
    if (isAuthenticated) {
      loadStats();
    }
  }, [isAuthenticated, getStats]);

  // Fonction pour envoyer une notification SMS
  const sendSMSNotification = (order, newStatus) => {
    const smsMessages = {
      pending: t.orders.notifications.sms.pending,
      confirmed: t.orders.notifications.sms.confirmed,
      preparing: t.orders.notifications.sms.preparing,
      ready: t.orders.notifications.sms.ready,
      delivered: t.orders.notifications.sms.delivered,
      cancelled: t.orders.notifications.sms.cancelled
    };

    const smsMessage = smsMessages[newStatus];
    if (smsMessage) {
      const message = smsMessage.replace('{orderId}', order.id);
      const phoneNumber = (order.customerInfo?.phone || '').replace(/\D/g, ''); // Nettoyer le numéro
      
      // Copier le message dans le presse-papiers
      navigator.clipboard.writeText(message).then(() => {
        console.log('Message SMS copié dans le presse-papiers');
      }).catch(err => {
        console.error('Erreur lors de la copie:', err);
      });
      
      // Créer le lien SMS
      const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
      
      // Ouvrir l'application SMS
      window.open(smsLink);
      
      // Afficher les instructions avec options
      const useWhatsApp = window.confirm(
        `📱 CHOISISSEZ VOTRE MÉTHODE D'ENVOI:\n\n` +
        `✅ OUI = WhatsApp (plus fiable)\n` +
        `❌ NON = SMS classique\n\n` +
        `Numéro: ${phoneNumber}\n` +
        `Message: "${message}"`
      );
      
      if (useWhatsApp) {
        // Utiliser WhatsApp Web
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
        alert(`📱 WhatsApp ouvert!\n\n1. Vérifiez que le numéro est correct: ${phoneNumber}\n2. Le message est pré-rempli\n3. Cliquez sur "Envoyer" dans WhatsApp\n\nMessage: "${message}"`);
      } else {
        // Instructions pour SMS
        alert(`📱 INSTRUCTIONS POUR ENVOYER LE SMS:\n\n1. L'application SMS s'ouvre avec le message pré-rempli\n2. Le message est aussi copié dans votre presse-papiers\n3. Vérifiez que le numéro est correct: ${phoneNumber}\n4. Cliquez sur "Envoyer" dans l'application SMS\n\nMessage: "${message}"`);
      }
      
      return true;
    }
    return false;
  };

  // Fonction pour envoyer une notification par email
  const sendEmailNotification = (order, newStatus) => {
    let statusMessage, emailSubject, emailBody;
    
    if (newStatus === 'ready') {
      statusMessage = t.orders.notifications.sms.readyEmailBody;
      emailSubject = t.orders.notifications.sms.readyEmail;
      emailBody = `
${t.orders.notifications.greeting} ${order.customerInfo.name},

${statusMessage}

${t.orders.notifications.orderNumber}: ${order.id}
${t.orders.notifications.currentStatus}: ${newStatus.toUpperCase()}

${t.orders.notifications.thankYou}

${t.orders.notifications.contactInfo}

Andrew's Lobsters
1206 Pabineau Falls Road, Bathurst, NB
Phone: (506) 544-1592
Email: andrewslobster@gmail.com
      `.trim();
    } else {
      const statusMessages = {
        pending: t.orders.notifications.pending,
        confirmed: t.orders.notifications.confirmed,
        preparing: t.orders.notifications.preparing,
        delivered: t.orders.notifications.delivered,
        cancelled: t.orders.notifications.cancelled
      };
      
      statusMessage = statusMessages[newStatus] || 'Status updated';
      emailSubject = t.orders.notifications.subject;
      emailBody = `
${t.orders.notifications.greeting} ${order.customerInfo?.name || 'Client'},

${t.orders.notifications.orderUpdate}

${t.orders.notifications.orderNumber}: ${order.id}
${t.orders.notifications.currentStatus}: ${newStatus.toUpperCase()}

${statusMessage}

${t.orders.notifications.thankYou}

${t.orders.notifications.contactInfo}

Andrew's Lobsters
1206 Pabineau Falls Road, Bathurst, NB
Phone: (506) 544-1592
Email: andrewslobster@gmail.com
      `.trim();
    }

    // Créer le lien mailto
    const mailtoLink = `mailto:${order.customerInfo?.email || 'client@example.com'}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    
    // Ouvrir le client email par défaut
    window.open(mailtoLink);
    
    return true;
  };

  // Fonction principale pour envoyer les notifications
  const sendStatusNotification = (order, newStatus) => {
    // Pour TOUS les statuts, envoyer SMS + Email
    const shouldSend = window.confirm(
      `Voulez-vous envoyer une notification SMS ET Email à ${order.customerInfo?.name || 'Client'}?\n\n📱 SMS: ${order.customerInfo?.phone || 'N/A'}\n📧 Email: ${order.customerInfo?.email || 'N/A'}\n\nStatut: ${newStatus.toUpperCase()}\n\nCela ouvrira votre application SMS et votre client email.`
    );
    
    if (shouldSend) {
      // Envoyer SMS
      const smsSent = sendSMSNotification(order, newStatus);
      
      // Envoyer Email
      const emailSent = sendEmailNotification(order, newStatus);
      
      // Confirmation
      if (smsSent && emailSent) {
        alert(t.orders.notifications.sms.bothSent);
      } else if (smsSent) {
        alert(t.orders.notifications.sms.smsSent.replace('{phone}', order.customerInfo.phone));
      } else if (emailSent) {
        alert(t.orders.notifications.sms.emailSent.replace('{email}', order.customerInfo.email));
      }
    }
  };

  // Mettre à jour le statut d'une commande (maintenant géré par le hook)
  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      console.log('✅ Statut mis à jour avec succès');
    } catch (error) {
      console.error('❌ Erreur lors de la mise à jour du statut:', error);
      alert('Erreur lors de la mise à jour du statut');
    }
  };

  // Supprimer une commande (maintenant géré par le hook)
  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      try {
        await deleteOrder(orderId);
        console.log('✅ Commande supprimée avec succès');
      } catch (error) {
        console.error('❌ Erreur lors de la suppression:', error);
        alert('Erreur lors de la suppression de la commande');
      }
    }
  };

  // Générer une facture PDF (simulation)
  const generateInvoice = (order) => {
    const invoiceContent = `
FACTURE - ANDREW'S LOBSTERS
================================

Client: ${order.customerInfo?.name || 'N/A'}
Email: ${order.customerInfo?.email || 'N/A'}
Téléphone: ${order.customerInfo?.phone || 'N/A'}
Adresse: ${order.customerInfo?.address || 'N/A'}

Commande #${order.id}
Date: ${new Date(order.created_at).toLocaleDateString('fr-CA')}
Statut: ${order.status}

DÉTAILS DE LA COMMANDE:
----------------------
${order.items.map(item => 
  `${item.name} x${item.quantity} - $${item.price}/lb = $${((item.price || 0) * (item.quantity || 0)).toFixed(2)}`
).join('\n')}

SOUS-TOTAL: $${(order.subtotal || 0).toFixed(2)}
FRAIS DE LIVRAISON: $${(order.deliveryFee || 0).toFixed(2)}
TOTAL: $${(order.total || 0).toFixed(2)}

Mode de livraison: ${order.deliveryOption === 'pickup' ? 'Ramassage' : 'Livraison'}

Merci pour votre commande!
    `;

    // Créer et télécharger le fichier
    const blob = new Blob([invoiceContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `facture-${order.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Formater la date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-orange-100 text-orange-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Afficher le formulaire de mot de passe si non authentifié
  if (!isAuthenticated) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-lock text-red-600 text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t.orders.passwordRequired}
            </h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.orders.enterPassword}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Entrez le mot de passe..."
                required
              />
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              {t.orders.login}
            </button>
          </form>

        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
            {t.orders.title}
          </h1>
          <p className="text-xl text-gray-600">
            {t.orders.subtitle}
          </p>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <i className="fas fa-shopping-cart text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t.orders.totalOrders}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <i className="fas fa-dollar-sign text-green-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t.orders.totalRevenue}</p>
                <p className="text-2xl font-bold text-gray-900">${(stats.totalRevenue || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <i className="fas fa-calendar-day text-yellow-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t.orders.todayOrders}</p>
                <p className="text-2xl font-bold text-gray-900">{stats.todayOrders}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <i className="fas fa-chart-line text-purple-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{t.orders.todayRevenue}</p>
                <p className="text-2xl font-bold text-gray-900">${(stats.todayRevenue || 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.orders.searchPlaceholder}</label>
              <input
                type="text"
                placeholder={t.orders.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.orders.allStatuses}</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t.orders.allStatuses}</option>
                <option value="pending">{t.orders.pending}</option>
                <option value="confirmed">{t.orders.confirmed}</option>
                <option value="preparing">{t.orders.preparing}</option>
                <option value="ready">{t.orders.ready}</option>
                <option value="delivered">{t.orders.delivered}</option>
                <option value="cancelled">{t.orders.cancelled}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t.orders.allPeriods}</label>
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">{t.orders.allPeriods}</option>
                <option value="today">{t.orders.today}</option>
                <option value="week">{t.orders.thisWeek}</option>
                <option value="month">{t.orders.thisMonth}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Liste des commandes */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Commandes ({filteredOrders.length})
            </h2>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
              <p className="text-xl text-gray-500">Aucune commande trouvée</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Commande
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{order.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items.length} article(s)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customerInfo?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerInfo?.email || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.customerInfo?.phone || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(order.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${(order.total || 0).toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Voir détails"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button
                            onClick={() => generateInvoice(order)}
                            className="text-green-600 hover:text-green-900"
                            title="Générer facture"
                          >
                            <i className="fas fa-file-pdf"></i>
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Supprimer"
                          >
                            <i className="fas fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Modal de détails de commande */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    Commande #{selectedOrder.id}
                  </h3>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <i className="fas fa-times text-xl"></i>
                  </button>
                </div>

                {/* Informations client */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Informations Client</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p><strong>Nom:</strong> {selectedOrder.customerInfo?.name || 'N/A'}</p>
                    <p><strong>Email:</strong> {selectedOrder.customerInfo?.email || 'N/A'}</p>
                    <p><strong>Téléphone:</strong> {selectedOrder.customerInfo?.phone || 'N/A'}</p>
                    <p><strong>Adresse:</strong> {selectedOrder.customerInfo?.address || 'N/A'}</p>
                  </div>
                </div>

                {/* Articles commandés */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Articles Commandés</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 rounded-lg p-3">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-gray-500 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-medium">${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total et statut */}
                <div className="mb-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span>Sous-total:</span>
                      <span>${(selectedOrder.subtotal || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Frais de livraison:</span>
                      <span>${(selectedOrder.deliveryFee || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Total:</span>
                      <span>${(selectedOrder.total || 0).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      handleUpdateOrderStatus(selectedOrder.id, e.target.value);
                      setSelectedOrder({...selectedOrder, status: e.target.value});
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pending">{t.orders.pending}</option>
                    <option value="confirmed">{t.orders.confirmed}</option>
                    <option value="preparing">{t.orders.preparing}</option>
                    <option value="ready">{t.orders.ready}</option>
                    <option value="delivered">{t.orders.delivered}</option>
                    <option value="cancelled">{t.orders.cancelled}</option>
                  </select>
                  
                  <button
                    onClick={() => {
                      const shouldSend = window.confirm(
                        `Voulez-vous envoyer une notification à ${selectedOrder.customerInfo?.email || 'N/A'}?\n\nCela ouvrira votre client email avec le message pré-rempli.`
                      );
                      if (shouldSend) {
                        sendStatusNotification(selectedOrder, selectedOrder.status);
                      }
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <i className="fas fa-envelope mr-2"></i>
                    Envoyer Notification
                  </button>
                  
                  <button
                    onClick={() => generateInvoice(selectedOrder)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    <i className="fas fa-file-pdf mr-2"></i>
                    {t.orders.generateInvoice}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OrdersManagement;
