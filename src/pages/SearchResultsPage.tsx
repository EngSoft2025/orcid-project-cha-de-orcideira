
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ResearcherCard from '../components/ResearcherCard';
import PaperCard from '../components/PaperCard';
import { searchPapers, searchResearchers, type Paper, type Researcher } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q') || '';
  
  const [activeTab, setActiveTab] = useState<'researchers' | 'papers'>('researchers');
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [papers, setPapers] = useState<Paper[]>([]);
  
  useEffect(() => {
    if (query) {
      setResearchers(searchResearchers(query));
      setPapers(searchPapers(query));
    }
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-muted py-4 border-b">
        <div className="container mx-auto px-4">
          <SearchBar compact />
        </div>
      </div>
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">
            Resultados para "{query}"
          </h1>
          <p className="text-muted-foreground">
            Encontrados {researchers.length} pesquisadores e {papers.length} artigos
          </p>
        </div>
        
        <Tabs defaultValue="researchers" value={activeTab} onValueChange={(v) => setActiveTab(v as 'researchers' | 'papers')}>
          <TabsList className="mb-6">
            <TabsTrigger value="researchers">Pesquisadores ({researchers.length})</TabsTrigger>
            <TabsTrigger value="papers">Artigos ({papers.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="researchers" className="animate-fade-in">
            {researchers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {researchers.map((researcher) => (
                  <ResearcherCard key={researcher.id} researcher={researcher} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum pesquisador encontrado para "{query}"</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="papers" className="animate-fade-in">
            {papers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {papers.map((paper) => (
                  <PaperCard key={paper.id} paper={paper} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum artigo encontrado para "{query}"</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default SearchResultsPage;
