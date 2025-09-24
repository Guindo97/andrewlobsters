import { createClient } from '@supabase/supabase-js'

// Configuration Supabase (GRATUIT)
// Remplacez ces valeurs par vos vraies clés Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here'

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
