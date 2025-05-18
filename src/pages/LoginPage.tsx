
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

const LoginPage: React.FC = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(identifier, password);
      toast({
        title: 'Login bem-sucedido',
        description: 'Você foi autenticado com sucesso.',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Erro de autenticação',
        description: 'Credenciais inválidas. Tente novamente.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Validate ORCID ID format (0000-0000-0000-0000)
  const validateIdentifier = (value: string) => {
    const orcidPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    return orcidPattern.test(value) || value.includes('@');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 flex flex-col items-center">
          <Logo size="md" withText={false} />
          <CardTitle className="text-2xl text-center mt-2">
            Logar em Chá de Orquideira
          </CardTitle>
          <CardDescription className="text-center">
            Entre com seu email ou ORCID ID
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="identifier">Email ou ORCID ID</Label>
              <Input
                id="identifier"
                type="text"
                placeholder="email@exemplo.com ou 0000-0000-0000-0000"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              {identifier && !validateIdentifier(identifier) && (
                <p className="text-xs text-destructive">
                  Insira um email válido ou ORCID ID no formato 0000-0000-0000-0000
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
            </div>
            <Button
              type="submit"
              className="w-full bg-tea hover:bg-tea-dark"
              disabled={isLoading || (identifier && !validateIdentifier(identifier))}
            >
              {isLoading ? 'Entrando...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-center text-muted-foreground">
            Não tem uma conta?{' '}
            <Link to="/register" className="text-tea hover:underline">
              Ir para Cadastro
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
