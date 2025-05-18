
import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import HotPapers from '../components/HotPapers';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center">
        <div className="w-full max-w-4xl flex flex-col items-center justify-center py-8">
          <SearchBar />
        </div>
        <HotPapers />
      </main>
    </div>
  );
};

export default HomePage;
