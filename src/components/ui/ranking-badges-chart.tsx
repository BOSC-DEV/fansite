
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const rankingData = [
  { rank: 13, name: "Badge TBC", tokens: 1 },
  { rank: 12, name: "Badge TBC", tokens: 10 },
  { rank: 11, name: "Badge TBC", tokens: 50 },
  { rank: 10, name: "Badge TBC", tokens: 100 },
  { rank: 9, name: "Badge TBC", tokens: 200 },
  { rank: 8, name: "Badge TBC", tokens: 400 },
  { rank: 7, name: "Badge TBC", tokens: 1000 },
  { rank: 6, name: "Badge TBC", tokens: 2000 },
  { rank: 5, name: "Badge TBC", tokens: 3000 },
  { rank: 4, name: "Badge TBC", tokens: 4000 },
  { rank: 3, name: "Badge TBC", tokens: 10000 },
  { rank: 2, name: "Badge TBC", tokens: 25000 },
  { rank: 1, name: "Badge TBC", tokens: 50000 },
];

const chartConfig = {
  tokens: {
    label: "$FAN Required",
    color: "#3B82F6",
  },
};

const RankingBadgesChart = () => {
  return (
    <div className="w-full h-96 mb-6">
      <ChartContainer config={chartConfig}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={rankingData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="rank" 
              label={{ value: 'Rank', position: 'insideBottom', offset: -5 }}
            />
            <YAxis 
              scale="log"
              domain={['dataMin', 'dataMax']}
              label={{ value: '$FAN Required (Log Scale)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip 
              content={
                <ChartTooltipContent 
                  formatter={(value, name) => [
                    `${Number(value).toLocaleString()} $FAN`,
                    'Required Tokens'
                  ]}
                  labelFormatter={(label) => `Rank ${label}`}
                />
              }
            />
            <Bar dataKey="tokens" fill="var(--color-tokens)" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};

export default RankingBadgesChart;
