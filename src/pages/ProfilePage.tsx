
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import StatisticsCharts from '../components/dashboard/StatisticsCharts';
import HIndex from '../components/dashboard/HIndex';
import ResearcherInfo from '../components/dashboard/ResearcherInfo';
import { MOCK_RESEARCHERS } from '../data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const researcher = MOCK_RESEARCHERS.find(r => r.id === id) || MOCK_RESEARCHERS[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col md:flex-row items-center md:items-start gap-6">
          <Avatar className="h-24 w-24">
            <AvatarImage src={researcher.avatar} alt={researcher.name} />
            <AvatarFallback className="bg-tea text-tea-light text-2xl">
              {researcher.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div>
            <h1 className="text-2xl font-bold">{researcher.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="font-mono">
                ORCID: {researcher.orcidId}
              </Badge>
            </div>
            <p className="mt-2 text-muted-foreground">
              {researcher.institution}, {researcher.country}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StatisticsCharts researcher={researcher} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <HIndex hIndex={researcher.hIndex} />
              </div>
              <div className="md:col-span-2">
                <ResearcherInfo researcher={researcher} />
              </div>
            </div>
          </div>
          <div className="lg:col-span-1">
            {/* Placeholder for additional profile information */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
