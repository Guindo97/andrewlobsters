import React, { useState } from 'react';

const Gallery = ({ t }) => {
  // Photos par défaut
  const defaultPhotos = [
    { id: 1, url: '/images/homard.jpg', caption: 'Fresh Lobster' },
    { id: 2, url: '/images/waymaker.jpg', caption: 'Waymaker Boat' },
    { id: 3, url: '/images/location.jpg', caption: 'Our Location' },
    { id: 4, url: '👨‍🍳', caption: 'Andrew Cooking' }
  ];

  // Charger les photos depuis localStorage ou utiliser les photos par défaut
  const [photos, setPhotos] = useState(() => {
    try {
      const savedPhotos = localStorage.getItem('gallery-photos');
      if (savedPhotos) {
        const parsed = JSON.parse(savedPhotos);
        // S'assurer que les photos par défaut sont toujours présentes
        const defaultIds = defaultPhotos.map(p => p.id);
        const customPhotos = parsed.filter(p => !defaultIds.includes(p.id));
        return [...defaultPhotos, ...customPhotos];
      }
      return defaultPhotos;
    } catch (error) {
      console.error('Erreur lors du chargement des photos:', error);
      return defaultPhotos;
    }
  });

  const [editingPhoto, setEditingPhoto] = useState(null);
  const [editCaption, setEditCaption] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  // Fonction pour sauvegarder les photos dans localStorage
  const savePhotosToStorage = (photosToSave) => {
    try {
      localStorage.setItem('gallery-photos', JSON.stringify(photosToSave));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des photos:', error);
    }
  };

  const handleAddPhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto = {
            id: Date.now(),
            url: e.target.result,
            caption: file.name
          };
          setPhotos(prev => {
            const newPhotos = [...prev, newPhoto];
            savePhotosToStorage(newPhotos);
            return newPhotos;
          });
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleDeletePhoto = (photoId) => {
    setPhotos(prev => {
      const newPhotos = prev.filter(photo => photo.id !== photoId);
      savePhotosToStorage(newPhotos);
      return newPhotos;
    });
  };

  const handleRenamePhoto = (photoId, newCaption) => {
    setPhotos(prev => {
      const newPhotos = prev.map(photo => 
        photo.id === photoId ? { ...photo, caption: newCaption } : photo
      );
      savePhotosToStorage(newPhotos);
      return newPhotos;
    });
  };

  const startEditing = (photoId, currentCaption) => {
    setEditingPhoto(photoId);
    setEditCaption(currentCaption);
  };

  const saveEdit = () => {
    if (editingPhoto && editCaption.trim()) {
      handleRenamePhoto(editingPhoto, editCaption.trim());
    }
    setEditingPhoto(null);
    setEditCaption('');
  };

  const cancelEdit = () => {
    setEditingPhoto(null);
    setEditCaption('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  // Fonctions pour l'authentification admin
  const handleAdminLogin = () => {
    const correctPassword = 'andrew2025'; // Mot de passe admin
    if (adminPassword === correctPassword) {
      setIsAdminMode(true);
      setShowPasswordForm(false);
      setAdminPassword('');
    } else {
      alert('Mot de passe incorrect. Accès refusé.');
      setAdminPassword('');
    }
  };

  const handleAdminLogout = () => {
    setIsAdminMode(false);
    setShowPasswordForm(false);
  };

  return (
    <section className="py-20 relative overflow-hidden" style={{ backgroundImage: 'url(/images/seafood.jpg)', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-60 right-32 w-32 h-32 bg-red-100 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/3 w-24 h-24 bg-yellow-100 rounded-full opacity-30 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-20 w-36 h-36 bg-green-100 rounded-full opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            Fresh from the Ocean
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-purple-700 to-red-600 bg-clip-text text-transparent mb-6">
            {t.gallery.title}
          </h2>
          <p className="text-2xl text-gray-800 mb-6 font-semibold">
            Discover Our Ocean Treasures
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-red-600 mx-auto rounded-full"></div>
          
          {/* Interface d'authentification */}
          {!isAdminMode ? (
            <div className="bg-white rounded-xl p-6 shadow-lg max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t.gallery.adminMode}
              </h3>
              {!showPasswordForm ? (
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transform transition-all shadow-lg"
                >
                  <i className="fas fa-lock mr-2"></i>
                  {t.gallery.adminAccess}
                </button>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {t.gallery.adminPassword}
                    </label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={t.gallery.enterPassword}
                      autoFocus
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleAdminLogin}
                      className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      {t.gallery.login}
                    </button>
                    <button
                      onClick={() => setShowPasswordForm(false)}
                      className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    >
                      {t.gallery.cancel}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                <i className="fas fa-check-circle mr-2"></i>
                {t.gallery.adminModeActive}
              </div>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleAddPhoto}
                  className="lobster-red text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transform transition-all shadow-lg"
                >
                  <i className="fas fa-plus mr-2"></i>
                  {t.gallery.addPhoto}
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="bg-gray-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-700 transform transition-all shadow-lg"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  {t.gallery.logout}
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:scale-105 hover:shadow-3xl transform transition-all duration-500 border border-white/20 hover:border-blue-200/50 relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
                {photo.url.startsWith('data:') || photo.url.startsWith('/images/') ? (
                  <img 
                    src={photo.url} 
                    alt={photo.caption} 
                    className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-8xl group-hover:scale-110 transition-transform duration-500">
                    {photo.url}
                  </div>
                )}
                {/* Overlay Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
              
              <div className="p-6">
                {editingPhoto === photo.id ? (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={editCaption}
                      onChange={(e) => setEditCaption(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 text-center text-gray-700 font-medium border-2 border-blue-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      autoFocus
                    />
                    <button
                      onClick={saveEdit}
                      className="w-8 h-8 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors flex items-center justify-center"
                      title={t.gallery.save}
                    >
                      <i className="fas fa-check text-sm"></i>
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="w-8 h-8 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors flex items-center justify-center"
                      title={t.gallery.cancel}
                    >
                      <i className="fas fa-times text-sm"></i>
                    </button>
                  </div>
                ) : (
                  <p 
                    className={`text-center text-gray-700 font-semibold text-lg ${
                      isAdminMode ? 'cursor-pointer hover:text-blue-600 transition-colors duration-300' : ''
                    }`}
                    onClick={isAdminMode ? () => startEditing(photo.id, photo.caption) : undefined}
                    title={isAdminMode ? t.gallery.clickToRename : ""}
                  >
                    {photo.caption}
                  </p>
                )}
              </div>
              
              {/* Bouton de suppression - visible au survol seulement en mode admin */}
              {isAdminMode && (
                <button
                  onClick={() => handleDeletePhoto(photo.id)}
                  className="absolute top-4 right-4 bg-red-500 text-white rounded-full w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-red-600 shadow-lg hover:scale-110"
                  title={t.gallery.deletePhoto}
                >
                  <i className="fas fa-trash text-sm"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
