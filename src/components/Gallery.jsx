import React, { useState } from 'react';

const Gallery = ({ t }) => {
  const [photos, setPhotos] = useState([
    { id: 1, url: '🦞', caption: 'Fresh Lobster' },
    { id: 2, url: '🚤', caption: 'Waymaker Boat' },
    { id: 3, url: '🏠', caption: 'Our Location' },
    { id: 4, url: '👨‍🍳', caption: 'Andrew Cooking' }
  ]);

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
          setPhotos(prev => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <section className="py-20 bg-white/90 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            {t.gallery.title}
          </h2>
          <button
            onClick={handleAddPhoto}
            className="lobster-red text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transform transition-all shadow-lg"
          >
            <i className="fas fa-plus mr-2"></i>
            {t.gallery.addPhoto}
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {photos.map(photo => (
            <div key={photo.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transform transition-all">
              <div className="aspect-square flex items-center justify-center bg-blue-50 text-6xl">
                {photo.url.startsWith('data:') ? (
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                ) : (
                  photo.url
                )}
              </div>
              <div className="p-4">
                <p className="text-center text-gray-700 font-medium">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
