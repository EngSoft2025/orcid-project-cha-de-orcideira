
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { type Paper } from '../data/mockData';

interface PaperCardProps {
  paper: Paper;
}

const PaperCard: React.FC<PaperCardProps> = ({ paper }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="card-hover cursor-pointer">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium leading-tight line-clamp-2">
              {paper.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">
              {paper.authors.join(', ')}
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {paper.journal}, {paper.year}
              </div>
              <Badge variant="outline" className="bg-tea/10">
                {paper.citations} citações
              </Badge>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{paper.title}</DialogTitle>
          <div className="text-sm font-medium">{paper.authors.join(', ')}</div>
          <div className="text-sm text-muted-foreground">
            {paper.journal}, {paper.year}
          </div>
        </DialogHeader>
        <DialogDescription>
          <div className="mt-4">
            <h4 className="text-sm font-semibold mb-1">Resumo</h4>
            <p className="text-sm">{paper.abstract}</p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold mb-1">Citações</h4>
              <p className="text-sm">{paper.citations}</p>
            </div>
            {paper.doi && (
              <div>
                <h4 className="text-sm font-semibold mb-1">DOI</h4>
                <p className="text-sm">{paper.doi}</p>
              </div>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PaperCard;
