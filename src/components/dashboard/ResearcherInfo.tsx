
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { type Researcher } from '../../data/mockData';

interface ResearcherInfoProps {
  researcher: Researcher;
}

const ResearcherInfo: React.FC<ResearcherInfoProps> = ({ researcher }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Perfil do Pesquisador</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="font-medium mb-2">Biografia</h3>
          <p className="text-sm text-muted-foreground">{researcher.bio}</p>
        </div>
        
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="employment">
            <AccordionTrigger>Empregos</AccordionTrigger>
            <AccordionContent>
              {researcher.jobs.map((job, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="font-medium">{job.role}</div>
                  <div className="text-sm">{job.organization}</div>
                  <div className="text-xs text-muted-foreground">
                    {job.startDate} - {job.endDate || 'Presente'}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="education">
            <AccordionTrigger>Educação e qualificações</AccordionTrigger>
            <AccordionContent>
              {researcher.education.map((edu, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="font-medium">{edu.degree}</div>
                  <div className="text-sm">{edu.institution}</div>
                  {edu.field && <div className="text-sm">{edu.field}</div>}
                  <div className="text-xs text-muted-foreground">
                    {edu.startDate} - {edu.endDate || 'Presente'}
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="works">
            <AccordionTrigger>Trabalhos</AccordionTrigger>
            <AccordionContent>
              {researcher.works.map((work, index) => (
                <div key={index} className="mb-3 last:mb-0">
                  <div className="font-medium">{work.title}</div>
                  <div className="flex justify-between text-sm">
                    <span>{work.year}</span>
                    <span>{work.citations} citações</span>
                  </div>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ResearcherInfo;
