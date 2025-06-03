// Componemte do Cabeçalho do Projeto
// Mostra o Título do Pojeto e os botões de Login e Cadastro

import React from 'react';
import { Button } from "@/components/ui/button";
import { TeaLeafLogo } from '../assets/logo';
import { useSearch } from '../context/SearchContext';

const Header: React.FC = () => {
  const { setLoginModalOpen, setRegisterModalOpen } = useSearch();

  return (
    <header className="w-full py-4 px-6 border-b border-gray-200 flex items-center bg-white shadow-sm">
      <div className="flex items-center">
        <TeaLeafLogo className="h-10 w-10" />
        <h1 className="ml-3 text-xl font-semibold text-gray-800">Chá de Orcideira</h1>
      </div>
      <div className="flex-grow"></div>
      <div className="space-x-2">
        <Button 
          variant="outline"
          className="text-gray-700 hover:text-primary hover:border-primary"
          onClick={() => setLoginModalOpen(true)}
        >
          Login
        </Button>
        <Button 
          className="bg-primary hover:bg-primary-dark"
          onClick={() => setRegisterModalOpen(true)}
        >
          Cadastrar
        </Button>
      </div>
    </header>
  );
};

export default Header;
