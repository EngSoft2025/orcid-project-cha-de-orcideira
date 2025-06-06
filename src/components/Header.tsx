
import React from 'react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TeaLeafLogo } from '../assets/logo';
import { useSearch } from '../context/SearchContext';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { 
    setLoginModalOpen, 
    setRegisterModalOpen, 
    currentUser, 
    isAuthenticated,
    logout 
  } = useSearch();
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full py-4 px-6 border-b border-gray-200 flex items-center bg-white shadow-sm">
      <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
        <TeaLeafLogo className="h-10 w-10" />
        <h1 className="ml-3 text-xl font-semibold text-gray-800">Chá de Orcideira</h1>
      </div>
      <div className="flex-grow"></div>
      <div className="space-x-2">
        {isAuthenticated ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <User size={16} />
                <span>{currentUser?.nome}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleProfileClick}>
                Meu Perfil
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
