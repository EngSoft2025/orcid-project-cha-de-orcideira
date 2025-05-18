
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

const RegisterPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [orcidId, setOrcidId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Validation functions
  const validateOrcidId = (value: string) => {
    const orcidPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return orcidPattern.test(value);
  };

  const validateEmail = (value: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };

  const validatePassword = (value: string) => {
    return value.length >= 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateOrcidId(orcidId)) {
      toast({
        title: 'ORCID ID Inválido',
        description: 'Por favor, insira um ORCID ID válido no formato 0000-0000-0000-0000.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!validateEmail(email)) {
      toast({
        title: 'Email Inválido',
        description: 'Por favor, insira um endereço de email válido.',
        variant: 'destructive',
      });
      return;
    }
    
    if (!validatePassword(password)) {
      toast({
        title: 'Senha Inválida',
        description: 'A senha deve ter pelo menos 6 caracteres.',
        variant: 'destructive',
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await register({
        name: `${firstName} ${lastName}`,
        email,
        orcidId,
        password,
      });
      
      toast({
        title: 'Registro bem-sucedido',
        description: 'Sua conta foi criada com sucesso.',
      });
      
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro no registro',
        description: 'Ocorreu um erro ao criar sua conta. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 flex flex-col items-center">
          <Logo size="md" withText={false} />
          <CardTitle className="text-2xl text-center mt-2">
            Cadastrar-se no Chá de Orquideira
          </CardTitle>
          <CardDescription className="text-center">
            Crie sua conta para acessar todos os recursos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nome</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Sobrenome</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {email && !validateEmail(email) && (
                <p className="text-xs text-destructive">
                  Por favor, insira um email válido
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="orcidId">ORCID ID</Label>
              <Input
                id="orcidId"
                placeholder="0000-0000-0000-0000"
                value={orcidId}
                onChange={(e) => setOrcidId(e.target.value)}
                required
              />
              {orcidId && !validateOrcidId(orcidId) && (
                <p className="text-xs text-destructive">
                  ORCID ID deve estar no formato 0000-0000-0000-0000
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {password && !validatePassword(password) && (
                <p className="text-xs text-destructive">
                  A senha deve ter pelo menos 6 caracteres
                </p>
              )}
            </div>
            
            <Button
              type="submit"
              className="w-full bg-tea hover:bg-tea-dark"
              disabled={isLoading}
            >
              {isLoading ? 'Cadastrando...' : 'Confirmar Registro'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center text-muted-foreground">
            Já tem uma conta?{' '}
            <Link to="/login" className="text-tea hover:underline">
              Fazer login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;
