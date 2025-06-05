
interface UserFavorites {
  userId: string;
  favoritePapers: Array<{
    paperId: string;
    title: string;
    authors: string;
    year?: number;
  }>;
  followedAuthors: Array<{
    authorId: string;
    name: string;
  }>;
}

const USER_PREFERENCES_KEY = 'cha_orcideira_preferences';

// Função para obter preferências do usuário
export const getUserPreferences = (userId: string): UserFavorites => {
  try {
    const preferencesJson = localStorage.getItem(USER_PREFERENCES_KEY);
    const allPreferences: UserFavorites[] = preferencesJson ? JSON.parse(preferencesJson) : [];
    
    const userPrefs = allPreferences.find(pref => pref.userId === userId);
    
    if (userPrefs) {
      return userPrefs;
    } else {
      // Criar preferências vazias para o usuário
      const newPrefs: UserFavorites = {
        userId,
        favoritePapers: [],
        followedAuthors: []
      };
      allPreferences.push(newPrefs);
      localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(allPreferences));
      return newPrefs;
    }
  } catch (error) {
    console.error('Erro ao ler preferências do usuário:', error);
    return {
      userId,
      favoritePapers: [],
      followedAuthors: []
    };
  }
};

// Função para salvar preferências
const saveUserPreferences = (preferences: UserFavorites): void => {
  try {
    const preferencesJson = localStorage.getItem(USER_PREFERENCES_KEY);
    const allPreferences: UserFavorites[] = preferencesJson ? JSON.parse(preferencesJson) : [];
    
    const userIndex = allPreferences.findIndex(pref => pref.userId === preferences.userId);
    
    if (userIndex >= 0) {
      allPreferences[userIndex] = preferences;
    } else {
      allPreferences.push(preferences);
    }
    
    localStorage.setItem(USER_PREFERENCES_KEY, JSON.stringify(allPreferences));
  } catch (error) {
    console.error('Erro ao salvar preferências do usuário:', error);
  }
};

// Função para adicionar paper aos favoritos com metadados
export const addFavoritePaper = (userId: string, paperId: string, title?: string, authors?: string, year?: number): void => {
  const preferences = getUserPreferences(userId);
  
  const existingPaper = preferences.favoritePapers.find(paper => paper.paperId === paperId);
  if (!existingPaper) {
    preferences.favoritePapers.push({
      paperId,
      title: title || 'Título não disponível',
      authors: authors || 'Autores não disponíveis',
      year
    });
    saveUserPreferences(preferences);
    console.log('Paper adicionado aos favoritos:', paperId);
  }
};

// Função para remover paper dos favoritos
export const removeFavoritePaper = (userId: string, paperId: string): void => {
  const preferences = getUserPreferences(userId);
  preferences.favoritePapers = preferences.favoritePapers.filter(paper => paper.paperId !== paperId);
  saveUserPreferences(preferences);
  console.log('Paper removido dos favoritos:', paperId);
};

// Função para verificar se paper está nos favoritos
export const isPaperFavorite = (userId: string, paperId: string): boolean => {
  const preferences = getUserPreferences(userId);
  return preferences.favoritePapers.some(paper => paper.paperId === paperId);
};

// Função para seguir autor com metadados
export const followAuthor = (userId: string, authorId: string, authorName?: string): void => {
  const preferences = getUserPreferences(userId);
  
  const existingAuthor = preferences.followedAuthors.find(author => author.authorId === authorId);
  if (!existingAuthor) {
    preferences.followedAuthors.push({
      authorId,
      name: authorName || 'Nome não disponível'
    });
    saveUserPreferences(preferences);
    console.log('Autor seguido:', authorId);
  }
};

// Função para deixar de seguir autor
export const unfollowAuthor = (userId: string, authorId: string): void => {
  const preferences = getUserPreferences(userId);
  preferences.followedAuthors = preferences.followedAuthors.filter(author => author.authorId !== authorId);
  saveUserPreferences(preferences);
  console.log('Autor não seguido:', authorId);
};

// Função para verificar se está seguindo autor
export const isFollowingAuthor = (userId: string, authorId: string): boolean => {
  const preferences = getUserPreferences(userId);
  return preferences.followedAuthors.some(author => author.authorId === authorId);
};

// Função para obter papers favoritos do usuário
export const getFavoritePapers = (userId: string) => {
  const preferences = getUserPreferences(userId);
  return preferences.favoritePapers;
};

// Função para obter autores seguidos pelo usuário
export const getFollowedAuthors = (userId: string) => {
  const preferences = getUserPreferences(userId);
  return preferences.followedAuthors;
};
