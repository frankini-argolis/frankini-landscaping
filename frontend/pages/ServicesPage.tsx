import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../types';
import { servicesData } from '../data';
import { Icon } from '../components/Icons';

interface ServicesPageProps {
  setPage: (page: Page) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setPage }) => {
  return (
    <div className="w-full pt-24">
      {/* Header */}
      <section className="bg-brand-slate text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Services on Your Terms</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light">
            No bloated contracts. No hidden fees. Just exactly what your property needs, exactly when you need it.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {servicesData.map((service, index) => (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center`}
              >
                {/* Image */}
                <div className="w-full lg:w-1/2">
                  <div className="relative rounded-sm overflow-hidden shadow-xl aspect-[4/3]">
                    <img 
                      src={service.imageUrl} 
                      alt={service.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 border-4 border-white/20 m-4 rounded-sm pointer-events-none"></div>
                  </div>
                </div>

                {/* Content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-center mb-4">
                    <div className="bg-brand-green/10 p-3 rounded-full mr-4">
                      <Icon name={service.iconName} className="w-8 h-8 text-brand-green" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-brand-slate">{service.title}</h2>
                  </div>
                  <p className="text-xl text-brand-green font-medium mb-6">{service.shortDesc}</p>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {service.fullDesc}
                  </p>
                  <button 
                    onClick={() => setPage('contact')}
                    className="bg-brand-slate text-white px-8 py-3 rounded-sm font-semibold hover:bg-gray-800 transition-colors flex items-center w-fit"
                  >
                    Get Instant Quote <Icon name="ChevronRight" className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-green text-center">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold text-white mb-6">Ready to experience the difference?</h2>
          <p className="text-green-100 mb-8 text-lg">Skip the phone tag. Chat with our bot and get your property care scheduled in under 60 seconds.</p>
          <button 
            onClick={() => setPage('contact')}
            className="bg-white text-brand-green px-8 py-3 rounded-sm font-bold hover:bg-gray-100 transition-colors"
          >
            Start Chat Now
          </button>
        </div>
      </section>
    </div>
  );
};