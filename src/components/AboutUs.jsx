import React from 'react';

const AboutUs = ({ t }) => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 via-white to-red-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-blue-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="absolute top-60 right-20 w-32 h-32 bg-red-100 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 bg-yellow-100 rounded-full opacity-30 animate-pulse delay-2000"></div>
        <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-green-100 rounded-full opacity-30 animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-2 rounded-full text-sm font-semibold mb-6 animate-pulse">
            {t.aboutUs.badge}
          </div>
          <div className="overflow-hidden">
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 bg-clip-text text-transparent mb-6 transform -translate-y-full opacity-0 animate-whirlwind-in">
              {t.aboutUs.title}
            </h2>
          </div>
          <div className="overflow-hidden">
            <p className="text-2xl text-gray-800 mb-6 font-semibold transform -translate-y-full opacity-0 animate-whirlwind-in-delayed">
              {t.aboutUs.subtitle}
            </p>
          </div>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-red-600 mx-auto rounded-full transform scale-x-0 animate-scale-in"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Section */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/images/family.jpg" 
                  alt="Andrew's Lobsters Family"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-red-200 rounded-full opacity-60"></div>
            </div>

            {/* Content Section */}
            <div className="space-y-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 transform -translate-y-full opacity-0 animate-whirlwind-in-delayed" style={{ animationDelay: '0.5s' }}>
                <h3 className="text-3xl font-bold text-gray-800 mb-4">
                  {t.aboutUs.storyTitle}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {t.aboutUs.story}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 text-center transform -translate-y-full opacity-0 animate-whirlwind-in-delayed" style={{ animationDelay: '1s' }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-anchor text-white text-2xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {t.aboutUs.passionTitle}
                  </h4>
                  <p className="text-gray-700">
                    {t.aboutUs.passion}
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/50 text-center transform -translate-y-full opacity-0 animate-whirlwind-in-delayed" style={{ animationDelay: '1.2s' }}>
                  <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i className="fas fa-heart text-white text-2xl"></i>
                  </div>
                  <h4 className="text-xl font-bold text-gray-800 mb-2">
                    {t.aboutUs.traditionTitle}
                  </h4>
                  <p className="text-gray-700">
                    {t.aboutUs.tradition}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-8 text-white text-center transform -translate-y-full opacity-0 animate-whirlwind-in-delayed" style={{ animationDelay: '1.5s' }}>
                <h4 className="text-2xl font-bold mb-4">
                  {t.aboutUs.commitmentTitle}
                </h4>
                <p className="text-lg leading-relaxed">
                  {t.aboutUs.commitment}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
