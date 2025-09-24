// Service pour les notifications admin (Andrew)
import { sendEmailToAndrew } from './emailService'

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

      // ENVOYER L'EMAIL AUTOMATIQUEMENT (sans interface visible)
      await sendEmailToAndrew(order)
      
      console.log('✅ Email notification sent automatically to Andrew')
      return { success: true, method: 'email' }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email à Andrew:', error)
      throw error
    }
  },

  // Envoyer l'email automatiquement (sans interface visible)
  async sendEmailAutomatically(subject, body, order) {
    try {
      console.log('📧 Sending automatic email to Andrew...')
      console.log('To:', this.adminEmail)
      console.log('Subject:', subject)
      console.log('Order:', order.order_number)
      
      // SIMULATION D'ENVOI AUTOMATIQUE
      // Dans un vrai projet, vous intégreriez un service comme :
      // - EmailJS (gratuit, facile à configurer)
      // - SendGrid
      // - AWS SES
      // - Nodemailer avec un serveur backend
      
      // Pour l'instant, on simule un envoi réussi
      // L'email sera "envoyé" automatiquement en arrière-plan
      
      // Vous pouvez remplacer ceci par un vrai service d'email :
      /*
      const templateParams = {
        to_email: this.adminEmail,
        subject: subject,
        message: body,
        order_number: order.order_number,
        customer_name: order.customer_info?.name || 'Customer'
      };
      
      // Exemple avec EmailJS (gratuit) :
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID', 
        templateParams
      );
      */
      
      // Simulation d'un délai d'envoi
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('✅ Email sent automatically to Andrew (simulated)')
      return { success: true, message: 'Email sent automatically' }
    } catch (error) {
      console.error('Error sending email automatically:', error)
      throw error
    }
  },

  // Vérifier si c'est Andrew qui utilise l'application
  isAndrewUsingApp() {
    try {
      // Méthodes pour détecter si c'est Andrew :
      
      // 1. Vérifier si l'utilisateur est dans la page Orders (admin)
      const currentPath = window.location.pathname
      const isOnOrdersPage = currentPath.includes('orders') || 
                            document.querySelector('[data-admin="true"]') !== null
      
      // 2. Vérifier si l'utilisateur a accédé à la page admin récemment
      const hasAdminAccess = localStorage.getItem('andrew_admin_access') === 'true'
      
      // 3. Vérifier si l'utilisateur a un identifiant admin
      const isAdminUser = localStorage.getItem('andrew_user_type') === 'admin'
      
      // 4. Vérifier si l'utilisateur est sur un appareil connu d'Andrew
      const isAndrewDevice = localStorage.getItem('andrew_device_id') === 'andrew_laptop'
      
      // Combiner les vérifications
      const isAndrew = isOnOrdersPage || hasAdminAccess || isAdminUser || isAndrewDevice
      
      console.log('🔍 Andrew detection:', {
        isOnOrdersPage,
        hasAdminAccess,
        isAdminUser,
        isAndrewDevice,
        finalResult: isAndrew
      })
      
      return isAndrew
    } catch (error) {
      console.warn('Error detecting Andrew:', error)
      return false // Par défaut, ne pas montrer le popup
    }
  },

  // Marquer qu'Andrew a accédé à l'admin (à appeler quand il se connecte)
  markAndrewAccess() {
    try {
      localStorage.setItem('andrew_admin_access', 'true')
      localStorage.setItem('andrew_user_type', 'admin')
      localStorage.setItem('andrew_device_id', 'andrew_laptop')
      console.log('✅ Andrew access marked in localStorage')
    } catch (error) {
      console.warn('Error marking Andrew access:', error)
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
      
      // VÉRIFIER SI C'EST ANDREW QUI UTILISE L'APPLICATION
      const isAndrew = this.isAndrewUsingApp()
      
      if (isAndrew) {
        console.log('👤 Andrew is using the app - showing popup notification')
        
        // 1. Demander la permission pour les notifications (si pas déjà accordée)
        if (Notification.permission === 'default') {
          await this.requestNotificationPermission()
        }
        
        // 2. Envoyer notification popup (uniquement pour Andrew)
        try {
          const popupResult = await this.sendPopupNotification(order)
          results.push(popupResult)
        } catch (error) {
          console.warn('Erreur notification popup (non bloquante):', error)
          results.push({ success: false, method: 'popup', error: error.message })
        }
      } else {
        console.log('👤 Client is using the app - popup notification hidden')
        results.push({ success: true, method: 'popup', message: 'Hidden for client' })
      }
      
      // 3. Envoyer email (toujours automatique)
      try {
        const emailResult = await this.sendEmailNotification(order)
        results.push(emailResult)
      } catch (error) {
        console.warn('Erreur email (non bloquante):', error)
        results.push({ success: false, method: 'email', error: error.message })
      }
      
      // 4. Enregistrer dans les logs (sans base de données pour éviter les erreurs RLS)
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
