
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { type Researcher } from '../data/mockData';

interface ResearcherCardProps {
  researcher: Researcher;
}

const ResearcherCard: React.FC<ResearcherCardProps> = ({ researcher }) => {
  return (
    <Link to={`/profile/${researcher.id}`}>
      <Card className="card-hover h-full">
        <CardHeader className="pb-2 flex flex-row items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={researcher.avatar} alt={researcher.name} />
            <AvatarFallback className="bg-tea text-tea-light">
              {researcher.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium leading-none">{researcher.name}</h3>
            <p className="text-sm text-muted-foreground">
              {researcher.institution}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {researcher.bio}
          </p>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-tea/10">
              h-index: {researcher.hIndex}
            </Badge>
            <Badge variant="outline" className="bg-orchid/10">
              {Object.values(researcher.publications).reduce((sum, count) => sum + count, 0)} publicações
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ResearcherCard;
