
import React from 'react';
import { Paper } from '../context/SearchContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PaperDetailProps {
  paper: Paper;
}

const PaperDetail: React.FC<PaperDetailProps> = ({ paper }) => {
  return (
    <ScrollArea className="max-h-[80vh] overflow-auto pr-4">
      <CardHeader>
        <CardTitle className="text-xl text-gray-800">{paper.title}</CardTitle>
        <CardDescription>
          {paper.authors.join(', ')}
          {paper.year ? ` (${paper.year})` : ''}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Abstract */}
        {paper.abstract && (
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Resumo</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{paper.abstract}</p>
          </div>
        )}
        
        {/* Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {paper.doi && (
            <div>
              <h3 className="font-semibold text-gray-700">DOI</h3>
              <p className="text-gray-600 text-sm">{paper.doi}</p>
            </div>
          )}
          
          {paper.citationCount !== undefined && (
            <div>
              <h3 className="font-semibold text-gray-700">Citações</h3>
              <p className="text-gray-600 text-sm">{paper.citationCount}</p>
            </div>
          )}
          
          {paper.fieldsOfStudy && paper.fieldsOfStudy.length > 0 && (
            <div className="col-span-2">
              <h3 className="font-semibold text-gray-700">Áreas de Estudo</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                {paper.fieldsOfStudy.map(field => (
                  <span 
                    key={field} 
                    className="inline-block px-2 py-1 bg-primary-light text-primary-dark text-xs rounded-full"
                  >
                    {field}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* References */}
        {paper.references && paper.references.length > 0 && (
          <div>
            <Separator className="my-4" />
            <h3 className="font-semibold text-gray-700 mb-2">Referências ({paper.references.length})</h3>
            <ul className="space-y-2">
              {paper.references.map((ref, index) => (
                <li key={ref.paperId || index} className="text-sm text-gray-600">
                  {index + 1}. {ref.title}
                  {ref.authors && ref.authors.length > 0 && (
                    <span> - {typeof ref.authors[0] === 'string' ? 
                      ref.authors.join(', ') : 
                      ref.authors.map((a: any) => a.name).join(', ')}
                    </span>
                  )}
                  {ref.year && <span> ({ref.year})</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </ScrollArea>
  );
};

export default PaperDetail;
