import React, { useState, useEffect, useRef } from 'react';

const Reviews = ({ t }) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    comment: ''
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [customerCount, setCustomerCount] = useState(0);
  const sectionRef = useRef(null);
  
  // Avis par défaut (statiques)
  const defaultReviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely amazing lobster! Fresh, perfectly cooked, and delivered right to our door. Andrew's service is exceptional!",
      date: "2 days ago"
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 5,
      comment: "Best lobster in Bathurst! The quality is outstanding and the prices are very reasonable. Highly recommended!",
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      comment: "Family tradition continues! We've been ordering from Andrew for years. Always fresh, always delicious!",
      date: "2 weeks ago"
    },
    {
      id: 4,
      name: "David Thompson",
      rating: 4,
      comment: "Great lobster and excellent service. The delivery was fast and the lobster was still warm when it arrived.",
      date: "3 weeks ago"
    },
    {
      id: 5,
      name: "Lisa Anderson",
      rating: 5,
      comment: "Perfect for special occasions! The lobster was huge and so fresh. Will definitely order again!",
      date: "1 month ago"
    },
    {
      id: 6,
      name: "Robert Wilson",
      rating: 5,
      comment: "Outstanding quality and service. Andrew really knows his lobster! The best in the area, hands down.",
      date: "1 month ago"
    }
  ];

  // Charger les avis depuis localStorage ou utiliser les avis par défaut
  const [reviews, setReviews] = useState(() => {
    try {
      const savedReviews = localStorage.getItem('reviews-data');
      if (savedReviews) {
        const parsed = JSON.parse(savedReviews);
        // S'assurer que les avis par défaut sont toujours présents
        const defaultIds = defaultReviews.map(r => r.id);
        const customReviews = parsed.filter(r => !defaultIds.includes(r.id));
        
        // Trier les avis personnalisés par ID (plus récent = ID plus élevé)
        const sortedCustomReviews = customReviews.sort((a, b) => b.id - a.id);
        
        // Mettre les avis personnalisés en premier (les plus récents)
        return [...sortedCustomReviews, ...defaultReviews];
      }
      return defaultReviews;
    } catch (error) {
      console.error('Erreur lors du chargement des avis:', error);
      return defaultReviews;
    }
  });

  // Fonction pour sauvegarder les avis dans localStorage
  const saveReviewsToStorage = (reviewsToSave) => {
    try {
      localStorage.setItem('reviews-data', JSON.stringify(reviewsToSave));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des avis:', error);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <i
        key={index}
        className={`fas fa-star ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (newReview.name.trim() && newReview.comment.trim()) {
      // Ajouter le nouvel avis à la liste
      const reviewToAdd = {
        id: Date.now(), // ID unique basé sur le timestamp
        name: newReview.name.trim(),
        rating: newReview.rating,
        comment: newReview.comment.trim(),
        date: "Just now"
      };
      
      setReviews(prev => {
        const newReviews = [reviewToAdd, ...prev]; // Ajouter au début de la liste
        saveReviewsToStorage(newReviews); // Sauvegarder dans localStorage
        return newReviews;
      });
      
      setNewReview({ name: '', rating: 5, comment: '' });
      setShowReviewForm(false);
      alert(t.reviews.thankYou);
    }
  };

  const handleStarClick = (rating) => {
    setNewReview(prev => ({ ...prev, rating }));
  };

  // Animation du compteur de clients
  useEffect(() => {
    const animateCount = () => {
      if (hasAnimated) return;
      
      setHasAnimated(true);
      
      // Animation du compteur de 0 à 500
      const duration = 2000; // 2 secondes
      const startTime = Date.now();
      const targetValue = 500;
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Fonction d'easing pour un effet plus naturel
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(targetValue * easeOutQuart);
        
        setCustomerCount(currentValue);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            // Délai pour s'assurer que l'animation démarre bien
            setTimeout(animateCount, 200);
          }
        });
      },
      {
        threshold: 0.05, // Seuil très bas pour mobile
        rootMargin: '0px 0px 0px 0px' // Pas de marge négative
      }
    );

    // Fallback pour mobile - déclencher l'animation après un délai
    const mobileFallback = setTimeout(() => {
      if (!hasAnimated) {
        animateCount();
      }
    }, 3000); // 3 secondes après le chargement

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearTimeout(mobileFallback);
    };
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-blue-900 mb-6">
            {t.reviews.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.reviews.subtitle}
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
          <div className="text-center bg-white rounded-xl p-6 md:p-8 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">4.9</div>
            <div className="flex justify-center mb-2">
              {renderStars(5)}
            </div>
            <p className="text-sm md:text-base text-gray-600">{t.reviews.averageRating}</p>
          </div>
          <div className="text-center bg-white rounded-xl p-6 md:p-8 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2 transition-all duration-300">
              {customerCount}+
            </div>
            <p className="text-sm md:text-base text-gray-600">{t.reviews.happyCustomers}</p>
            {/* Bouton de test pour mobile - à supprimer après test */}
            {!hasAnimated && (
              <button
                onClick={() => {
                  setHasAnimated(true);
                  const duration = 2000;
                  const startTime = Date.now();
                  const targetValue = 500;
                  
                  const animate = () => {
                    const elapsed = Date.now() - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentValue = Math.floor(targetValue * easeOutQuart);
                    setCustomerCount(currentValue);
                    
                    if (progress < 1) {
                      requestAnimationFrame(animate);
                    }
                  };
                  
                  requestAnimationFrame(animate);
                }}
                className="mt-2 text-xs bg-blue-500 text-white px-2 py-1 rounded"
              >
                Test Animation
              </button>
            )}
          </div>
          <div className="text-center bg-white rounded-xl p-6 md:p-8 shadow-lg">
            <div className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">5+</div>
            <p className="text-sm md:text-base text-gray-600">{t.reviews.yearsOfService}</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map(review => (
            <div key={review.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <i className="fas fa-user text-blue-600 text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{review.name}</h4>
                  <div className="flex items-center">
                    <div className="flex mr-2">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              {t.reviews.shareExperience}
            </h3>
            <p className="text-gray-600 mb-6">
              {t.reviews.shareDescription}
            </p>
            <button 
              onClick={() => setShowReviewForm(true)}
              className="lobster-red text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transform transition-all shadow-lg"
            >
              <i className="fas fa-star mr-2"></i>
              {t.reviews.leaveReview}
            </button>
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-blue-900">{t.reviews.leaveReview}</h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <form onSubmit={handleSubmitReview} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.reviews.yourName}
                  </label>
                  <input
                    type="text"
                    value={newReview.name}
                    onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t.reviews.enterName}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.reviews.rating}
                  </label>
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }, (_, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleStarClick(index + 1)}
                        className="text-2xl focus:outline-none"
                      >
                        <i
                          className={`fas fa-star ${
                            index < newReview.rating ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t.reviews.yourReview}
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24 resize-none"
                    placeholder={t.reviews.tellExperience}
                    required
                  />
                </div>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {t.gallery.cancel}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 lobster-red text-white px-4 py-2 rounded-lg hover:scale-105 transform transition-all"
                  >
                    {t.reviews.submitReview}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
