// Componemte da página Principal

import React from 'react';
import { SearchProvider } from '../context/SearchContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ResultsList from '../components/ResultsList';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import DetailModal from '../components/DetailModal';

const Index: React.FC = () => {
  return (
    <SearchProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-grow flex flex-col items-center px-4 py-8">
          <div className="w-full max-w-3xl mx-auto text-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">Chá de Orcideira</h1>
            <p className="text-gray-600">
              Sua plataforma para descobrir publicações acadêmicas e pesquisadores
            </p>
          </div>
          
          <SearchBar />
          <ResultsList />
        </main>
        
        <footer className="py-6 border-t border-gray-200 bg-white">
          <div className="container mx-auto text-center text-gray-500 text-sm">
            <p>© 2024 Chá de Orcideira. Desenvolvido com dados do Semantic Scholar e ORCID.</p>
          </div>
        </footer>
        
        {/* Modals */}
        <LoginModal />
        <RegisterModal />
        <DetailModal />
      </div>
    </SearchProvider>
  );
};

export default Index;
