// Service pour les notifications admin (Andrew)
export const adminNotificationsService = {
  // Configuration admin
  adminEmail: 'andrewslobster@gmail.com',
  adminPhone: '(506) 655-5599', // Numéro d'Andrew pour SMS
  
  // Envoyer notification popup à Andrew
  async sendPopupNotification(order) {
    try {
      // Créer le contenu de la notification
      const notificationContent = `
🦞 NEW ORDER RECEIVED!

Order #${order.order_number}
Customer: ${order.customer_info?.name || 'N/A'}
Total: $${(order.total || 0).toFixed(2)}

Items:
${order.items?.map(item => `- ${item.name} x${item.quantity}`).join('\n') || 'No items'}

${order.delivery_option === 'pickup' ? '📦 Pickup' : '🚚 Delivery'}

Click to see full details.
      `.trim()

      // Afficher la notification popup
      if (Notification.permission === 'granted') {
        new Notification('🦞 New Order - Andrew\'s Lobsters', {
          body: notificationContent,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          tag: `order-${order.id}`,
          requireInteraction: true,
          silent: false
        })
        
        console.log('✅ Popup notification sent to Andrew')
        return { success: true, method: 'popup' }
      } else {
        console.log('⚠️ Notification permission not granted')
        return { success: false, method: 'popup', reason: 'permission_denied' }
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la notification popup:', error)
      throw error
    }
  },

  // Envoyer notification email à Andrew
  async sendEmailNotification(order) {
    try {
      // Créer le contenu de l'email
      const subject = `🦞 NEW ORDER #${order.order_number} - ${order.customer_info?.name || 'Customer'}`
      
      const emailBody = `
NEW ORDER RECEIVED!

================================

📋 ORDER DETAILS:
Order: #${order.order_number}
Date: ${new Date(order.created_at).toLocaleString('en-CA')}
Status: ${order.status}

👤 CUSTOMER INFORMATION:
Name: ${order.customer_info?.name || 'N/A'}
Email: ${order.customer_info?.email || 'N/A'}
Phone: ${order.customer_info?.phone || 'N/A'}
Address: ${order.customer_info?.address || 'N/A'}

🛒 ORDERED ITEMS:
${order.items?.map(item => 
  `- ${item.name} x${item.quantity} - $${(item.price || 0).toFixed(2)}/lb = $${((item.price || 0) * (item.quantity || 0)).toFixed(2)}`
).join('\n') || 'No items'}

💰 TOTAL:
Subtotal: $${(order.subtotal || 0).toFixed(2)}
Delivery Fee: $${(order.delivery_fee || 0).toFixed(2)}
TOTAL: $${(order.total || 0).toFixed(2)}

🚚 DELIVERY:
Mode: ${order.delivery_option === 'pickup' ? 'Pickup' : 'Home Delivery'}

================================

🔗 ORDER MANAGEMENT:
Log into your dashboard to manage this order:
https://votre-site.vercel.app (replace with your actual URL)

📱 NOTIFICATIONS:
The customer has been automatically notified of their order receipt.

Thank you for using Andrew's Lobsters Management System!
      `.trim()

      // Créer le lien mailto
      const encodedSubject = encodeURIComponent(subject)
      const encodedBody = encodeURIComponent(emailBody)
      const mailtoLink = `mailto:${this.adminEmail}?subject=${encodedSubject}&body=${encodedBody}`
      
      // Ouvrir le client email par défaut
      window.open(mailtoLink, '_blank')
      
      console.log('✅ Email notification sent to Andrew')
      return { success: true, method: 'email' }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email à Andrew:', error)
      throw error
    }
  },

  // Demander la permission pour les notifications
  async requestNotificationPermission() {
    try {
      if ('Notification' in window) {
        const permission = await Notification.requestPermission()
        console.log('Permission de notification:', permission)
        return permission === 'granted'
      } else {
        console.log('Notifications non supportées par ce navigateur')
        return false
      }
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error)
      return false
    }
  },

  // Envoyer toutes les notifications à Andrew
  async notifyAdmin(order) {
    try {
      console.log('🔔 Sending notifications to Andrew for order:', order.order_number)
      
      const results = []
      
      // 1. Demander la permission pour les notifications (si pas déjà accordée)
      if (Notification.permission === 'default') {
        await this.requestNotificationPermission()
      }
      
      // 2. Envoyer notification popup
      try {
        const popupResult = await this.sendPopupNotification(order)
        results.push(popupResult)
      } catch (error) {
        console.warn('Erreur notification popup (non bloquante):', error)
        results.push({ success: false, method: 'popup', error: error.message })
      }
      
      // 3. Envoyer email
      try {
        const emailResult = await this.sendEmailNotification(order)
        results.push(emailResult)
      } catch (error) {
        console.warn('Erreur email (non bloquante):', error)
        results.push({ success: false, method: 'email', error: error.message })
      }
      
      // 4. Enregistrer dans les logs
      console.log('📊 Résultats des notifications admin:', results)
      
      return {
        success: true,
        notifications: results,
        message: 'Notifications sent to Andrew'
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi des notifications admin:', error)
      throw error
    }
  },

  // Vérifier si les notifications sont supportées
  isNotificationSupported() {
    return 'Notification' in window
  },

  // Obtenir le statut des permissions
  getNotificationPermission() {
    if ('Notification' in window) {
      return Notification.permission
    }
    return 'unsupported'
  }
}
