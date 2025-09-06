import React from 'react';

const About = ({ t }) => {
  return (
    <section className="py-20 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-900 mb-8">
            {t.about.title}
          </h2>
          <p className="text-xl text-gray-700 mb-6">
            {t.about.description}
          </p>
          <p className="text-lg text-gray-600 mb-6">
            {t.about.dailyCook}
          </p>
          <p className="text-lg text-gray-600 mb-12">
            {t.about.experience}
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <i className="fas fa-map-marker-alt text-3xl text-blue-600 mb-4"></i>
              <p className="text-sm text-gray-700">{t.info.location}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <i className="fas fa-phone text-3xl text-blue-600 mb-4"></i>
              <p className="text-sm text-gray-700">{t.info.phone}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <i className="fas fa-clock text-3xl text-blue-600 mb-4"></i>
              <p className="text-sm text-gray-700">{t.info.hours}</p>
            </div>
            <div className="bg-blue-50 p-6 rounded-xl">
              <i className="fas fa-envelope text-3xl text-blue-600 mb-4"></i>
              <p className="text-sm text-gray-700">{t.info.email}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
