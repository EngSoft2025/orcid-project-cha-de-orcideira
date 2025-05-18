
import React, { useState } from 'react';
import Header from '../components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

const NotificationsPage: React.FC = () => {
  const [notifications, setNotifications] = useState({
    newCitations: true,
    newPublications: true,
    newFollowers: true,
    relatedPapers: false,
    emailDigest: true,
  });
  
  const { toast } = useToast();
  
  const handleToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  const handleSave = () => {
    // In a real app, this would call an API
    toast({
      title: 'Preferências salvas',
      description: 'Suas preferências de notificação foram atualizadas.'
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Gerenciar Notificações</h1>
        
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg">Preferências de Notificação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="newCitations" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Novas citações</div>
                    <div className="text-sm text-muted-foreground">Notificar quando seus trabalhos forem citados</div>
                  </div>
                </Label>
                <Switch
                  id="newCitations"
                  checked={notifications.newCitations}
                  onCheckedChange={() => handleToggle('newCitations')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="newPublications" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Novas publicações</div>
                    <div className="text-sm text-muted-foreground">Notificar sobre novas publicações de pesquisadores que você segue</div>
                  </div>
                </Label>
                <Switch
                  id="newPublications"
                  checked={notifications.newPublications}
                  onCheckedChange={() => handleToggle('newPublications')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="newFollowers" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Novos seguidores</div>
                    <div className="text-sm text-muted-foreground">Notificar quando alguém seguir seu perfil</div>
                  </div>
                </Label>
                <Switch
                  id="newFollowers"
                  checked={notifications.newFollowers}
                  onCheckedChange={() => handleToggle('newFollowers')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="relatedPapers" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Artigos relacionados</div>
                    <div className="text-sm text-muted-foreground">Notificar sobre novos artigos relacionados aos seus interesses</div>
                  </div>
                </Label>
                <Switch
                  id="relatedPapers"
                  checked={notifications.relatedPapers}
                  onCheckedChange={() => handleToggle('relatedPapers')}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="emailDigest" className="cursor-pointer">
                  <div>
                    <div className="font-medium">Resumo por email</div>
                    <div className="text-sm text-muted-foreground">Receber um resumo semanal das atividades por email</div>
                  </div>
                </Label>
                <Switch
                  id="emailDigest"
                  checked={notifications.emailDigest}
                  onCheckedChange={() => handleToggle('emailDigest')}
                />
              </div>
            </div>
            
            <Button onClick={handleSave} className="w-full bg-tea hover:bg-tea-dark">
              Salvar Preferências
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default NotificationsPage;
