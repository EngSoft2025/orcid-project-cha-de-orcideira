
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

interface SearchBarProps {
  compact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ compact = false }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  if (compact) {
    return (
      <form onSubmit={handleSearch} className="flex w-full max-w-3xl mx-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Buscar por pesquisadores ou artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10"
          />
        </div>
        <Button type="submit" className="ml-2 bg-tea hover:bg-tea-dark">
          Buscar
        </Button>
      </form>
    );
  }

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <Logo size="lg" withText={false} />
      </div>
      <h1 className="text-3xl font-bold mb-8 text-tea-dark">Chá de Orquideira</h1>
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Buscar por pesquisadores ou artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 py-6 text-lg rounded-full"
          />
          <Button 
            type="submit" 
            className="absolute right-1.5 top-1/2 transform -translate-y-1/2 bg-tea hover:bg-tea-dark rounded-full"
          >
            Buscar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
