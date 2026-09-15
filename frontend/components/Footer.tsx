import React from 'react';
import { companyInfo } from '../data';
import { Icon } from './Icons';
import { Page } from '../types';

interface FooterProps {
  setPage: (page: Page) => void;
}

export const Footer: React.FC<FooterProps> = ({ setPage }) => {
  return (
    <footer className="bg-brand-dark text-brand-light pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-4">
              <Icon name="Leaf" className="h-6 w-6 text-brand-green mr-2" />
              <span className="font-serif text-xl font-bold text-white tracking-tight">
                Frankini Landscaping
              </span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Disrupting property care in Rockville Centre. Zero hassle, instant quotes, and premium service on demand or on autopilot.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-green cursor-pointer transition-colors">
                <span className="text-sm font-bold">FB</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-green cursor-pointer transition-colors">
                <span className="text-sm font-bold">IG</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setPage('home')} className="text-gray-400 hover:text-brand-accent transition-colors">Home</button></li>
              <li><button onClick={() => setPage('services')} className="text-gray-400 hover:text-brand-accent transition-colors">Our Services</button></li>
              <li><button onClick={() => setPage('about')} className="text-gray-400 hover:text-brand-accent transition-colors">Our Story</button></li>
              <li><button onClick={() => setPage('contact')} className="text-brand-accent hover:text-white transition-colors font-medium">Get Instant Quote</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Icon name="MapPin" className="w-5 h-5 text-brand-green mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400">{companyInfo.address}<br/><span className="text-sm mt-1 block">Servicing: {companyInfo.serviceArea}</span></span>
              </li>
              <li className="flex items-center">
                <Icon name="Phone" className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                <span className="text-gray-400">{companyInfo.phone}</span>
              </li>
              <li className="flex items-center">
                <Icon name="Mail" className="w-5 h-5 text-brand-green mr-3 flex-shrink-0" />
                <span className="text-gray-400">{companyInfo.email}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Frankini Landscaping. All rights reserved.
          </p>
          <div className="flex space-x-4 text-sm text-gray-500">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};