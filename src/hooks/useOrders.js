import { useState, useEffect, useCallback } from 'react'
import { ordersService } from '../services/ordersService'
import { notificationsService } from '../services/notificationsService'

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Charger toutes les commandes
  const loadOrders = useCallback(async (filters = {}) => {
    try {
      setLoading(true)
      setError(null)
      const ordersData = await ordersService.getOrders(filters)
      setOrders(ordersData)
    } catch (err) {
      setError(err.message)
      console.error('Erreur lors du chargement des commandes:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // Créer une nouvelle commande
  const createOrder = useCallback(async (orderData) => {
    try {
      setLoading(true)
      setError(null)
      
      // Créer la commande
      const newOrder = await ordersService.createOrder(orderData)
      
      // Ajouter à la liste locale
      setOrders(prev => [newOrder, ...prev])
      
      // Envoyer notification automatique
      try {
        await notificationsService.sendOrderNotification(newOrder, 'pending', 'fr')
      } catch (notificationError) {
        console.warn('Erreur notification (non bloquante):', notificationError)
      }
      
      return newOrder
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Mettre à jour le statut d'une commande
  const updateOrderStatus = useCallback(async (orderId, newStatus) => {
    try {
      setLoading(true)
      setError(null)
      
      // Mettre à jour dans la base de données
      const updatedOrder = await ordersService.updateOrderStatus(orderId, newStatus)
      
      // Mettre à jour la liste locale
      setOrders(prev => prev.map(order => 
        order.id === orderId ? updatedOrder : order
      ))
      
      // Envoyer notification automatique
      try {
        await notificationsService.sendOrderNotification(updatedOrder, newStatus, 'fr')
      } catch (notificationError) {
        console.warn('Erreur notification (non bloquante):', notificationError)
      }
      
      return updatedOrder
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Supprimer une commande
  const deleteOrder = useCallback(async (orderId) => {
    try {
      setLoading(true)
      setError(null)
      
      await ordersService.deleteOrder(orderId)
      
      // Retirer de la liste locale
      setOrders(prev => prev.filter(order => order.id !== orderId))
      
      return true
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  // Obtenir les statistiques
  const getStats = useCallback(async () => {
    try {
      return await ordersService.getOrderStats()
    } catch (err) {
      setError(err.message)
      throw err
    }
  }, [])

  // Charger les commandes au montage
  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  return {
    orders,
    loading,
    error,
    loadOrders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    getStats
  }
}
