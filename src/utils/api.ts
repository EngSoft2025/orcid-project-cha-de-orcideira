// Implementa um serviço de integração com a API do Semantic Scholar
// Funções de Cadastro e Login

import { Paper, Author } from '../context/SearchContext';

// A API permite até 100 solicitações a cada 5 minutos
const API_BASE_URL = 'https://api.semanticscholar.org/graph/v1';

// Transforma os dados do paper vindo da API para o formato que usamos internamente
const transformPaperData = (paperData: any): Paper => {
  return {
    paperId: paperData.paperId,
    title: paperData.title || 'Sem título',
    authors: Array.isArray(paperData.authors)
      ? paperData.authors.map((author: any) => (typeof author === 'string' ? author : author.name))
      : [],
    year: paperData.year,
    abstract: paperData.abstract,
    citationCount: paperData.citationCount,
    fieldsOfStudy: paperData.fieldsOfStudy || [],
    doi: paperData.externalIds?.DOI || '',
    references: Array.isArray(paperData.references) ? paperData.references.map(transformPaperData) : [],
  };
};

// Transforma os dados do autor vindo da API para o formato que usamos internamente
const transformAuthorData = (authorData: any): Author => {
  return {
    id: authorData.authorId || authorData.id,
    name: authorData.name || 'Nome não disponível',
    orcidId: authorData.externalIds?.ORCID || '',
    affiliations: Array.isArray(authorData.affiliations) ? authorData.affiliations : [],
    hIndex: authorData.hIndex,
    totalPublications: authorData.paperCount,
    totalCitations: authorData.citationCount,
    educationSummary: authorData.education || '',
    educationDetails: authorData.educationHistory || authorData.educationalDetails || [],
    professionalExperiences: authorData.workHistory || authorData.experiences || [],
    personalPageUrl: authorData.homepage || '',
    publications: Array.isArray(authorData.papers) ? authorData.papers.map(transformPaperData) : [],
    biography: authorData.bio || authorData.biography || '',
  };
};

// Função para buscar papers
export const searchPapers = async (query: string): Promise<Paper[]> => {
  try {
    console.log(`Fazendo busca de papers com query: ${query}`);
    const response = await fetch(
      `${API_BASE_URL}/paper/search?query=${encodeURIComponent(query)}&fields=paperId,title,authors,citationCount,year,abstract,externalIds&limit=10`
    );
    
    if (!response.ok) {
      throw new Error(`Erro na busca: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Resultados da API de papers:', data);
    
    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }
    
    return data.data.map(transformPaperData);
  } catch (error) {
    console.error('Erro ao buscar papers:', error);
    throw error;
  }
};

// Função para buscar autores
export const searchAuthors = async (query: string): Promise<Author[]> => {
  try {
    console.log(`Fazendo busca de autores com query: ${query}`);
    const response = await fetch(
      `${API_BASE_URL}/author/search?query=${encodeURIComponent(query)}&fields=authorId,name,affiliations,homepage,papers,hIndex,paperCount,citationCount,externalIds&limit=10`
    );
    
    if (!response.ok) {
      throw new Error(`Erro na busca: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Resultados da API de autores:', data);
    
    if (!data.data || !Array.isArray(data.data)) {
      return [];
    }
    
    return data.data.map(transformAuthorData);
  } catch (error) {
    console.error('Erro ao buscar autores:', error);
    throw error;
  }
};

// **** Contém possível erro ****
// Função para buscar detalhes de um paper específico
export const getPaperDetails = async (paperId: string): Promise<Paper | null> => {
  try {
    console.log(`Buscando detalhes do paper ID: ${paperId}`);
    const response = await fetch(
      `${API_BASE_URL}/paper/${paperId}?fields=paperId,title,authors,citationCount,year,abstract,references,fieldsOfStudy,externalIds`
    );
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Detalhes do paper obtidos:', data);
    return transformPaperData(data);
  } catch (error) {
    console.error('Erro ao buscar detalhes do paper:', error);
    throw error;
  }
};

// Função para buscar detalhes de um autor específico
export const getAuthorDetails = async (authorId: string): Promise<Author | null> => {
  try {
    console.log(`Buscando detalhes do autor ID: ${authorId}`);
    const response = await fetch(
      `${API_BASE_URL}/author/${authorId}?fields=authorId,name,affiliations,homepage,papers.title,papers.year,papers.citationCount,papers.authors,papers.paperId,hIndex,paperCount,citationCount,externalIds`
    );
    
    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Detalhes do autor obtidos:', data);
    return transformAuthorData(data);
  } catch (error) {
    console.error('Erro ao buscar detalhes do autor:', error);
    throw error;
  }
};

// Interface para os dados de registro
interface RegisterData {
  nome: string;
  sobrenome: string;
  email: string;
  orcidId?: string;
  senha: string;
}

// Função para registrar usuário (simulada pois não temos backend)
export const register = async (userData: RegisterData): Promise<void> => {
  console.log('Registrando usuário:', userData);
  
  // Simulando chamada de API
  return new Promise((resolve, reject) => {
    // Simulando um tempo de resposta
    setTimeout(() => {
      if (userData.email && userData.senha && userData.nome && userData.sobrenome) {
        console.log('Usuário registrado com sucesso');
        resolve();
      } else {
        reject(new Error('Dados de usuário incompletos'));
      }
    }, 1000);
  });
};

// Função para login de usuário (simulada pois não temos backend)
export const login = async (email: string, senha: string): Promise<{ token: string }> => {
  console.log('Tentativa de login:', { email });
  
  // Simulando chamada de API
  return new Promise((resolve, reject) => {
    // Simulando um tempo de resposta
    setTimeout(() => {
      // Simulando credenciais válidas para demonstração
      if (email === "joao.silva@email.com" && senha === "senha123") {
        console.log('Login bem-sucedido');
        resolve({ token: 'simulado-token' });
      } else {
        reject(new Error('Email ou senha incorretos'));
      }
    }, 1000);
  });
};
