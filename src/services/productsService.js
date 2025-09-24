import { supabase } from '../lib/supabase'

export const productsService = {
  // Récupérer tous les produits
  async getProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erreur lors de la récupération des produits:', error)
      throw error
    }
  },

  // Récupérer un produit par ID
  async getProduct(id) {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erreur lors de la récupération du produit:', error)
      throw error
    }
  },

  // Mettre à jour un produit (pour l'admin)
  async updateProduct(id, updates) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Erreur lors de la mise à jour du produit:', error)
      throw error
    }
  },

  // Mettre à jour le stock d'un produit
  async updateStock(productId, newStock) {
    try {
      const { data, error } = await supabase
        .from('products')
        .update({ 
          stock: newStock,
          updated_at: new Date().toISOString()
        })
        .eq('id', productId)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Erreur lors de la mise à jour du stock:', error)
      throw error
    }
  }
}
