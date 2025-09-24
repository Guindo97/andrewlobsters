# 📧 Configuration EmailJS pour les Notifications Automatiques

## 🎯 Objectif
Configurer EmailJS pour envoyer automatiquement des emails à Andrew quand un client passe une commande, **sans que le client voie l'interface email**.

## 🚀 Étapes de Configuration

### 1. Créer un compte EmailJS (GRATUIT)
- Allez sur [https://www.emailjs.com/](https://www.emailjs.com/)
- Cliquez sur "Sign Up" et créez un compte gratuit
- Confirmez votre email

### 2. Créer un Service Email
- Dans le dashboard EmailJS, allez dans "Email Services"
- Cliquez sur "Add New Service"
- Choisissez "Gmail" (ou votre service email préféré)
- Connectez votre compte Gmail d'Andrew : `andrewslobster@gmail.com`
- Notez le **Service ID** généré

### 3. Créer un Template Email
- Allez dans "Email Templates"
- Cliquez sur "Create New Template"
- Utilisez ce template :

```
Subject: 🦞 NEW ORDER #{{order_number}} - {{customer_name}}

Body:
NEW ORDER RECEIVED!

===============================

📋 ORDER DETAILS:
Order: #{{order_number}}
Date: {{order_date}}
Status: {{order_status}}

👤 CUSTOMER INFORMATION:
Name: {{customer_name}}
Email: {{customer_email}}
Phone: {{customer_phone}}
Address: {{customer_address}}

🛒 ORDERED ITEMS:
{{order_items}}

💰 TOTAL:
Subtotal: ${{order_subtotal}}
Delivery Fee: ${{order_delivery_fee}}
TOTAL: ${{order_total}}

🚚 DELIVERY:
Mode: {{delivery_mode}}

===============================

🔗 ORDER MANAGEMENT:
Log into your dashboard to manage this order:
https://votre-site.vercel.app

📱 NOTIFICATIONS:
The customer has been automatically notified of their order receipt.

Thank you for using Andrew's Lobsters Management System!
```

- Notez le **Template ID** généré

### 4. Obtenir la Clé Publique
- Allez dans "Account" > "General"
- Copiez votre **Public Key**

### 5. Configurer le Code
- Ouvrez le fichier `src/services/emailService.js`
- Remplacez les valeurs :

```javascript
const EMAILJS_CONFIG = {
  SERVICE_ID: 'votre_service_id_ici',     // Remplacez par votre Service ID
  TEMPLATE_ID: 'votre_template_id_ici',   // Remplacez par votre Template ID
  PUBLIC_KEY: 'votre_public_key_ici'      // Remplacez par votre Public Key
};
```

### 6. Installer EmailJS
```bash
npm install @emailjs/browser
```

## ✅ Test
1. Passez une commande de test
2. Vérifiez que l'email arrive automatiquement dans la boîte d'Andrew
3. Vérifiez que le client ne voit pas l'interface email

## 🔧 Fonctionnement

### Pour le Client :
- ✅ Passe sa commande normalement
- ✅ Reçoit sa confirmation
- ❌ **NE VOIT PAS** l'email envoyé à Andrew

### Pour Andrew :
- ✅ Reçoit un email automatique avec tous les détails
- ✅ Reçoit un popup notification (si connecté à l'admin)
- ✅ Email envoyé en arrière-plan, invisible pour le client

## 🆘 Dépannage

### Si l'email ne s'envoie pas :
1. Vérifiez que les clés EmailJS sont correctes
2. Vérifiez que le service Gmail est bien connecté
3. Regardez la console pour les erreurs
4. Testez avec la simulation d'abord

### Si vous voyez des erreurs :
- Vérifiez que `@emailjs/browser` est installé
- Vérifiez que les clés sont bien remplacées
- Redémarrez le serveur de développement

## 🎉 Résultat Final

Une fois configuré, **chaque commande client déclenche automatiquement** :
1. 📧 **Email automatique** à Andrew (invisible pour le client)
2. 🔔 **Popup notification** à Andrew (si connecté à l'admin)
3. 💾 **Sauvegarde** dans la base de données Supabase

**Le client ne voit rien de tout cela !** 🎯

