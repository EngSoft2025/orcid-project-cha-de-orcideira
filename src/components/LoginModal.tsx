// Componemte de Login

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearch } from '../context/SearchContext';
import { login } from '../utils/api';
import { useToast } from "@/components/ui/use-toast";

const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setLoginModalOpen, setRegisterModalOpen } = useSearch();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(email, senha);
      toast({
        title: "Login realizado com sucesso",
        description: "Você está agora logado",
      });
      setLoginModalOpen(false);
      // For demo purposes we're not actually navigating to a dashboard
      // window.location.href = '/dashboard';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  const switchToRegister = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={setLoginModalOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
          <DialogDescription>
            Entre com suas credenciais para acessar sua conta.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="senha">Senha</Label>

              {/*Botão ESQUECEU A SENHA ainda não implementado*/}
              <Button
                type="button"
                variant="link"
                className="text-xs text-primary p-0 h-auto"
              >
                Esqueceu a senha?
              </Button>
            </div>
            <Input
              id="senha"
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <DialogFooter className="flex flex-col items-stretch gap-2 sm:gap-0">
            <Button
              type="submit"
              className="bg-primary hover:bg-primary-dark w-full"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </Button>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">Não tem uma conta?{' '}</span>
              <Button
                type="button"
                variant="link"
                className="text-sm text-primary p-0 h-auto"
                onClick={switchToRegister}
              >
                Criar conta
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
