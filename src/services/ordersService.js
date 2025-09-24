import { supabase } from '../lib/supabase'
import { adminNotificationsService } from './adminNotificationsService'

export const ordersService = {
  // Créer une nouvelle commande
  async createOrder(orderData) {
    try {
      // Générer un numéro de commande unique
      const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
      
      const orderPayload = {
        order_number: orderNumber,
        customer_info: orderData.customerInfo,
        items: orderData.items,
        subtotal: orderData.subtotal,
        delivery_fee: orderData.deliveryFee || 0,
        total: orderData.total,
        delivery_option: orderData.deliveryOption,
        status: 'pending',
        payment_info: orderData.paymentInfo || null,
        created_at: new Date().toISOString()
      }

      const { data, error } = await supabase
        .from('orders')
        .insert([orderPayload])
        .select()

      if (error) throw error
      
      const newOrder = data[0]
      
      // 🔔 NOTIFIER ANDREW IMMÉDIATEMENT
      try {
        console.log('🔔 Admin notification for new order:', newOrder.order_number)
        await adminNotificationsService.notifyAdmin(newOrder)
      } catch (notificationError) {
        console.warn('⚠️ Admin notification error (non-blocking):', notificationError)
        // Ne pas faire échouer la création de commande si la notification échoue
      }
      
      return newOrder
    } catch (error) {
      console.error('Erreur lors de la création de la commande:', error)
      throw error
    }
  },

  // Récupérer toutes les commandes avec filtres
  async getOrders(filters = {}) {
    try {
      let query = supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      // Appliquer les filtres
      if (filters.status && filters.status !== 'all') {
        query = query.eq('status', filters.status)
      }

      if (filters.date_from) {
        query = query.gte('created_at', filters.date_from)
      }

      if (filters.date_to) {
        query = query.lte('created_at', filters.date_to)
      }

      if (filters.search) {
        query = query.or(`order_number.ilike.%${filters.search}%,customer_info->>name.ilike.%${filters.search}%`)
      }

      const { data, error } = await query
      if (error) throw error
      return data || []
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error)
      throw error
    }
  },

  // Récupérer une commande par ID
  async getOrder(id) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return data
    } catch (error) {
      console.error('Erreur lors de la récupération de la commande:', error)
      throw error
    }
  },

  // Mettre à jour le statut d'une commande
  async updateOrderStatus(orderId, newStatus) {
    try {
      const { data, error } = await supabase
        .from('orders')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId)
        .select()

      if (error) throw error
      return data[0]
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error)
      throw error
    }
  },

  // Supprimer une commande
  async deleteOrder(orderId) {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId)

      if (error) throw error
      return true
    } catch (error) {
      console.error('Erreur lors de la suppression de la commande:', error)
      throw error
    }
  },

  // Obtenir les statistiques des commandes
  async getOrderStats() {
    try {
      // Statistiques générales
      const { data: totalOrders, error: error1 } = await supabase
        .from('orders')
        .select('id, total, status, created_at')

      if (error1) throw error1

      const stats = {
        totalOrders: totalOrders.length,
        totalRevenue: totalOrders.reduce((sum, order) => sum + (order.total || 0), 0),
        todayOrders: totalOrders.filter(order => {
          const today = new Date().toDateString()
          const orderDate = new Date(order.created_at).toDateString()
          return today === orderDate
        }).length,
        todayRevenue: totalOrders.filter(order => {
          const today = new Date().toDateString()
          const orderDate = new Date(order.created_at).toDateString()
          return today === orderDate
        }).reduce((sum, order) => sum + (order.total || 0), 0),
        statusCounts: totalOrders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1
          return acc
        }, {})
      }

      return stats
    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error)
      throw error
    }
  }
}
