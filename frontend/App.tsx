import React, { useState } from 'react';
import { Page } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage, ContactPage } from './pages/PlaceholderPages';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setPage={setCurrentPage} />;
      case 'services':
        return <ServicesPage setPage={setCurrentPage} />;
      case 'about':
        return <AboutPage setPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage setPage={setCurrentPage} />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-brand-slate bg-brand-light">
      <Navbar currentPage={currentPage} setPage={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer setPage={setCurrentPage} />
    </div>
  );
};

export default App;