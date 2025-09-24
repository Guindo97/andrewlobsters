import { supabase } from '../lib/supabase'

export const notificationsService = {
  // Envoyer une notification email (GRATUIT - via mailto)
  async sendEmailNotification(customerEmail, subject, content) {
    try {
      // Créer le lien mailto (100% gratuit)
      const encodedSubject = encodeURIComponent(subject)
      const encodedBody = encodeURIComponent(content)
      const mailtoLink = `mailto:${customerEmail}?subject=${encodedSubject}&body=${encodedBody}`
      
      // Ouvrir le client email par défaut
      window.open(mailtoLink, '_blank')
      
      console.log('✅ Email ouvert dans le client par défaut')
      return { success: true, method: 'mailto' }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error)
      throw error
    }
  },

  // Envoyer une notification SMS (GRATUIT - via liens SMS)
  async sendSMSNotification(phoneNumber, message) {
    try {
      // Nettoyer le numéro de téléphone
      const cleanPhone = phoneNumber.replace(/\D/g, '')
      
      // Créer le lien SMS (100% gratuit)
      const smsLink = `sms:${cleanPhone}?body=${encodeURIComponent(message)}`
      
      // Copier le message dans le presse-papiers
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(message)
        console.log('✅ Message copié dans le presse-papiers')
      }
      
      // Ouvrir l'application SMS
      window.open(smsLink)
      
      console.log('✅ SMS ouvert dans l\'application par défaut')
      return { success: true, method: 'sms_link' }
    } catch (error) {
      console.error('Erreur lors de l\'envoi du SMS:', error)
      throw error
    }
  },

  // Envoyer une notification WhatsApp (GRATUIT)
  async sendWhatsAppNotification(phoneNumber, message) {
    try {
      // Nettoyer le numéro de téléphone
      const cleanPhone = phoneNumber.replace(/\D/g, '')
      
      // Créer le lien WhatsApp (100% gratuit)
      const whatsappLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
      
      // Ouvrir WhatsApp Web
      window.open(whatsappLink, '_blank')
      
      console.log('✅ WhatsApp ouvert')
      return { success: true, method: 'whatsapp' }
    } catch (error) {
      console.error('Erreur lors de l\'envoi WhatsApp:', error)
      throw error
    }
  },

  // Enregistrer une notification dans la base de données
  async logNotification(orderId, type, status, content) {
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert([{
          order_id: orderId,
          type,
          status,
          content,
          sent_at: status === 'sent' ? new Date().toISOString() : null,
          created_at: new Date().toISOString()
        }])

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de la notification:', error)
      throw error
    }
  },

  // Générer le contenu des notifications selon le statut
  generateNotificationContent(order, status, language = 'fr') {
    const templates = {
      fr: {
        pending: {
          subject: 'Commande reçue - Andrew\'s Lobsters',
          email: `Bonjour ${order.customer_info.name},

Votre commande #${order.order_number} a été reçue avec succès!

Détails de la commande:
${order.items.map(item => `- ${item.name} x${item.quantity}`).join('\n')}

Total: $${order.total.toFixed(2)}

Nous vous contacterons bientôt pour confirmer votre commande.

Merci pour votre confiance!
Andrew's Lobsters
1206 Pabineau Falls Road, Bathurst, NB
(506) 655-5599`,
          sms: `🦞 Andrew's Lobsters: Votre commande #${order.order_number} a été reçue! Total: $${order.total.toFixed(2)}. Merci!`
        },
        confirmed: {
          subject: 'Commande confirmée - Andrew\'s Lobsters',
          email: `Bonjour ${order.customer_info.name},

Votre commande #${order.order_number} a été confirmée!

Nous préparons vos produits frais. Temps d'attente estimé: 1-2 heures.

Merci pour votre confiance!
Andrew's Lobsters`,
          sms: `🦞 Andrew's Lobsters: Commande #${order.order_number} confirmée! Préparation en cours. Merci!`
        },
        ready: {
          subject: 'Commande prête - Andrew\'s Lobsters',
          email: `Bonjour ${order.customer_info.name},

Votre commande #${order.order_number} est prête!

${order.delivery_option === 'pickup' ? 
  'Vous pouvez venir la récupérer à notre adresse: 1206 Pabineau Falls Road, Bathurst, NB' :
  'Nous vous livrerons bientôt à votre adresse.'
}

Merci pour votre commande!
Andrew's Lobsters`,
          sms: `🦞 Andrew's Lobsters: Commande #${order.order_number} PRÊTE! ${order.delivery_option === 'pickup' ? 'Ramassage possible.' : 'Livraison en cours.'} Merci!`
        },
        delivered: {
          subject: 'Commande livrée - Andrew\'s Lobsters',
          email: `Bonjour ${order.customer_info.name},

Votre commande #${order.order_number} a été livrée avec succès!

Nous espérons que vous apprécierez nos produits frais. N'hésitez pas à nous faire part de vos commentaires!

À bientôt!
Andrew's Lobsters`,
          sms: `🦞 Andrew's Lobsters: Commande #${order.order_number} livrée avec succès! Bon appétit! 🦞`
        }
      }
    }

    return templates[language][status] || templates.fr.pending
  },

  // Envoyer une notification complète (email + SMS)
  async sendOrderNotification(order, newStatus, language = 'fr') {
    try {
      const content = this.generateNotificationContent(order, newStatus, language)
      
      // Envoyer email
      await this.sendEmailNotification(
        order.customer_info.email,
        content.subject,
        content.email
      )
      
      // Envoyer SMS si numéro disponible
      if (order.customer_info.phone) {
        await this.sendSMSNotification(
          order.customer_info.phone,
          content.sms
        )
      }
      
      // Enregistrer dans la base de données
      await this.logNotification(order.id, 'email', 'sent', content.email)
      if (order.customer_info.phone) {
        await this.logNotification(order.id, 'sms', 'sent', content.sms)
      }
      
      return { success: true, notificationsSent: ['email', 'sms'] }
    } catch (error) {
      console.error('Erreur lors de l\'envoi des notifications:', error)
      throw error
    }
  }
}
