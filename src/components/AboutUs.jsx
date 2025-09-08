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

        {/* Meet the Team Section */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <div className="overflow-hidden">
              <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-900 via-blue-700 to-red-600 bg-clip-text text-transparent mb-6 transform -translate-y-full opacity-0 animate-whirlwind-in" style={{ animationDelay: '2s' }}>
                MEET THE TEAM!
              </h2>
            </div>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-red-600 mx-auto rounded-full transform scale-x-0 animate-scale-in" style={{ animationDelay: '2.5s' }}></div>
          </div>

          <div className="max-w-6xl mx-auto">
            {/* Andrew and Vanessa */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/team.jpg" 
                    alt="Andrew and Vanessa"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-red-200 rounded-full opacity-60"></div>
              </div>

              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 transform -translate-y-full opacity-0 animate-whirlwind-in-delayed" style={{ animationDelay: '2.5s' }}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    We're Andrew and Vanessa — the proud team behind Andrew's Lobster!
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Andrew is the fisherman behind it all. Born and raised right here in Pabineau First Nation, he's spent most of his life on the water and is passionate about bringing the freshest catch to your table.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    Vanessa runs the social media and handles all the behind-the-scenes work that keeps things running smoothly. She's usually busy with the little one, but when she gets the chance (like today!), she jumps in to help clean the lobster too.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    And then there's Little Grace, our precious daughter who brings so much joy and laughter to our daily work! She's always there with her beautiful smile, helping us in her own little way and reminding us why we do what we do. Grace is the heart of our family business, bringing that special spark that makes every day brighter for everyone around her.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    We're not just business partners — we're husband and wife, and this small family business means the world to us. Being able to run it right here in our own community is something we're truly grateful for.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    We love meeting new people, connecting with our customers, and sharing a piece of our home with you. Thank you for supporting us — it means more than you know! 🦞❤️
                  </p>
                </div>
              </div>
            </div>

            {/* Terence */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-6 lg:order-2">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 transform -translate-y-full opacity-0 animate-whirlwind-in-delayed" style={{ animationDelay: '3s' }}>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Say hello to Terence — the friendly face you'll see when you come to buy lobster!
                  </h3>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    He's the one doing the cooking, the serving, and pretty much everything in between. Terence keeps things running smoothly at the front, and we truly couldn't do this without him.
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed mb-4">
                    His kindness, hard work, and great sense of humor make him a key part of our team — and we're so lucky to have him!
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Stop by! We love people ❤️🦞
                  </p>
                </div>
              </div>

              <div className="relative lg:order-1">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/team2.jpg" 
                    alt="Terence"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-blue-200 rounded-full opacity-60"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-red-200 rounded-full opacity-60"></div>
              </div>
            </div>

            {/* Final Message */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-2xl p-8 text-white transform -translate-y-full opacity-0 animate-whirlwind-in-delayed" style={{ animationDelay: '3.5s' }}>
                <h3 className="text-2xl font-bold mb-4">
                  At Andrew's lobster it's more than just seafood—it's family.
                </h3>
                <p className="text-lg leading-relaxed mb-4">
                  From the sea to your table, we're proud to share a piece of what we love most with our community.
                </p>
                <p className="text-lg leading-relaxed mb-4">
                  We're OPEN today and ready to serve you fresh lobster 🦞 straight from the sea. Come by, say hi, and let our family serve yours with a smile! 💙
                </p>
                <p className="text-lg font-semibold">
                  📍 Stop in today—we'll be here and happy to see you!
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
