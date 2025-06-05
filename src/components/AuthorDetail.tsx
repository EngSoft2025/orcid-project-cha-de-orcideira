
import React from 'react';
import { Author } from '../context/SearchContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Book, Briefcase, GraduationCap, Link as LinkIcon, ExternalLink, UserPlus, UserMinus, Bookmark, BookmarkCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useSearch } from '../context/SearchContext';
import { isFollowingAuthor, followAuthor, unfollowAuthor, isPaperFavorite, addFavoritePaper, removeFavoritePaper } from '../utils/userPreferences';
import { toast } from "@/hooks/use-toast";

interface AuthorDetailProps {
  author: Author;
}

// Helper function to convert publications to yearly data for charts
const generateYearlyData = (publications: any[] = []) => {
  const citationsByYear: Record<string, number> = {};
  const pubsByYear: Record<string, number> = {};
  
  publications.forEach(pub => {
    if (pub.year) {
      pubsByYear[pub.year] = (pubsByYear[pub.year] || 0) + 1;
      
      const citations = pub.citationCount || 0;
      citationsByYear[pub.year] = (citationsByYear[pub.year] || 0) + citations;
    }
  });
  
  const pubData = Object.keys(pubsByYear).map(year => ({
    year,
    count: pubsByYear[year]
  })).sort((a, b) => Number(a.year) - Number(b.year));
  
  const citationData = Object.keys(citationsByYear).map(year => ({
    year,
    count: citationsByYear[year]
  })).sort((a, b) => Number(a.year) - Number(b.year));
  
  return { pubData, citationData };
};

const AuthorDetail: React.FC<AuthorDetailProps> = ({ author }) => {
  const { pubData, citationData } = generateYearlyData(author.publications);
  const { currentUser, isAuthenticated, setLoginModalOpen } = useSearch();

  const hasYearlyData = pubData.length > 0 || citationData.length > 0;

  const handleFollowToggle = () => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para seguir autores",
        variant: "destructive"
      });
      return;
    }

    const isCurrentlyFollowing = isFollowingAuthor(currentUser!.id, author.id);
    
    if (isCurrentlyFollowing) {
      unfollowAuthor(currentUser!.id, author.id);
      toast({
        title: "Autor removido",
        description: `Você não está mais seguindo ${author.name}`,
      });
    } else {
      followAuthor(currentUser!.id, author.id, author.name);
      toast({
        title: "Autor seguido",
        description: `Você agora está seguindo ${author.name}`,
      });
    }
  };

  const handleSavePublication = (publication: any) => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
      toast({
        title: "Login necessário",
        description: "Você precisa estar logado para salvar publicações",
        variant: "destructive"
      });
      return;
    }

    const publicationId = publication.paperId || `${author.id}-pub-${publication.title}`;
    const isFavorited = isPaperFavorite(currentUser!.id, publicationId);
    
    if (isFavorited) {
      removeFavoritePaper(currentUser!.id, publicationId);
      toast({
        title: "Publicação removida",
        description: "Publicação removida dos favoritos",
      });
    } else {
      const authorsString = typeof publication.authors === 'string' ? 
        publication.authors : 
        (Array.isArray(publication.authors) ? 
          (typeof publication.authors[0] === 'string' ? 
            publication.authors.join(', ') : 
            publication.authors.map((a: any) => a.name).join(', ')) : 
          '');
      
      addFavoritePaper(currentUser!.id, publicationId, publication.title, authorsString, publication.year);
      toast({
        title: "Publicação salva",
        description: "Publicação adicionada aos favoritos",
      });
    }
  };

  const isFollowing = isAuthenticated && isFollowingAuthor(currentUser?.id || '', author.id);

  return (
    <ScrollArea className="max-h-[80vh] overflow-auto pr-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-gray-800">{author.name}</CardTitle>
            <CardDescription>
              {author.affiliations.join(', ')}
            </CardDescription>
          </div>
          <Button
            onClick={handleFollowToggle}
            variant={isFollowing ? "outline" : "default"}
            className="flex items-center gap-2"
          >
            {isFollowing ? (
              <>
                <UserMinus className="h-4 w-4" />
                Deixar de seguir
              </>
            ) : (
              <>
                <UserPlus className="h-4 w-4" />
                Seguir autor
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* ORCID and Personal Page */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {author.orcidId && (
            <div className="flex items-center gap-2">
              <ExternalLink className="h-4 w-4 text-green-600" />
              <div>
                <h3 className="font-semibold text-gray-700">ORCID ID</h3>
                <a 
                  href={`https://orcid.org/${author.orcidId}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-green-600 hover:underline text-sm"
                >
                  {author.orcidId}
                </a>
              </div>
            </div>
          )}
          
          {author.personalPageUrl && (
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-primary" />
              <div>
                <h3 className="font-semibold text-gray-700">Página Pessoal</h3>
                <a 
                  href={author.personalPageUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline text-sm"
                >
                  {author.personalPageUrl}
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {author.hIndex !== undefined && (
            <div className="bg-primary-light p-3 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-700">Índice H</h3>
              <p className="text-xl font-bold text-primary mt-1">{author.hIndex}</p>
            </div>
          )}
          
          {author.totalPublications !== undefined && (
            <div className="bg-primary-light p-3 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-700">Publicações</h3>
              <p className="text-xl font-bold text-primary mt-1">{author.totalPublications}</p>
            </div>
          )}
          
          {author.totalCitations !== undefined && (
            <div className="bg-primary-light p-3 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-700">Citações</h3>
              <p className="text-xl font-bold text-primary mt-1">{author.totalCitations}</p>
            </div>
          )}
        </div>

        {author.affiliations && author.affiliations.length > 0 && (
          <div>
            <Separator className="my-4" />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="affiliations">
                <AccordionTrigger className="text-base font-semibold text-gray-700">
                  Afiliações Institucionais
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-2">
                    {author.affiliations.map((affiliation, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {affiliation}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}

        {author.biography && (
          <div>
            <Separator className="my-4" />
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Biografia</h3>
              <p className="text-sm text-gray-600">{author.biography}</p>
            </div>
          </div>
        )}

        {hasYearlyData && (
          <div>
            <Separator className="my-4" />
            <h3 className="font-semibold text-gray-700 mb-4">Métricas por Ano</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pubData.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Publicações por Ano</h4>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={pubData}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#4CAF50" name="Publicações" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
              
              {citationData.length > 0 && (
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Citações por Ano</h4>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={citationData}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#4CAF50" name="Citações" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        
        {author.educationDetails && author.educationDetails.length > 0 && (
          <div>
            <Separator className="my-4" />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="education">
                <AccordionTrigger className="text-base font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Formação Acadêmica</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-2">
                    {author.educationDetails.map((education, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {education}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
        
        {author.professionalExperiences && author.professionalExperiences.length > 0 && (
          <div>
            <Separator className="my-4" />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="experience">
                <AccordionTrigger className="text-base font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    <span>Experiência Profissional</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 pl-2">
                    {author.professionalExperiences.map((experience, index) => (
                      <li key={index} className="text-sm text-gray-600">
                        • {experience}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
        
        {author.publications && author.publications.length > 0 && (
          <div>
            <Separator className="my-4" />
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="publications">
                <AccordionTrigger className="text-base font-semibold text-gray-700">
                  <div className="flex items-center gap-2">
                    <Book className="h-4 w-4" />
                    <span>Publicações ({author.publications.length})</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-3">
                    {author.publications.map((publication, index) => {
                      const publicationId = publication.paperId || `${author.id}-pub-${publication.title}`;
                      const isFavorited = isAuthenticated && isPaperFavorite(currentUser?.id || '', publicationId);
                      
                      return (
                        <li key={publicationId} className="text-sm border-l-2 border-primary-light pl-3 py-1">
                          <div className="flex justify-between items-start gap-3">
                            <div className="flex-1">
                              <div className="font-medium text-gray-700">{publication.title}</div>
                              <div className="text-gray-500">
                                {typeof publication.authors === 'string' ? 
                                  publication.authors : 
                                  (Array.isArray(publication.authors) ? 
                                    (typeof publication.authors[0] === 'string' ? 
                                      publication.authors.join(', ') : 
                                      publication.authors.map((a: any) => a.name).join(', ')) : 
                                    '')}
                                {publication.year && <span> ({publication.year})</span>}
                              </div>
                              {publication.citationCount !== undefined && (
                                <div className="text-xs text-gray-500 mt-1">
                                  Citações: {publication.citationCount}
                                </div>
                              )}
                            </div>
                            <Button
                              size="sm"
                              variant={isFavorited ? "default" : "outline"}
                              onClick={() => handleSavePublication(publication)}
                              className="flex items-center gap-1 flex-shrink-0"
                            >
                              {isFavorited ? (
                                <BookmarkCheck className="h-3 w-3" />
                              ) : (
                                <Bookmark className="h-3 w-3" />
                              )}
                              {isFavorited ? "Salvo" : "Salvar"}
                            </Button>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default AuthorDetail;
