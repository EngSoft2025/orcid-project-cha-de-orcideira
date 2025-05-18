
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HIndexProps {
  hIndex: number;
}

const HIndex: React.FC<HIndexProps> = ({ hIndex }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Índice H</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <div className="relative flex items-center justify-center w-36 h-36">
          <div className="absolute w-full h-full rounded-full bg-tea/10"></div>
          <div className="absolute w-28 h-28 rounded-full bg-tea/20"></div>
          <div className="absolute w-20 h-20 rounded-full bg-tea flex items-center justify-center">
            <span className="text-4xl font-bold text-white">{hIndex}</span>
          </div>
        </div>
      </CardContent>
      <div className="px-6 pb-6 text-center text-sm text-muted-foreground">
        O índice H é o maior número h tal que o pesquisador tem h publicações com pelo menos h citações cada.
      </div>
    </Card>
  );
};

export default HIndex;
