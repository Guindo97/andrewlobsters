-- =====================================================
-- SCHÉMA BASE DE DONNÉES ANDREW'S LOBSTERS 
-- =====================================================

-- Table des produits
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  stock INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des clients
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des commandes
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_id INTEGER REFERENCES customers(id),
  customer_info JSONB NOT NULL, -- Info de contact pour cette commande
  items JSONB NOT NULL, -- Articles commandés
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  delivery_option VARCHAR(20) NOT NULL CHECK (delivery_option IN ('pickup', 'delivery')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled')),
  payment_info JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des notifications (pour l'historique)
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  type VARCHAR(20) NOT NULL CHECK (type IN ('email', 'sms')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  content TEXT,
  sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- DONNÉES INITIALES ( PRODUITS ACTUELS)
-- =====================================================

-- Insérer les produits Andrew's Lobsters
INSERT INTO products (name, price, description, image_url, stock) VALUES
('Lobster cooked', 15.50, 'Fresh lobster per pound', '/images/lobster.jpg', 100),
('Live Lobster', 13.50, 'Live lobster per pound', '/images/livelobster.jpg', 50),
('Jumbo cooked', 16.50, 'Jumbo lobster per pound', '/images/jumbocooked.webp', 30),
('Jumbo Live', 14.50, 'Jumbo live lobster per pound', '/images/jumboL.jpeg', 25),
('Scallops', 25.00, 'Fresh scallops per pound', '/images/scallops.jpg', 40),
('Bar Clams', 20.00, 'Fresh bar clams per jar', '/images/clamsjar.jpg', 20),
('Salmon', 110.00, '10lb of fresh salmon', '/images/salmon.jpg', 10)
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- POLITIQUES DE SÉCURITÉ (RLS - Row Level Security)
-- =====================================================

-- Activer RLS sur toutes les tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Politiques pour les produits (lecture publique)
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (true);

-- Politiques pour les commandes (lecture/écriture publique - pour simplifier)
CREATE POLICY "Orders are viewable by everyone" ON orders
  FOR SELECT USING (true);

CREATE POLICY "Orders are insertable by everyone" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders are updatable by everyone" ON orders
  FOR UPDATE USING (true);

-- Politiques pour les clients
CREATE POLICY "Customers are insertable by everyone" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Customers are viewable by everyone" ON customers
  FOR SELECT USING (true);

-- =====================================================
-- FONCTIONS UTILITAIRES
-- =====================================================

-- Fonction pour générer un numéro de commande unique
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TEXT AS $$
BEGIN
  RETURN 'ORD-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(nextval('orders_id_seq')::TEXT, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VUES POUR LES STATISTIQUES (GRATUIT)
-- =====================================================

-- Vue pour les statistiques des commandes
CREATE VIEW order_stats AS
SELECT 
  DATE(created_at) as order_date,
  COUNT(*) as total_orders,
  SUM(total) as total_revenue,
  AVG(total) as average_order_value,
  COUNT(CASE WHEN status = 'delivered' THEN 1 END) as completed_orders
FROM orders
GROUP BY DATE(created_at)
ORDER BY order_date DESC;

-- Vue pour les produits les plus vendus
CREATE VIEW top_products AS
SELECT 
  item->>'name' as product_name,
  SUM((item->>'quantity')::integer) as total_quantity,
  SUM((item->>'price')::decimal * (item->>'quantity')::integer) as total_revenue
FROM orders,
LATERAL jsonb_array_elements(items) AS item
WHERE status != 'cancelled'
GROUP BY item->>'name'
ORDER BY total_quantity DESC;
