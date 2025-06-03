
import React from 'react';
import { Author } from '../context/SearchContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Book, Briefcase, GraduationCap, Link as LinkIcon, ExternalLink } from 'lucide-react';

// Objeto com os dados do autor
interface AuthorDetailProps {
  author: Author;
}

// Função auxiliar para receber as publicações do autor
// Retorna dois arrays: pubData e citationData formatados e ordenados por ano
const generateYearlyData = (publications: any[] = []) => {
  const citationsByYear: Record<string, number> = {};
  const pubsByYear: Record<string, number> = {};
  
  // Conta as publicações por ano
  publications.forEach(pub => {
    if (pub.year) {
      pubsByYear[pub.year] = (pubsByYear[pub.year] || 0) + 1;
      
      // Adiciona contagem de citações ao ano
      const citations = pub.citationCount || 0;
      citationsByYear[pub.year] = (citationsByYear[pub.year] || 0) + citations;
    }
  });
  
  // Converte para arrays para gráfico
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

  const hasYearlyData = pubData.length > 0 || citationData.length > 0;

  return (
    <ScrollArea className="max-h-[80vh] overflow-auto pr-4">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">{author.name}</CardTitle>
        <CardDescription>
          {author.affiliations.join(', ')}
        </CardDescription>
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
        
        {/* Metrics */}
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

        {/* Affiliations in Accordion */}
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

        {/* Biography or Summary if available */}
        {author.biography && (
          <div>
            <Separator className="my-4" />
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Biografia</h3>
              <p className="text-sm text-gray-600">{author.biography}</p>
            </div>
          </div>
        )}

        {/* Charts for publication and citation data */}
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
        
        {/* Education */}
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
        
        {/* Professional Experience */}
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
        
        {/* Publications */}
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
                    {author.publications.map((publication, index) => (
                      <li key={publication.paperId || index} className="text-sm border-l-2 border-primary-light pl-3 py-1">
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
                      </li>
                    ))}
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
