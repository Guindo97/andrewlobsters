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
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-16 left-16 w-48 h-48 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-24 w-32 h-32 bg-purple-100 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-24 left-1/4 w-28 h-28 bg-yellow-100 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-32 right-16 w-40 h-40 bg-pink-100 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            Customer Stories
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-purple-700 to-pink-600 bg-clip-text text-transparent mb-6">
            {t.reviews.title}
          </h2>
          <p className="text-2xl text-gray-800 mb-6 font-semibold">
            The Place to Be for Sea Food
          </p>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t.reviews.subtitle}
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-600 mx-auto rounded-full mt-6"></div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="group text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-white/20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-star text-white text-2xl"></i>
            </div>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-600 bg-clip-text text-transparent mb-3">4.9</div>
            <div className="flex justify-center mb-4">
              {renderStars(5)}
            </div>
            <p className="text-gray-600 font-semibold">{t.reviews.averageRating}</p>
          </div>
          
          <div className="group text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-white/20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-users text-white text-2xl"></i>
            </div>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3 transition-all duration-300">
              {customerCount}+
            </div>
            <p className="text-gray-600 font-semibold">{t.reviews.happyCustomers}</p>
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
                className="mt-3 text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full hover:scale-105 transition-transform"
              >
                Test Animation
              </button>
            )}
          </div>
          
          <div className="group text-center bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-white/20">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-calendar-alt text-white text-2xl"></i>
            </div>
            <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">5+</div>
            <p className="text-gray-600 font-semibold">{t.reviews.yearsOfService}</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {reviews.map((review, index) => (
            <div 
              key={review.id} 
              className="group bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-500 border border-white/20 hover:border-blue-200/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-user text-white text-xl"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">{review.name}</h4>
                  <div className="flex items-center mt-2">
                    <div className="flex mr-3">
                      {renderStars(review.rating)}
                    </div>
                    <span className="text-sm text-gray-500 font-medium">{review.date}</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <p className="text-gray-700 leading-relaxed text-lg italic">
                  "{review.comment}"
                </p>
                {/* Quote decoration */}
                <div className="absolute -top-2 -left-2 text-4xl text-blue-200 font-serif">"</div>
                <div className="absolute -bottom-2 -right-2 text-4xl text-blue-200 font-serif">"</div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-3xl p-12 shadow-2xl max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-700/90"></div>
            <div className="relative z-10 text-white">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8">
                <i className="fas fa-star text-3xl"></i>
              </div>
              <h3 className="text-4xl font-bold mb-6">
                {t.reviews.shareExperience}
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                {t.reviews.shareDescription}
              </p>
              <button 
                onClick={() => setShowReviewForm(true)}
                className="bg-white text-blue-600 px-10 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  <i className="fas fa-star mr-3"></i>
                  {t.reviews.leaveReview}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </div>
            {/* Decorative Elements */}
            <div className="absolute top-6 right-6 w-24 h-24 border-2 border-white/20 rounded-full"></div>
            <div className="absolute bottom-6 left-6 w-16 h-16 border-2 border-white/20 rounded-full"></div>
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-purple-700 bg-clip-text text-transparent">
                  {t.reviews.leaveReview}
                </h3>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <i className="fas fa-times text-lg"></i>
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
