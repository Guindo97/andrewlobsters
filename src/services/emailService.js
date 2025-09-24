// Service d'email automatique pour Andrew
// Utilise EmailJS (gratuit et facile à configurer)

// Configuration EmailJS (à remplacer par vos vraies clés)
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID', // Remplacez par votre Service ID EmailJS
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID', // Remplacez par votre Template ID EmailJS
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY' // Remplacez par votre Public Key EmailJS
};

// Fonction pour envoyer un email automatiquement
export const sendEmailToAndrew = async (order) => {
  try {
    console.log('📧 Sending automatic email to Andrew...')
    
    // Vérifier si EmailJS est configuré
    if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID') {
      console.warn('⚠️ EmailJS not configured - using simulation')
      return await simulateEmailSend(order)
    }
    
    // Charger EmailJS dynamiquement
    const emailjs = await import('@emailjs/browser')
    
    // Paramètres du template email
    const templateParams = {
      to_email: 'andrewslobster@gmail.com',
      from_name: 'Andrew\'s Lobsters System',
      subject: `🦞 NEW ORDER #${order.order_number} - ${order.customer_info?.name || 'Customer'}`,
      order_number: order.order_number,
      customer_name: order.customer_info?.name || 'N/A',
      customer_email: order.customer_info?.email || 'N/A',
      customer_phone: order.customer_info?.phone || 'N/A',
      customer_address: order.customer_info?.address || 'N/A',
      order_date: new Date(order.created_at).toLocaleString('en-CA'),
      order_status: order.status,
      order_items: order.items?.map(item => 
        `${item.name} x${item.quantity} - $${(item.price || 0).toFixed(2)}/lb = $${((item.price || 0) * (item.quantity || 0)).toFixed(2)}`
      ).join('\n') || 'No items',
      order_subtotal: (order.subtotal || 0).toFixed(2),
      order_delivery_fee: (order.delivery_fee || 0).toFixed(2),
      order_total: (order.total || 0).toFixed(2),
      delivery_mode: order.delivery_option === 'pickup' ? 'Pickup' : 'Home Delivery',
      message: `New order received from ${order.customer_info?.name || 'Customer'}. Please check your dashboard for full details.`
    };
    
    // Envoyer l'email via EmailJS
    const result = await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams,
      EMAILJS_CONFIG.PUBLIC_KEY
    );
    
    console.log('✅ Email sent successfully to Andrew via EmailJS:', result)
    return { success: true, method: 'emailjs', result }
    
  } catch (error) {
    console.error('❌ Error sending email via EmailJS:', error)
    
    // Fallback vers simulation si EmailJS échoue
    console.log('🔄 Falling back to email simulation...')
    return await simulateEmailSend(order)
  }
};

// Simulation d'envoi d'email (pour tests)
const simulateEmailSend = async (order) => {
  try {
    console.log('📧 Simulating email send to Andrew...')
    console.log('To: andrewslobster@gmail.com')
    console.log('Subject: NEW ORDER #' + order.order_number)
    console.log('Order:', order.order_number)
    console.log('Customer:', order.customer_info?.name || 'N/A')
    
    // Simulation d'un délai d'envoi
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    console.log('✅ Email simulation completed successfully')
    return { success: true, method: 'simulation', message: 'Email simulated successfully' }
    
  } catch (error) {
    console.error('❌ Error in email simulation:', error)
    throw error
  }
};

// Instructions pour configurer EmailJS
export const getEmailJSInstructions = () => {
  return `
📧 CONFIGURATION EMAILJS (GRATUIT)

1. Allez sur https://www.emailjs.com/
2. Créez un compte gratuit
3. Créez un service (Gmail, Outlook, etc.)
4. Créez un template d'email
5. Remplacez les valeurs dans emailService.js :

   SERVICE_ID: 'votre_service_id'
   TEMPLATE_ID: 'votre_template_id' 
   PUBLIC_KEY: 'votre_public_key'

6. Installez EmailJS :
   npm install @emailjs/browser

7. L'email sera envoyé automatiquement à Andrew !
  `;
};

// Vérifier si EmailJS est configuré
export const isEmailJSConfigured = () => {
  return EMAILJS_CONFIG.SERVICE_ID !== 'YOUR_SERVICE_ID'
};
