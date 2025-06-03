// Componemte da barra de busca

import React from 'react';
import { Search } from 'lucide-react';
import { useSearch } from '../context/SearchContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { searchPapers, searchAuthors } from '../utils/api';
import { toast } from "@/hooks/use-toast";

const SearchBar: React.FC = () => {
  const {
    buscaTipo,
    setBuscaTipo,
    termoBusca,
    setTermoBusca,
    setResultados,
    setCarregando,
    setErro,
  } = useSearch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!termoBusca.trim()) {
      setErro("Digite um termo para buscar");
      toast({
        title: "Erro na busca",
        description: "Digite um termo para buscar",
        variant: "destructive",
      });
      return;
    }

    setCarregando(true);
    setErro(null);
    
    try {
      console.log(`Buscando ${buscaTipo === 'papers' ? 'publicações' : 'autores'} com termo: ${termoBusca}`);
      
      let results;
      if (buscaTipo === 'papers') {
        results = await searchPapers(termoBusca);
      } else {
        results = await searchAuthors(termoBusca);
      }
      
      console.log("Resultados obtidos:", results);
      // Guarda os resultados obtidos
      setResultados(results);
      
      if (results.length === 0) {
        setErro(`Nenhum resultado encontrado para "${termoBusca}"`);
        toast({
          title: "Sem resultados",
          description: `Nenhum resultado encontrado para "${termoBusca}"`,
        });
      } else {
        toast({
          title: "Busca concluída",
          description: `Encontrados ${results.length} resultados para "${termoBusca}"`,
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      console.error("Erro na busca:", errorMessage);
      setErro(`Erro ao buscar: ${errorMessage}`);
      toast({
        title: "Erro na busca",
        description: errorMessage,
        variant: "destructive",
      });
      setResultados([]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mt-8 mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-shrink-0">
          <Select
            value={buscaTipo}
            onValueChange={(value) => setBuscaTipo(value as 'papers' | 'authors')}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Buscar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="papers">Publicações</SelectItem>
              <SelectItem value="authors">Autores</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-1 gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            <Input
              type="text"
              placeholder={buscaTipo === 'papers' ? "Buscar publicações por título, autor..." : "Buscar pesquisadores por nome, instituição..."}
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button type="submit" className="bg-primary hover:bg-primary-dark">
            Buscar
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;
