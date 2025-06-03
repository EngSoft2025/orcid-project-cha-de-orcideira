// Componemte para cadastro do usuário

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
import { register } from '../utils/api';
import { useToast } from "@/components/ui/use-toast";

const RegisterModal: React.FC = () => {
  const { isRegisterModalOpen, setRegisterModalOpen, setLoginModalOpen } = useSearch();
  const { toast } = useToast();

  // Guarda os valores do formulário
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    orcidId: '',
    senha: '',
    confirmacaoSenha: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação de senhas
    if (formData.senha !== formData.confirmacaoSenha) {
      setError('As senhas não coincidem');
      return;
    }
    
    setError(null);
    setLoading(true);

    // Função que envia os dados para registrar na base (em desenvolvimento)
    try {
      await register({
        nome: formData.nome,
        sobrenome: formData.sobrenome,
        email: formData.email,
        orcidId: formData.orcidId,
        senha: formData.senha,
      });
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Você já pode fazer login com suas credenciais",
      });
      
      setRegisterModalOpen(false);
      setLoginModalOpen(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  const switchToLogin = () => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };

  return (
    <Dialog open={isRegisterModalOpen} onOpenChange={setRegisterModalOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Criar Conta</DialogTitle>
          <DialogDescription>
            Cadastre-se para acompanhar pesquisas e autores de interesse.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="sobrenome">Sobrenome</Label>
              <Input
                id="sobrenome"
                value={formData.sobrenome}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="orcidId">ORCID ID (opcional)</Label>
            <Input
              id="orcidId"
              placeholder="0000-0000-0000-0000"
              value={formData.orcidId}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                value={formData.senha}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="confirmacaoSenha">Confirmar Senha</Label>
              <Input
                id="confirmacaoSenha"
                type="password"
                value={formData.confirmacaoSenha}
                onChange={handleChange}
                required
              />
            </div>
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
              {loading ? "Cadastrando..." : "Cadastrar"}
            </Button>
            <div className="text-center mt-4">
              <span className="text-sm text-gray-500">Já tem uma conta?{' '}</span>
              <Button
                type="button"
                variant="link"
                className="text-sm text-primary p-0 h-auto"
                onClick={switchToLogin}
              >
                Faça login
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
