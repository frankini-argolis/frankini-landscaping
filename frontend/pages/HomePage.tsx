import React from 'react';
import { motion } from 'framer-motion';
import { Page } from '../types';
import { servicesData, testimonialsData, companyInfo } from '../data';
import { Icon } from '../components/Icons';

interface HomePageProps {
  setPage: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setPage }) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/modern-landscaping/1920/1080" 
            alt="Modern landscaping" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <span className="inline-block bg-brand-accent text-white px-4 py-1 rounded-full text-sm font-bold tracking-wider uppercase mb-6 shadow-lg">
              The New Standard in RVC
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight">
              Landscaping, <br/><span className="text-brand-green bg-white px-2 leading-snug">Modernized.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-10 font-light leading-relaxed">
              Instant quotes. Zero hassle. We're changing how Long Island handles property care. Get your lawn cut on-demand or put it on autopilot.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <button 
                onClick={() => setPage('contact')}
                className="w-full sm:w-auto bg-brand-green text-white px-8 py-4 rounded-sm font-bold text-lg hover:bg-green-800 transition-colors shadow-xl flex items-center justify-center"
              >
                <Icon name="CheckCircle" className="w-5 h-5 mr-2" />
                Get an Instant Quote
              </button>
              <button 
                onClick={() => setPage('services')}
                className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-sm font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                See How It Works
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TRUST BADGES / FEATURES */}
      <section className="bg-brand-green py-12 border-b-8 border-brand-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Icon name="Phone" className="w-10 h-10 text-brand-accent mb-4" />
              <h3 className="text-white font-serif font-semibold text-xl mb-2">Instant Quotes</h3>
              <p className="text-green-100 text-sm">Chat with our bot and get a price in seconds. No waiting for callbacks.</p>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="CheckCircle" className="w-10 h-10 text-brand-accent mb-4" />
              <h3 className="text-white font-serif font-semibold text-xl mb-2">Zero Friction</h3>
              <p className="text-green-100 text-sm">Book online, pay online. We show up, do the work, and leave your yard perfect.</p>
            </div>
            <div className="flex flex-col items-center">
              <Icon name="Leaf" className="w-10 h-10 text-brand-accent mb-4" />
              <h3 className="text-white font-serif font-semibold text-xl mb-2">On-Demand or Autopilot</h3>
              <p className="text-green-100 text-sm">Order a one-time cut or subscribe to our discounted monthly maintenance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-brand-slate mb-6">
              Property Care Made Simple
            </h2>
            <p className="text-lg text-gray-600">
              We've stripped away the complexity. Choose exactly what you need, when you need it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
              <motion.div 
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
                }}
                className="bg-white rounded-sm shadow-sm overflow-hidden group hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="h-40 overflow-hidden relative">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white p-2 rounded-sm shadow-sm">
                    <Icon name={service.iconName} className="w-5 h-5 text-brand-green" />
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-serif font-bold text-brand-slate mb-2">{service.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">{service.shortDesc}</p>
                  <button 
                    onClick={() => setPage('contact')}
                    className="text-brand-green font-semibold text-sm flex items-center hover:text-brand-accent transition-colors mt-auto"
                  >
                    Get Quote <Icon name="ChevronRight" className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / LOCAL CONTEXT */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="relative">
                <img 
                  src="https://picsum.photos/seed/rvc-home/800/1000" 
                  alt="Landscaping team at work" 
                  className="rounded-sm shadow-xl"
                />
                <div className="absolute -bottom-8 -right-8 bg-brand-accent text-white p-8 rounded-sm shadow-lg hidden md:block">
                  <p className="font-serif text-3xl font-bold mb-1">Disrupting</p>
                  <p className="text-sm font-medium uppercase tracking-wider">The Industry</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-slate mb-6">
                We Were Tired of the Old Way. So We Built a Better One.
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Frankini Landscaping is a brand new company with a simple mission: make property care effortless. We looked at the traditional landscaping industry—the unreturned phone calls, the vague pricing, the rigid contracts—and decided to do the exact opposite.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Whether you just need a one-time cut before a backyard BBQ, or you want to put your property on autopilot with our discounted monthly plan, we put you in control. Just tell our bot what you need, get a price instantly, and we'll handle the rest.
              </p>
              <ul className="space-y-4 mb-10">
                {['Instant AI-Driven Quotes', 'No Long-Term Commitments Required', 'Seamless Online Booking & Payment'].map((item, i) => (
                  <li key={i} className="flex items-center text-brand-slate font-medium">
                    <Icon name="CheckCircle" className="w-5 h-5 text-brand-green mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
              <button 
                onClick={() => setPage('about')}
                className="bg-brand-slate text-white px-8 py-3 rounded-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Read Our Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-slate mb-4">
              Early Adopters Love Us
            </h2>
            <p className="text-gray-600">See what your neighbors are saying about the new way to landscape.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-8 rounded-sm shadow-sm relative">
                <Icon name="Star" className="w-8 h-8 text-brand-accent/20 absolute top-6 right-6" />
                <div className="flex text-brand-accent mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed">"{testimonial.text}"</p>
                <div>
                  <p className="font-bold text-brand-slate">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <img src="https://picsum.photos/seed/pattern/1000/1000" className="w-full h-full object-cover mix-blend-overlay" alt="" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Ready to Skip the Hassle?
          </h2>
          <p className="text-xl text-green-100 mb-10 font-light">
            Chat with our bot right now. Get your price in seconds and book your service instantly.
          </p>
          <button 
            onClick={() => setPage('contact')}
            className="bg-brand-accent text-white px-10 py-4 rounded-sm font-bold text-lg hover:bg-amber-700 transition-colors shadow-lg inline-flex items-center"
          >
            Start Instant Quote <Icon name="ChevronRight" className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>
    </div>
  );
};