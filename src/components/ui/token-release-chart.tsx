
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TokenReleaseChart = () => {
  // Generate monthly data points for 4 years (48 months)
  const generateReleaseData = () => {
    const data = [];
    const startDate = new Date(2023, 2, 7); // March 7th, 2023
    
    for (let i = 0; i <= 48; i++) {
      const date = new Date(startDate);
      date.setMonth(startDate.getMonth() + i);
      
      const month = date.toLocaleDateString('en-US', { month: 'short' });
      const year = date.getFullYear().toString().slice(-2);
      
      // Token release schedule calculations for $FAN based on real distribution
      let treasury = 0;
      let advisory = 0;
      let team = 0;
      let marketing = 0;
      let staking = 0;
      let ecosystem = 0;
      let liquidity = 0;
      let privateRound = 0;
      let strategicRound = 0;
      let publicRound = 0;
      
      // Treasury Reserve (17.5% - 1,750,000 tokens) - 3 month cliff, daily linear 48 months
      if (i >= 3) {
        treasury = Math.min(1750000, (1750000 / 45) * (i - 2));
      }
      
      // Advisory (3% - 300,000 tokens) - 6 month cliff, daily linear 24 months
      if (i >= 6) {
        advisory = Math.min(300000, (300000 / 24) * (i - 5));
      }
      
      // Team & Recruitment (12% - 1,200,000 tokens) - 6 month cliff, daily linear 24 months
      if (i >= 6) {
        team = Math.min(1200000, (1200000 / 24) * (i - 5));
      }
      
      // Marketing & Partnerships (15% - 1,500,000 tokens) - 1 month cliff, daily linear 48 months
      if (i >= 1) {
        marketing = Math.min(1500000, (1500000 / 48) * i);
      }
      
      // Staking Incentives (10% - 1,000,000 tokens) - 1 month cliff, daily linear 48 months
      if (i >= 1) {
        staking = Math.min(1000000, (1000000 / 48) * i);
      }
      
      // Ecosystem Rewards (15% - 1,500,000 tokens) - 3 month cliff, daily linear 48 months
      if (i >= 3) {
        ecosystem = Math.min(1500000, (1500000 / 45) * (i - 2));
      }
      
      // Liquidity (13% - 1,300,000 tokens) - 50% at TGE, daily linear for 2 months
      if (i === 0) {
        liquidity = 650000; // 50% at TGE
      } else if (i <= 2) {
        liquidity = 650000 + ((650000 / 2) * i);
      } else {
        liquidity = 1300000;
      }
      
      // Private Round (7% - 700,000 tokens) - 20% at TGE, daily linear for 6 months
      if (i === 0) {
        privateRound = 140000; // 20% at TGE
      } else if (i <= 6) {
        privateRound = 140000 + ((560000 / 6) * i);
      } else {
        privateRound = 700000;
      }
      
      // Strategic Round (3.5% - 350,000 tokens) - 25% TGE, daily linear for 4 months
      if (i === 0) {
        strategicRound = 87500; // 25% at TGE
      } else if (i <= 4) {
        strategicRound = 87500 + ((262500 / 4) * i);
      } else {
        strategicRound = 350000;
      }
      
      // Public Round (4% - 400,000 tokens) - 25% TGE, daily linear for 4 months
      if (i === 0) {
        publicRound = 100000; // 25% at TGE
      } else if (i <= 4) {
        publicRound = 100000 + ((300000 / 4) * i);
      } else {
        publicRound = 400000;
      }
      
      data.push({
        date: `${month}-${year}`,
        Treasury: Math.round(treasury),
        Advisory: Math.round(advisory),
        Team: Math.round(team),
        Marketing: Math.round(marketing),
        Staking: Math.round(staking),
        Ecosystem: Math.round(ecosystem),
        Liquidity: Math.round(liquidity),
        Private: Math.round(privateRound),
        Strategic: Math.round(strategicRound),
        Public: Math.round(publicRound),
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
            tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '20px' }}
            iconType="rect"
          />
          
          {/* Areas stacked from bottom to top */}
          <Area
            type="monotone"
            dataKey="Treasury"
            stackId="1"
            stroke="#e6b3ff"
            fill="#f0d9ff"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Advisory"
            stackId="1"
            stroke="#ffa8a8"
            fill="#ffc9c9"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Team"
            stackId="1"
            stroke="#87ceeb"
            fill="#b8e6ff"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Marketing"
            stackId="1"
            stroke="#98fb98"
            fill="#c3ffc3"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Staking"
            stackId="1"
            stroke="#ffd700"
            fill="#fff380"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Ecosystem"
            stackId="1"
            stroke="#ffa500"
            fill="#ffcc80"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Liquidity"
            stackId="1"
            stroke="#20b2aa"
            fill="#7fffd4"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Private"
            stackId="1"
            stroke="#9370db"
            fill="#dda0dd"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Strategic"
            stackId="1"
            stroke="#ff69b4"
            fill="#ffb3d9"
            fillOpacity={0.8}
          />
          <Area
            type="monotone"
            dataKey="Public"
            stackId="1"
            stroke="#4169e1"
            fill="#87ceeb"
            fillOpacity={0.8}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TokenReleaseChart;
