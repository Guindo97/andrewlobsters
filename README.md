# Andrew's Lobsters - Fresh Local Seafood

Une application web React moderne pour Andrew's Lobsters, une entreprise familiale de homards frais à Bathurst, NB.

## 🦞 Fonctionnalités

- **Site multilingue** (Français/Anglais)
- **Menu interactif** avec système de panier
- **Galerie photo** avec upload d'images
- **Formulaire de contact**
- **Système de commande** complet
- **Design responsive** avec Tailwind CSS
- **Interface moderne** avec animations

## 🚀 Installation

1. **Installer les dépendances :**
   ```bash
   npm install
   ```

2. **Lancer le serveur de développement :**
   ```bash
   npm run dev
   ```

3. **Ouvrir dans le navigateur :**
   ```
   http://localhost:5173
   ```

## 📁 Structure du projet

```
andrews-lobsters/
├── public/
│   └── favicon.ico, images…
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Navigation et panier
│   │   ├── Hero.jsx            # Section d'accueil
│   │   ├── About.jsx           # À propos de l'entreprise
│   │   ├── Menu.jsx            # Menu des produits
│   │   ├── Cart.jsx            # Panier et checkout
│   │   ├── Gallery.jsx         # Galerie photo
│   │   └── Contact.jsx         # Formulaire de contact
│   ├── data/
│   │   └── translations.js     # Traductions FR/EN
│   ├── App.jsx                 # Composant principal
│   ├── main.jsx               # Point d'entrée
│   └── index.css              # Styles Tailwind
├── tailwind.config.js         # Configuration Tailwind
├── vite.config.js            # Configuration Vite
└── package.json              # Dépendances
```

## 🛠️ Technologies utilisées

- **React 18** - Framework JavaScript
- **Vite** - Build tool rapide
- **Tailwind CSS** - Framework CSS
- **Font Awesome** - Icônes
- **React Hooks** - Gestion d'état

## 📱 Sections

1. **Accueil** - Présentation et CTA
2. **Menu** - Produits (homard cuit/vivant)
3. **Galerie** - Photos de l'entreprise
4. **Contact** - Formulaire et informations
5. **Panier** - Commande et checkout

## 🎨 Personnalisation

- **Couleurs** : Modifier `tailwind.config.js`
- **Traductions** : Éditer `src/data/translations.js`
- **Styles** : Personnaliser `src/index.css`

## 📞 Informations de contact

- **Adresse** : 1206 Pabineau Falls Road, Bathurst, NB
- **Téléphone** : (506) 655-5599
- **Email** : andrewslobster@gmail.com
- **Heures** : Lundi-Samedi jusqu'à épuisement des stocks

## 🚀 Déploiement

```bash
npm run build
```

Les fichiers de production seront dans le dossier `dist/`.
