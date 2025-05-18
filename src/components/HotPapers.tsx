
import React from 'react';
import { MOCK_PAPERS } from '../data/mockData';
import PaperCard from './PaperCard';

const HotPapers: React.FC = () => {
  // Sort papers by citations to get "hot" papers
  const hotPapers = [...MOCK_PAPERS].sort((a, b) => b.citations - a.citations).slice(0, 4);

  return (
    <div className="w-full mt-12 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-center">Artigos em destaque</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {hotPapers.map((paper) => (
          <PaperCard key={paper.id} paper={paper} />
        ))}
      </div>
    </div>
  );
};

export default HotPapers;
