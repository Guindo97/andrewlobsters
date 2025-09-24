import React, { useState, useEffect } from 'react'
import { adminNotificationsService } from '../services/adminNotificationsService'

const AdminNotificationStatus = () => {
  const [permissionStatus, setPermissionStatus] = useState('checking')
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    const checkStatus = () => {
      const supported = adminNotificationsService.isNotificationSupported()
      const permission = adminNotificationsService.getNotificationPermission()
      
      setIsSupported(supported)
      setPermissionStatus(permission)
    }

    checkStatus()
    
    // Vérifier le statut toutes les 5 secondes
    const interval = setInterval(checkStatus, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const requestPermission = async () => {
    try {
      const granted = await adminNotificationsService.requestNotificationPermission()
      setPermissionStatus(granted ? 'granted' : 'denied')
    } catch (error) {
      console.error('Erreur lors de la demande de permission:', error)
    }
  }

  if (!isSupported) {
    return (
      <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center">
          <i className="fas fa-exclamation-triangle mr-2"></i>
          <span className="text-sm">Notifications non supportées</span>
        </div>
      </div>
    )
  }

  if (permissionStatus === 'granted') {
    return (
      <div className="fixed bottom-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center">
          <i className="fas fa-bell mr-2"></i>
          <span className="text-sm">Notifications activées ✅</span>
        </div>
      </div>
    )
  }

  if (permissionStatus === 'denied') {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center">
          <i className="fas fa-bell-slash mr-2"></i>
          <span className="text-sm">Notifications refusées</span>
        </div>
      </div>
    )
  }

  if (permissionStatus === 'default') {
    return (
      <div className="fixed bottom-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded-lg shadow-lg">
        <div className="flex items-center">
          <i className="fas fa-bell mr-2"></i>
          <button 
            onClick={requestPermission}
            className="text-sm underline hover:no-underline"
          >
            Activer les notifications
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default AdminNotificationStatus
