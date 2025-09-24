import { useState, useEffect, useCallback } from 'react'
import { productsService } from '../services/productsService'

export const useProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Charger tous les produits
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const productsData = await productsService.getProducts()
      setProducts(productsData)
    } catch (err) {
      setError(err.message)
      console.error('Erreur lors du chargement des produits:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Mettre à jour un produit
  const updateProduct = useCallback(async (productId, updates) => {
    try {
      setLoading(true)
      setError(null)
      
      const updatedProduct = await productsService.updateProduct(productId, updates)
      
      // Mettre à jour la liste locale
      setProducts(prev => prev.map(product => 
        product.id === productId ? updatedProduct : product
      ))
      
      return updatedProduct
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Mettre à jour le stock d'un produit
  const updateStock = useCallback(async (productId, newStock) => {
    try {
      setLoading(true)
      setError(null)
      
      const updatedProduct = await productsService.updateStock(productId, newStock)
      
      // Mettre à jour la liste locale
      setProducts(prev => prev.map(product => 
        product.id === productId ? updatedProduct : product
      ))
      
      return updatedProduct
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Charger les produits au montage
  useEffect(() => {
    loadProducts()
  }, [loadProducts])

  return {
    products,
    loading,
    error,
    loadProducts,
    updateProduct,
    updateStock
  }
}
