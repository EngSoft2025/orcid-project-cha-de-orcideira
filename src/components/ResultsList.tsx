
import React from 'react';
import { useSearch } from '../context/SearchContext';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getPaperDetails, getAuthorDetails } from '../utils/api';
import { Paper, Author } from '../context/SearchContext';
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const ResultsList: React.FC = () => {
  const {
    buscaTipo,
    resultados,
    carregando,
    erro,
    setDetalheSelecionado,
    setDetalheCarregado,
    currentUser,
    isAuthenticated
  } = useSearch();
  
  const navigate = useNavigate();

  const handleViewDetails = async (item: Paper | Author) => {
    try {
      setDetalheCarregado(false);
      setDetalheSelecionado(item);
      
      let detailedItem;
      let detailPath = '';
      
      if (buscaTipo === 'papers') {
        console.log("Buscando detalhes do paper:", (item as Paper).paperId);
        detailedItem = await getPaperDetails((item as Paper).paperId);
        detailPath = `/paper/${(item as Paper).paperId}`;
      } else {
        console.log("Buscando detalhes do autor:", (item as Author).id);
        detailedItem = await getAuthorDetails((item as Author).id);
        detailPath = `/author/${(item as Author).id}`;
      }
      
      if (detailedItem) {
        console.log("Detalhes obtidos:", detailedItem);
        setDetalheSelecionado(detailedItem);
        
        navigate(detailPath);
        
        toast({
          title: "Detalhes carregados",
          description: `Detalhes de ${buscaTipo === 'papers' ? 'publicação' : 'autor'} carregados`,
        });
      } else {
        console.log("Nenhum detalhe encontrado, usando item original:", item);
        setDetalheSelecionado(item);
        
        navigate(detailPath);
        
        toast({
          title: "Informação limitada",
          description: "Detalhes parciais carregados",
        });
      }
      
      setDetalheCarregado(true);
    } catch (error) {
      console.error("Erro ao buscar detalhes:", error);
      setDetalheSelecionado(item);
      setDetalheCarregado(true);
      
      toast({
        title: "Erro ao carregar detalhes",
        description: error instanceof Error ? error.message : "Erro desconhecido",
        variant: "destructive",
      });
    }
  };

  if (carregando) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-12">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-gray-600">Buscando resultados...</p>
      </div>
    );
  }

  if (erro && resultados.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-12">
        <p className="text-gray-600">{erro}</p>
      </div>
    );
  }

  if (resultados.length === 0) {
    return (
      <div className="w-full max-w-3xl mx-auto text-center py-12">
        <p className="text-gray-600">Use a busca acima para encontrar {buscaTipo === 'papers' ? 'publicações' : 'autores'}.</p>
      </div>
    );
  }

  console.log("Renderizando lista de resultados:", resultados);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {resultados.length} {resultados.length === 1 ? 
          (buscaTipo === 'papers' ? 'resultado' : 'resultado') : 
          (buscaTipo === 'papers' ? 'resultados' : 'resultados')}
      </h2>
      
      <div className="space-y-4">
        {buscaTipo === 'papers' ? (
          // Paper results
          (resultados as Paper[]).map((paper) => (
            <Card key={paper.paperId} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{paper.title}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {Array.isArray(paper.authors) && paper.authors.join(', ')} 
                  {paper.year ? ` (${paper.year})` : ''}
                </p>
                {paper.abstract && (
                  <p className="text-gray-700 text-sm line-clamp-2 mb-1">
                    {paper.abstract}
                  </p>
                )}
                {paper.citationCount !== undefined && (
                  <p className="text-sm text-gray-500">
                    Citações: {paper.citationCount}
                  </p>
                )}
              </CardContent>
              <CardFooter className="bg-gray-50 border-t border-gray-100 px-6 py-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleViewDetails(paper)}
                  className="text-primary hover:text-primary-dark hover:bg-primary-light flex items-center gap-1"
                >
                  <span>Ver detalhes</span>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          // Author results
          (resultados as Author[]).map((author) => (
            <Card key={author.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{author.name}</h3>
                <p className="text-gray-600 text-sm mb-2">
                  {author.affiliations && author.affiliations.join(', ')}
                </p>
                {author.educationSummary && (
                  <p className="text-gray-700 text-sm mb-1">
                    {author.educationSummary}
                  </p>
                )}
                <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2">
                  {author.hIndex !== undefined && (
                    <p className="text-sm text-gray-500">
                      Índice H: {author.hIndex}
                    </p>
                  )}
                  {author.totalPublications !== undefined && (
                    <p className="text-sm text-gray-500">
                      Publicações: {author.totalPublications}
                    </p>
                  )}
                  {author.totalCitations !== undefined && (
                    <p className="text-sm text-gray-500">
                      Citações: {author.totalCitations}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 border-t border-gray-100 px-6 py-3">
                <Button 
                  variant="outline" 
                  onClick={() => handleViewDetails(author)}
                  className="text-primary hover:text-primary-dark hover:bg-primary-light flex items-center gap-1"
                >
                  <span>Ver perfil</span>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default ResultsList;
