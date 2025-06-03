// Estado global da aplicação relacionado à busca de Publicações e Autores

import React, { createContext, useContext, useState } from 'react';

// Publicação
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

// Autor
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

// Define se a busca é por Publicação ou Autor
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
  
  // Propriedades Adicionais para a Interface em Português
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
  
  // Visualização Detalhada
  detalheSelecionado: Paper | Author | null;
  setDetalheSelecionado: React.Dispatch<React.SetStateAction<Paper | Author | null>>;
  detalheCarregado: boolean;
  setDetalheCarregado: React.Dispatch<React.SetStateAction<boolean>>;
  
  // Controle das Propriedades Modais
  isDetailModalOpen: boolean;
  setDetailModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoginModalOpen: boolean;
  setLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isRegisterModalOpen: boolean;
  setRegisterModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Interface em inglês
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchType, setSearchType] = useState<SearchType>('papers');
  const [papers, setPapers] = useState<Paper[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Interface em português
  const [termoBusca, setTermoBusca] = useState<string>('');
  const [buscaTipo, setBuscaTipo] = useState<SearchType>('papers');
  const [resultados, setResultados] = useState<(Paper | Author)[]>([]);
  const [carregando, setCarregando] = useState<boolean>(false);
  const [erro, setErro] = useState<string | null>(null);
  
  // Visualização Detalhada
  const [detalheSelecionado, setDetalheSelecionado] = useState<Paper | Author | null>(null);
  const [detalheCarregado, setDetalheCarregado] = useState<boolean>(false);
  
  // Controle das Propriedades Modais
  const [isDetailModalOpen, setDetailModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState<boolean>(false);

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
        
        // Interface em Português
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
        
        // Visualização Detalhada
        detalheSelecionado,
        setDetalheSelecionado,
        detalheCarregado,
        setDetalheCarregado,
        
        // Controle Modal
        isDetailModalOpen,
        setDetailModalOpen,
        isLoginModalOpen,
        setLoginModalOpen,
        isRegisterModalOpen,
        setRegisterModalOpen,
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
