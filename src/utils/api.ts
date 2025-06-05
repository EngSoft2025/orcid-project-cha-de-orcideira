
import { Paper, Author } from '../context/SearchContext';
import { registerUser, authenticateUser } from './userStorage';

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

    // Filtra apenas os autores que possuem ORCID
    /*
    const autoresComOrcid = data.data.filter(
      (author: any) => author.externalIds?.ORCID
    );*/

    //return autoresComOrcid.map(transformAuthorData);
    return data.data.map(transformPaperData);
  } catch (error) {
    console.error('Erro ao buscar autores:', error);
    throw error;
  }
};

// pesquisa autores por meio da api do orcid
export const searchAuthorsOrcid = async (query: string): Promise<Author[]> => {
  const SCOPUS_API_KEY = 'f96e8755d0a2d3b7be294c08b33d9ab2'; // Substitua pela sua chave da Elsevier

  try {
    const response = await fetch(
      `https://pub.orcid.org/v3.0/search/?q=${encodeURIComponent(query)}`,
      { headers: { Accept: 'application/json' } }
    );

    if (!response.ok) {
      throw new Error(`Erro na busca ORCID: ${response.status}`);
    }

    const data = await response.json();
    const entries = data.result || [];

    const authors = await Promise.all(
      entries.slice(0, 10).map(async (entry: any) => {
        const orcidId = entry?.['orcid-identifier']?.path;
        if (!orcidId) return null;

        try {
          const profileRes = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/person`, {
            headers: { Accept: 'application/json' },
          });

          if (!profileRes.ok) return null;

          const profile = await profileRes.json();

          const givenNames = profile.name?.['given-names']?.value || '';
          const familyName = profile.name?.['family-name']?.value || '';
          const fullName = `${givenNames} ${familyName}`.trim();

          // Valores padrão
          let hIndex = 0;
          let totalCitations = 0;
          let totalPublications = 0;

          // Busca dados da Scopus
          try {
            const scopusRes = await fetch(
              `https://api.elsevier.com/content/author/orcid/${orcidId}?apiKey=${SCOPUS_API_KEY}&httpAccept=application/json`
            );

            if (scopusRes.ok) {
              const scopusData = await scopusRes.json();
              const entry = scopusData['author-retrieval-response']?.[0];

              if (entry) {
                hIndex = parseInt(entry['h-index'] || '0', 10);
                totalCitations = parseInt(entry['citation-count'] || '0', 10);
                totalPublications = parseInt(entry['document-count'] || '0', 10);
              }
            } else {
              console.warn(`Scopus API retornou status ${scopusRes.status} para ORCID ${orcidId}`);
            }
          } catch (scopusErr) {
            console.warn(`Erro ao buscar dados Scopus para ${orcidId}:`, scopusErr);
          }

          return {
            id: orcidId,
            orcidId,
            name: fullName || orcidId,
            affiliations: [],
            hIndex,
            totalPublications,
            totalCitations,
            educationSummary: '',
            educationDetails: [],
            professionalExperiences: [],
            personalPageUrl: `https://orcid.org/${orcidId}`,
            publications: [],
            biography: '',
          } as Author;
        } catch {
          return null;
        }
      })
    );

    return authors.filter((a): a is Author => a !== null);
  } catch (err) {
    console.error('Erro na busca via ORCID:', err);
    throw err;
  }
};



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
export const getAuthorDetails = async (orcidId: string): Promise<Author | null> => {
  const SCOPUS_API_KEY = 'f96e8755d0a2d3b7be294c08b33d9ab2';

  try {

    // 1. Busca dados do ORCID (perfil pessoal)
    const personRes = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/person`, {
      headers: { Accept: 'application/json' }
    });

    if (!personRes.ok) {
      throw new Error(`Erro ao buscar dados pessoais ORCID: ${personRes.status} ${personRes.statusText}`);
    }

    const personData = await personRes.json();
    // 2. Busca trabalhos do ORCID
    const worksRes = await fetch(`https://pub.orcid.org/v3.0/${orcidId}/works`, {
      headers: { Accept: 'application/json' }
    });

    if (!worksRes.ok) {
      throw new Error(`Erro ao buscar trabalhos ORCID: ${worksRes.status} ${worksRes.statusText}`);
    }

    const worksData = await worksRes.json();

    // Extrai nome
    const givenNames = personData.name?.['given-names']?.value || '';
    const familyName = personData.name?.['family-name']?.value || '';
    const fullName = `${givenNames} ${familyName}`.trim();

    // Monta lista simples de publicações ORCID
    const publications = worksData.group?.map((groupItem: any) => {
      const workSummary = groupItem['work-summary']?.[0];
      return {
        title: workSummary?.title?.title?.value || '',
        year: workSummary?.publicationDate?.year?.value || '',
        journal: workSummary?.journalTitle?.value || '',
        externalId: workSummary?.externalIds?.['external-id']?.[0]?.value || '',
      };
    }) || [];

    // 3. Busca dados bibliométricos pela Scopus usando ORCID
    let hIndex = 0;
    let totalCitations = 0;
    let totalPublications = publications.length;

    try {

      const scopusRes = await fetch(
        `https://api.elsevier.com/content/author/orcid/${orcidId}?apiKey=${SCOPUS_API_KEY}&httpAccept=application/json`
      );

      if (scopusRes.ok) {
        const scopusData = await scopusRes.json();
        console.log('[DEBUG] Dados Scopus:', scopusData);

        const entry = scopusData['author-retrieval-response']?.[0];
        if (entry) {
          hIndex = parseInt(entry['h-index'] || '0', 10);
          totalCitations = parseInt(entry['citation-count'] || '0', 10);
          totalPublications = parseInt(entry['document-count'] || totalPublications.toString(), 10);
        }
      } else {
        console.warn(`[WARN] Scopus API retornou status ${scopusRes.status} para ORCID ${orcidId}`);
      }
    } catch (scopusErr) {
      console.warn(`[WARN] Erro ao buscar dados Scopus para ${orcidId}:`, scopusErr);
    }

    // Monta o objeto final Author
    const author: Author = {
      id: orcidId,
      orcidId,
      name: fullName || orcidId,
      affiliations: [], // poderia adicionar futuramente pegando do ORCID (exemplo: employment)
      hIndex,
      totalPublications,
      totalCitations,
      educationSummary: '',
      educationDetails: [],
      professionalExperiences: [],
      personalPageUrl: `https://orcid.org/${orcidId}`,
      publications,
      biography: '',
    };

    console.log('[DEBUG] Autor final:', author);
    return author;
  } catch (error) {
    console.error('[ERROR] Erro ao buscar detalhes do autor:', error);
    return null;
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

// Função para registrar usuário usando localStorage
export const register = async (userData: RegisterData): Promise<void> => {
  console.log('Registrando usuário:', userData);
  
  // Simulando um tempo de resposta para manter a UX consistente
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Validação básica
        if (!userData.email || !userData.senha || !userData.nome || !userData.sobrenome) {
          reject(new Error('Dados de usuário incompletos'));
          return;
        }
        
        // Registrar usuário usando o sistema de armazenamento local
        registerUser(userData);
        
        console.log('Usuário registrado com sucesso');
        resolve();
      } catch (error) {
        console.error('Erro no registro:', error);
        reject(error);
      }
    }, 1000);
  });
};

// Função para login de usuário usando localStorage
export const login = async (email: string, senha: string): Promise<{ token: string; user: any }> => {
  console.log('Tentativa de login:', { email });
  
  // Simulando chamada de API
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Validação básica
        if (!email || !senha) {
          reject(new Error('Email e senha são obrigatórios'));
          return;
        }
        
        // Autenticar usando o sistema de armazenamento local
        const user = authenticateUser(email, senha);
        
        if (user) {
          console.log('Login bem-sucedido');
          resolve({ 
            token: 'local-token-' + user.id,
            user: {
              id: user.id,
              nome: user.nome,
              sobrenome: user.sobrenome,
              email: user.email,
              orcidId: user.orcidId
            }
          });
        } else {
          reject(new Error('Email ou senha incorretos'));
        }
      } catch (error) {
        console.error('Erro no login:', error);
        reject(new Error('Erro interno do sistema'));
      }
    }, 1000);
  });
};
