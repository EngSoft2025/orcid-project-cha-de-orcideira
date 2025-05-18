
// Mock data for papers and researchers

export type Paper = {
  id: string;
  title: string;
  authors: string[];
  abstract: string;
  journal: string;
  year: number;
  citations: number;
  doi?: string;
};

export type Researcher = {
  id: string;
  name: string;
  orcidId: string;
  avatar?: string;
  bio: string;
  institution: string;
  country: string;
  hIndex: number;
  citations: Record<number, number>; // year -> citation count
  publications: Record<number, number>; // year -> publication count
  jobs: Array<{
    role: string;
    organization: string;
    startDate: string;
    endDate?: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    startDate: string;
    endDate?: string;
    field?: string;
  }>;
  works: Array<{
    id: string;
    title: string;
    year: number;
    citations: number;
  }>;
};

export const MOCK_PAPERS: Paper[] = [
  {
    id: '1',
    title: 'A comprehensive review of orchid conservation strategies',
    authors: ['João Silva', 'Maria Oliveira', 'Carlos Santos'],
    abstract: 'This paper presents a systematic review of conservation strategies for endangered orchid species worldwide, analyzing the effectiveness of in-situ and ex-situ approaches.',
    journal: 'Conservation Biology',
    year: 2023,
    citations: 35,
    doi: '10.1234/conserv.2023.001'
  },
  {
    id: '2',
    title: 'Molecular phylogeny of Neotropical Orchidaceae',
    authors: ['Maria Oliveira', 'Pedro Costa'],
    abstract: 'A comprehensive molecular analysis of phylogenetic relationships among Neotropical orchid species, using DNA sequencing and bioinformatic approaches.',
    journal: 'Plant Systematics and Evolution',
    year: 2022,
    citations: 42,
    doi: '10.1234/plantevol.2022.003'
  },
  {
    id: '3',
    title: 'Climate change impacts on orchid populations in rainforest fragments',
    authors: ['Carlos Santos', 'Ana Lima', 'João Silva'],
    abstract: 'This study examines how climate change is affecting orchid populations in fragmented Atlantic Rainforest areas in Brazil, using long-term monitoring data.',
    journal: 'Global Change Biology',
    year: 2021,
    citations: 76,
    doi: '10.1234/gcb.2021.015'
  },
  {
    id: '4',
    title: 'Pollinator networks of epiphytic orchids in tropical ecosystems',
    authors: ['Ana Lima', 'Roberto Martins'],
    abstract: 'An analysis of pollinator networks associated with epiphytic orchids in tropical ecosystems, revealing complex interaction patterns and specialized relationships.',
    journal: 'Journal of Ecology',
    year: 2023,
    citations: 18,
    doi: '10.1234/jecol.2023.008'
  },
  {
    id: '5',
    title: 'In vitro propagation techniques for rare orchid species',
    authors: ['Roberto Martins', 'Maria Oliveira', 'Pedro Costa'],
    abstract: 'Development and optimization of in vitro propagation protocols for conservation of rare and endangered orchid species, with focus on Brazilian endemics.',
    journal: 'Plant Cell, Tissue and Organ Culture',
    year: 2022,
    citations: 29,
    doi: '10.1234/pctoc.2022.011'
  },
];

export const MOCK_RESEARCHERS: Researcher[] = [
  {
    id: '1',
    name: 'João Silva',
    orcidId: '0000-0001-2345-6789',
    avatar: 'https://i.pravatar.cc/150?img=11',
    bio: 'Professor of Plant Ecology specializing in orchid conservation and population dynamics in fragmented habitats.',
    institution: 'Universidade de São Paulo',
    country: 'Brazil',
    hIndex: 24,
    citations: {
      2018: 120,
      2019: 145,
      2020: 187,
      2021: 210,
      2022: 236,
      2023: 265
    },
    publications: {
      2018: 4,
      2019: 3,
      2020: 5,
      2021: 4,
      2022: 6,
      2023: 3
    },
    jobs: [
      {
        role: 'Professor Associado',
        organization: 'Universidade de São Paulo',
        startDate: '2015-01',
        endDate: undefined
      },
      {
        role: 'Professor Assistente',
        organization: 'Universidade de São Paulo',
        startDate: '2010-01',
        endDate: '2014-12'
      },
      {
        role: 'Pesquisador Pós-Doutoral',
        organization: 'Royal Botanic Gardens, Kew',
        startDate: '2008-06',
        endDate: '2009-12'
      }
    ],
    education: [
      {
        degree: 'PhD',
        institution: 'Universidade de São Paulo',
        field: 'Biologia Vegetal',
        startDate: '2004-03',
        endDate: '2008-05'
      },
      {
        degree: 'Mestrado',
        institution: 'Universidade Estadual de Campinas',
        field: 'Ecologia',
        startDate: '2002-03',
        endDate: '2004-02'
      },
      {
        degree: 'Bacharelado',
        institution: 'Universidade de São Paulo',
        field: 'Ciências Biológicas',
        startDate: '1998-03',
        endDate: '2001-12'
      }
    ],
    works: MOCK_PAPERS.filter(p => p.authors.includes('João Silva')).map(paper => ({
      id: paper.id,
      title: paper.title,
      year: paper.year,
      citations: paper.citations
    }))
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    orcidId: '0000-0002-3456-7890',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Research scientist focused on molecular systematics and phylogenetics of Neotropical orchids, with emphasis on evolutionary biology.',
    institution: 'Universidade Estadual de Campinas',
    country: 'Brazil',
    hIndex: 18,
    citations: {
      2018: 87,
      2019: 103,
      2020: 118,
      2021: 145,
      2022: 178,
      2023: 205
    },
    publications: {
      2018: 3,
      2019: 4,
      2020: 2,
      2021: 5,
      2022: 3,
      2023: 4
    },
    jobs: [
      {
        role: 'Professora Doutora',
        organization: 'Universidade Estadual de Campinas',
        startDate: '2016-07',
        endDate: undefined
      },
      {
        role: 'Pesquisadora',
        organization: 'Instituto Nacional de Pesquisas da Amazônia',
        startDate: '2013-01',
        endDate: '2016-06'
      }
    ],
    education: [
      {
        degree: 'PhD',
        institution: 'University of California, Berkeley',
        field: 'Plant Biology',
        startDate: '2008-09',
        endDate: '2012-12'
      },
      {
        degree: 'Mestrado',
        institution: 'Universidade Estadual de Campinas',
        field: 'Biologia Vegetal',
        startDate: '2006-03',
        endDate: '2008-07'
      },
      {
        degree: 'Bacharelado',
        institution: 'Universidade Estadual de Campinas',
        field: 'Ciências Biológicas',
        startDate: '2002-03',
        endDate: '2005-12'
      }
    ],
    works: MOCK_PAPERS.filter(p => p.authors.includes('Maria Oliveira')).map(paper => ({
      id: paper.id,
      title: paper.title,
      year: paper.year,
      citations: paper.citations
    }))
  },
  {
    id: '3',
    name: 'Carlos Santos',
    orcidId: '0000-0003-4567-8901',
    avatar: 'https://i.pravatar.cc/150?img=12',
    bio: 'Ecologist studying the effects of climate change on plant-pollinator interactions, particularly orchid species in fragmented landscapes.',
    institution: 'Universidade Federal do Rio de Janeiro',
    country: 'Brazil',
    hIndex: 16,
    citations: {
      2018: 72,
      2019: 89,
      2020: 104,
      2021: 132,
      2022: 156,
      2023: 184
    },
    publications: {
      2018: 2,
      2019: 3,
      2020: 4,
      2021: 3,
      2022: 2,
      2023: 5
    },
    jobs: [
      {
        role: 'Professor Adjunto',
        organization: 'Universidade Federal do Rio de Janeiro',
        startDate: '2017-03',
        endDate: undefined
      },
      {
        role: 'Pesquisador Visitante',
        organization: 'Smithsonian Tropical Research Institute',
        startDate: '2015-01',
        endDate: '2017-02'
      }
    ],
    education: [
      {
        degree: 'PhD',
        institution: 'Universidade de São Paulo',
        field: 'Ecologia',
        startDate: '2010-03',
        endDate: '2014-12'
      },
      {
        degree: 'Mestrado',
        institution: 'Universidade Federal do Rio de Janeiro',
        field: 'Ecologia',
        startDate: '2008-03',
        endDate: '2010-02'
      },
      {
        degree: 'Bacharelado',
        institution: 'Universidade Federal do Rio de Janeiro',
        field: 'Ciências Biológicas',
        startDate: '2004-03',
        endDate: '2007-12'
      }
    ],
    works: MOCK_PAPERS.filter(p => p.authors.includes('Carlos Santos')).map(paper => ({
      id: paper.id,
      title: paper.title,
      year: paper.year,
      citations: paper.citations
    }))
  }
];

// Helper functions
export const searchPapers = (query: string): Paper[] => {
  const lowercaseQuery = query.toLowerCase();
  return MOCK_PAPERS.filter(paper => 
    paper.title.toLowerCase().includes(lowercaseQuery) ||
    paper.abstract.toLowerCase().includes(lowercaseQuery) ||
    paper.authors.some(author => author.toLowerCase().includes(lowercaseQuery))
  );
};

export const searchResearchers = (query: string): Researcher[] => {
  const lowercaseQuery = query.toLowerCase();
  return MOCK_RESEARCHERS.filter(researcher => 
    researcher.name.toLowerCase().includes(lowercaseQuery) ||
    researcher.bio.toLowerCase().includes(lowercaseQuery) ||
    researcher.institution.toLowerCase().includes(lowercaseQuery)
  );
};
