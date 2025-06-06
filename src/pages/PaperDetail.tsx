
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPaperDetails } from '../utils/api';
import { Paper } from '../context/SearchContext';
import { Card } from "@/components/ui/card";
import {  toast } from "@/hooks/use-toast";
import { ArrowLeft, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import PaperDetail from '../components/PaperDetail';
import { useSearch } from '../context/SearchContext';
import { 
  addFavoritePaper, 
  removeFavoritePaper, 
  isPaperFavorite
} from '../utils/userPreferences';

const PaperDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [paper, setPaper] = useState<Paper | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useSearch();

  useEffect(() => {
    const fetchPaperDetails = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await getPaperDetails(id);
        setPaper(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
        setError(errorMessage);
        toast({
          title: "Erro ao carregar detalhes",
          description: errorMessage,
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPaperDetails();
  }, [id]);

  // Navigate back to the previous page
  const handleBack = () => {
    navigate(-1); // This will go back to the previous page in history, keeping the search results
  };

  const handleFavoritePaper = () => {
    if (!isAuthenticated || !currentUser || !paper) {
      toast({
        title: "Login necessário",
        description: "Faça login para favoritar artigos",
        variant: "destructive",
      });
      return;
    }

    const isFavorite = isPaperFavorite(currentUser.id, paper.paperId);
    
    if (isFavorite) {
      removeFavoritePaper(currentUser.id, paper.paperId);
      toast({
        title: "Artigo removido dos favoritos",
        description: "Artigo removido da sua lista de favoritos",
      });
    } else {
      // Fix the authors handling to properly handle both string[] and {name: string}[] types
      const authorsString = Array.isArray(paper.authors) 
        ? (typeof paper.authors[0] === 'string' 
            ? paper.authors.join(', ') 
            : paper.authors.map((a: any) => a.name).join(', '))
        : 'Autores não disponíveis';
      
      addFavoritePaper(currentUser.id, paper.paperId, paper.title, authorsString, paper.year);
      toast({
        title: "Artigo favoritado",
        description: "Artigo adicionado aos seus favoritos",
      });
    }
  };

  if (loading) {
    return (
      <div className="container py-8 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="mt-4 text-gray-600">Carregando detalhes da publicação...</p>
      </div>
    );
  }

  if (error || !paper) {
    return (
      <div className="container py-8 text-center">
        <p className="text-destructive">Erro ao carregar detalhes: {error || "Dados não encontrados"}</p>
        <Button className="mt-4" variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
        </Button>
      </div>
    );
  }

  const isFavorite = isAuthenticated && currentUser ? 
    isPaperFavorite(currentUser.id, paper.paperId) : false;

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Voltar para resultados
        </Button>
        
        {isAuthenticated && currentUser && (
          <Button
            variant={isFavorite ? "default" : "outline"}
            onClick={handleFavoritePaper}
            className="flex items-center gap-2"
          >
            {isFavorite ? (
              <>
                <BookmarkCheck size={16} />
                Salvo no perfil
              </>
            ) : (
              <>
                <Bookmark size={16} />
                Salvar no perfil
              </>
            )}
          </Button>
        )}
      </div>
      
      <Card className="mt-4 border-t-4 border-t-primary">
        <PaperDetail paper={paper} />
      </Card>
    </div>
  );
};

export default PaperDetailPage;
