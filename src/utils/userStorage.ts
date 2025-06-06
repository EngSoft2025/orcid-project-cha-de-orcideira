
interface UserData {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  orcidId?: string;
  senha: string;
  createdAt: string;
}

const USERS_STORAGE_KEY = 'cha_orcideira_users';

// Função para obter todos os usuários do localStorage
export const getUsers = (): UserData[] => {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Erro ao ler dados dos usuários:', error);
    return [];
  }
};

// Função para salvar usuários no localStorage
const saveUsers = (users: UserData[]): void => {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Erro ao salvar dados dos usuários:', error);
    throw new Error('Erro ao salvar dados do usuário');
  }
};

// Função para verificar se email já existe
export const emailExists = (email: string): boolean => {
  const users = getUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
};

// Função para verificar se ORCID ID já existe
export const orcidExists = (orcidId: string): boolean => {
  if (!orcidId) return false;
  const users = getUsers();
  return users.some(user => user.orcidId === orcidId);
};

// Função para registrar um novo usuário
export const registerUser = (userData: Omit<UserData, 'id' | 'createdAt'>): UserData => {
  const users = getUsers();
  
  // Verificar se email já existe
  if (emailExists(userData.email)) {
    throw new Error('Este email já está cadastrado');
  }
  
  // Verificar se ORCID ID já existe (se fornecido)
  if (userData.orcidId && orcidExists(userData.orcidId)) {
    throw new Error('Este ORCID ID já está cadastrado');
  }
  
  // Criar novo usuário
  const newUser: UserData = {
    ...userData,
    id: generateUserId(),
    createdAt: new Date().toISOString(),
  };
  
  // Adicionar à lista e salvar
  users.push(newUser);
  saveUsers(users);
  
  console.log('Usuário registrado com sucesso:', newUser.email);
  return newUser;
};

// Função para autenticar usuário
export const authenticateUser = (email: string, senha: string): UserData | null => {
  const users = getUsers();
  const user = users.find(user => 
    user.email.toLowerCase() === email.toLowerCase() && user.senha === senha
  );
  
  if (user) {
    console.log('Login bem-sucedido para:', user.email);
    return user;
  } else {
    console.log('Credenciais inválidas para:', email);
    return null;
  }
};

// Função para gerar ID único do usuário
const generateUserId = (): string => {
  return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Função para obter usuário por email
export const getUserByEmail = (email: string): UserData | null => {
  const users = getUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
};

// Função para exportar dados (para debug/backup)
export const exportUserData = (): string => {
  return JSON.stringify(getUsers(), null, 2);
};

// Função para importar dados (para debug/backup)
export const importUserData = (jsonData: string): void => {
  try {
    const users = JSON.parse(jsonData);
    saveUsers(users);
  } catch (error) {
    throw new Error('Formato JSON inválido');
  }
};
