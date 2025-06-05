
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Paper {
  paperId: string;
  title: string;
  authors: string[] | {name: string}[];
  year?: number;
  abstract?: string;
  citationCount?: number;
  fieldsOfStudy?: string[];
  doi?: string;
  references?: Paper[];
}

export interface Author {
  id: string;
  name: string;
  orcidId?: string;
  affiliations: string[];
  hIndex?: number;
  totalPublications?: number;
  totalCitations?: number;
  educationSummary?: string;
  educationDetails?: string[];
  professionalExperiences?: string[];
  personalPageUrl?: string;
  publications?: Paper[];
  biography?: string;
}

export interface User {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  orcidId?: string;
}

export type SearchType = 'papers' | 'authors';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchType: SearchType;
  setSearchType: React.Dispatch<React.SetStateAction<SearchType>>;
  papers: Paper[];
  setPapers: React.Dispatch<React.SetStateAction<Paper[]>>;
  authors: Author[];
  setAuthors: React.Dispatch<React.SetStateAction<Author[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  
  // Additional properties for the Portuguese interface
  buscaTipo: SearchType;
  setBuscaTipo: React.Dispatch<React.SetStateAction<SearchType>>;
  termoBusca: string;
  setTermoBusca: React.Dispatch<React.SetStateAction<string>>;
  resultados: (Paper | Author)[];
  setResultados: React.Dispatch<React.SetStateAction<(Paper | Author)[]>>;
  carregando: boolean;
  setCarregando: React.Dispatch<React.SetStateAction<boolean>>;
  erro: string | null;
  setErro: React.Dispatch<React.SetStateAction<string | null>>;
  
  // Detail view properties
  detalheSelecionado: Paper | Author | null;
  setDetalheSelecionado: React.Dispatch<React.SetStateAction<Paper | Author | null>>;
  detalheCarregado: boolean;
  setDetalheCarregado: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Modal control properties
  isDetailModalOpen: boolean;
  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginModalOpen: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRegisterModalOpen: boolean;
  setRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
  // User authentication
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  logout: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // English interface state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('papers');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [termoBusca, setTermoBusca] = useState<string>('');
  const [buscaTipo, setBuscaTipo] = useState<SearchType>('papers');
  const [resultados, setResultados] = useState<(Paper | Author)[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);
  
  const [detalheSelecionado, setDetalheSelecionado] = useState<Paper | Author | null>(null);
  const [detalheCarregado, setDetalheCarregado] = useState<boolean>(false);
  
  const [isDetailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState<boolean>(false);

  // User authentication state
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Check for stored user on initialization
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        localStorage.removeItem('currentUser');
      }
    }
  }, []);

  const isAuthenticated = currentUser !== null;

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    console.log('Usuário deslogado');
  };

  return (
    <SearchContext.Provider 
      value={{
        searchTerm,
        setSearchTerm,
        searchType,
        setSearchType,
        papers,
        setPapers,
        authors,
        setAuthors,
        loading,
        setLoading,
        error,
        setError,
        
        buscaTipo,
        setBuscaTipo,
        termoBusca,
        setTermoBusca,
        resultados,
        setResultados,
        carregando,
        setCarregando,
        erro,
        setErro,
        
        detalheSelecionado,
        setDetalheSelecionado,
        detalheCarregado,
        setDetalheCarregado,
        
        isDetailModalOpen,
        setDetailModalOpen,
        isLoginModalOpen,
        setLoginModalOpen,
        isRegisterModalOpen,
        setRegisterModalOpen,
        
        // User authentication
        currentUser,
        setCurrentUser,
        isAuthenticated,
        logout,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
