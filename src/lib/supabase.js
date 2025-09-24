import { createClient } from '@supabase/supabase-js'

// Configuration Supabase (GRATUIT)
// Utilisation des variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Vérification que les variables sont définies
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes!')
  console.error('VITE_SUPABASE_URL:', supabaseUrl ? 'Définie' : 'MANQUANTE')
  console.error('VITE_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'Définie' : 'MANQUANTE')
}

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Fonction pour vérifier la connexion
export const testSupabaseConnection = async () => {
  try {
    console.log('🔍 Test de connexion Supabase...')
    console.log('URL:', supabaseUrl)
    console.log('Key:', supabaseAnonKey ? 'Présente' : 'Manquante')
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('❌ Erreur de connexion Supabase:', error)
      return false
    }
    
    console.log('✅ Connexion Supabase réussie!', data)
    return true
  } catch (error) {
    console.error('❌ Erreur de connexion Supabase:', error)
    return false
  }
}
