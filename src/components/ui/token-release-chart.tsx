
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TokenReleaseChart = () => {
  // Generate monthly data points for 4 years (48 months)
  const generateReleaseData = () => {
    const data = [];
    const startDate = new Date(2024, 0, 1); // January 2024
    
    for (let i = 0; i <= 48; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear().toString().slice(-2);
      
      // Token release schedule calculations
      let community = 0;
      let team = 0;
      let investors = 0;
      let advisors = 0;
      
      // Community (40% - 400M tokens) - Linear release over 48 months
      community = Math.min(400000000, (400000000 / 48) * i);
      
      // Team (20% - 200M tokens) - 12 month cliff, then linear over 36 months
      if (i >= 12) {
        team = Math.min(200000000, (200000000 / 36) * (i - 12));
      }
      
      // Investors (30% - 300M tokens) - 6 month cliff, then linear over 42 months
      if (i >= 6) {
        investors = Math.min(300000000, (300000000 / 42) * (i - 6));
      }
      
      // Advisors (10% - 100M tokens) - 18 month cliff, then linear over 30 months
      if (i >= 18) {
        advisors = Math.min(100000000, (100000000 / 30) * (i - 18));
      }
      
      data.push({
        date: `${month}-${year}`,
        Community: Math.round(community),
        Team: Math.round(team),
        Investors: Math.round(investors),
        Advisors: Math.round(advisors),
      });
    }
    
    return data;
  };

  const data = generateReleaseData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const total = payload.reduce((sum: number, entry: any) => sum + entry.value, 0);
      
      return (
        <div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800 mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between mb-1">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 mr-2 rounded-sm"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-sm text-gray-600">{entry.dataKey}:</span>
              </div>
              <span className="text-sm font-medium ml-4">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
          <div className="border-t pt-2 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-gray-800">Total:</span>
              <span className="text-sm font-bold">
                {total.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-96 mt-8">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={5}
          />
          <YAxis 
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
          />
          
          {/* Areas stacked from bottom to top */}
          <Area
            type="monotone"
            dataKey="Community"
            stackId="1"
            stroke="#ff69b4"
            fill="#ffb3d9"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Team"
            stackId="1"
            stroke="#4169e1"
            fill="#87ceeb"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Investors"
            stackId="1"
            stroke="#40e0d0"
            fill="#b0f0e6"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Advisors"
            stackId="1"
            stroke="#9370db"
            fill="#dda0dd"
            fillOpacity={0.8}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TokenReleaseChart;
