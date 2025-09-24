import { createClient } from '@supabase/supabase-js'

// Configuration Supabase (GRATUIT)
// Utilisation des variables d'environnement avec fallback
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://robhxaqhxyhkqhvtorzn.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJvYmh4YXFoeHloa3FodnRvcnpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NzM3NTgsImV4cCI6MjA3NDI0OTc1OH0.TkkSoc3AviN39_8XeODGacVNXutujoEqkvGU_8BTaqE'

// Log des variables chargées
console.log('🔧 Supabase Configuration:')
console.log('URL:', supabaseUrl)
console.log('Key:', supabaseAnonKey ? 'Présente' : 'MANQUANTE')

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
