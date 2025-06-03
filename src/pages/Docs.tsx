
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

const Docs = () => {
  const tokenDistributionData = [
    { name: 'Treasury Reserve', value: 17.5, tokens: 1750000, color: '#8B5CF6' },
    { name: 'Marketing & Partnerships', value: 15, tokens: 1500000, color: '#06B6D4' },
    { name: 'Ecosystem Rewards', value: 15, tokens: 1500000, color: '#10B981' },
    { name: 'Liquidity', value: 13, tokens: 1300000, color: '#F59E0B' },
    { name: 'Team & Recruitment', value: 12, tokens: 1200000, color: '#EF4444' },
    { name: 'Staking Incentives', value: 10, tokens: 1000000, color: '#8B5CF6' },
    { name: 'Private Round', value: 7, tokens: 700000, color: '#EC4899' },
    { name: 'Public Round', value: 4, tokens: 400000, color: '#6366F1' },
    { name: 'Strategic Round', value: 3.5, tokens: 350000, color: '#84CC16' },
    { name: 'Advisory', value: 3, tokens: 300000, color: '#F97316' }
  ];

  const chartConfig = {
    value: {
      label: "Percentage",
    },
    treasury: {
      label: "Treasury Reserve",
      color: "#8B5CF6",
    },
    marketing: {
      label: "Marketing & Partnerships", 
      color: "#06B6D4",
    },
    ecosystem: {
      label: "Ecosystem Rewards",
      color: "#10B981",
    },
    liquidity: {
      label: "Liquidity",
      color: "#F59E0B",
    },
    team: {
      label: "Team & Recruitment",
      color: "#EF4444",
    },
    staking: {
      label: "Staking Incentives",
      color: "#8B5CF6",
    },
    private: {
      label: "Private Round",
      color: "#EC4899",
    },
    public: {
      label: "Public Round", 
      color: "#6366F1",
    },
    strategic: {
      label: "Strategic Round",
      color: "#84CC16",
    },
    advisory: {
      label: "Advisory",
      color: "#F97316",
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Book of Scams Documentation
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive documentation for the Book of Scams project - a decentralized platform for reporting and tracking cryptocurrency scams.
            </p>
          </div>

          {/* Mission Statement Section */}
          <Card className="mb-8 border-blue-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-100 to-purple-100">
              <CardTitle className="text-2xl text-blue-900">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 text-blue-800">
                <p className="leading-relaxed">
                  <strong>Decentralized Innovation:</strong> To provide a decentralised, permissionless & censorship resistant protocol for mature content creators and consumers that requires no KYC or bank, while offering private payments, data analytics, wank2earn & other cutting edge innovations through the full utilisation of rapidly advancing blockchain & AI technologies.
                </p>
                
                <p className="leading-relaxed">
                  <strong>Sustainable Scaling:</strong> To sustainably scale and actually have the resources to disrupt a giant market without a billion dollar bankroll. We utilise our decentralised physical infrastructure network (DeePin) of shared computing power to host, transcode and deliver content or data while rewarding miners.
                </p>
                
                <p className="leading-relaxed">
                  <strong>User-Centric Ecosystem:</strong> To create a user centric ecosystem that self moderates and removes the middle-man while tokenising ownership to empower & minimise the fees incurred by creators as well as consumers.
                </p>
                
                <p className="leading-relaxed">
                  <strong>Data Analytics Suite:</strong> To build a complete suite of data analytics toolkits that help creators find the biggest spenders, users find their ideal creators and businesses increase ROI by choosing the right partners.
                </p>
                
                <p className="leading-relaxed">
                  <strong>Protection & Safety:</strong> To solve the rise of illicit online content and protecting children, victims of crime or the generally vulnerable via a more efficient decentralised moderation system to compete with the <a href="https://www.bbc.com/news/uk-63249018" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">failing incumbent</a>.
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-blue-200">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Some Stats That Hit Home</h3>
                <div className="space-y-3 text-blue-800 text-sm">
                  <p className="leading-relaxed">
                    The US Sentencing Commission's October 2021 report, which studied child sexual abuse image producers, found that OSEAC (online sexual exploitation and abuse of children) has increased by <strong>422%</strong> over the last fifteen years (Federal Sentencing of Child Pornography Production Offenses, 2021).
                  </p>
                  
                  <p className="leading-relaxed">
                    In 2021, NCMEC received more than <strong>29.3 million</strong> (up 35% over 2020) CyberTipline reports containing over <strong>84.9 million</strong> images, videos, and other content related to suspected child sexual exploitation (up 29.8% over 2020). Over the past fifteen years, the number of reports of suspected child sexual abuse materials (CSAM) made to the CyberTipline has increased by <strong>15,000%</strong> (CyberTipline 2021 Report, National Center for Missing and Exploited Children).
                  </p>
                  
                  <p className="leading-relaxed">
                    Transparency reports of seven of the biggest social networks were reviewed to find out how prevalent child abuse is on their platforms. Transparency reports typically include content removals, which are broken down into various categories. This report those related to child nudity, abuse, and sexual exploitation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tokenomics Section */}
          <Card className="mb-8 border-purple-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
              <CardTitle className="text-2xl text-purple-900">Tokenomics</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              {/* Token Distribution Chart */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-purple-900 mb-6 text-center">Token Distribution</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  <div className="order-2 lg:order-1">
                    <ChartContainer config={chartConfig} className="w-full h-[400px]">
                      <PieChart>
                        <Pie
                          data={tokenDistributionData}
                          cx="50%"
                          cy="50%"
                          outerRadius={120}
                          innerRadius={40}
                          paddingAngle={2}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1500}
                        >
                          {tokenDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip
                          content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              const data = payload[0].payload;
                              return (
                                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                                  <p className="font-semibold text-gray-800">{data.name}</p>
                                  <p className="text-blue-600">{data.value}% ({data.tokens.toLocaleString()} tokens)</p>
                                </div>
                              );
                            }
                            return null;
                          }}
                        />
                        <Legend 
                          verticalAlign="bottom" 
                          height={36}
                          formatter={(value, entry) => (
                            <span className="text-sm font-medium" style={{ color: entry.color }}>
                              {value}
                            </span>
                          )}
                        />
                      </PieChart>
                    </ChartContainer>
                  </div>
                  
                  <div className="order-1 lg:order-2">
                    <div className="space-y-2">
                      {tokenDistributionData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span className="text-sm font-medium text-gray-700">{item.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-gray-800">{item.value}%</div>
                            <div className="text-xs text-gray-500">{item.tokens.toLocaleString()}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Distribution Table */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-purple-900 mb-4">Distribution Details</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-purple-300">
                    <thead>
                      <tr className="bg-purple-100">
                        <th className="border border-purple-300 px-4 py-2 text-left">Allocation</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">% of allocation</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">Number of Tokens</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">Dilution</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">TGE Release %</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">TGE Supply</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-purple-300 px-4 py-2">Treasury Reserve</td>
                        <td className="border border-purple-300 px-4 py-2">17.50%</td>
                        <td className="border border-purple-300 px-4 py-2">1,750,000</td>
                        <td className="border border-purple-300 px-4 py-2">3 month cliff, daily linear 48 months</td>
                        <td className="border border-purple-300 px-4 py-2">0.00%</td>
                        <td className="border border-purple-300 px-4 py-2">0</td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="border border-purple-300 px-4 py-2">Advisory</td>
                        <td className="border border-purple-300 px-4 py-2">3.00%</td>
                        <td className="border border-purple-300 px-4 py-2">300,000</td>
                        <td className="border border-purple-300 px-4 py-2">6 month cliff, daily linear 24 months</td>
                        <td className="border border-purple-300 px-4 py-2">0.00%</td>
                        <td className="border border-purple-300 px-4 py-2">0</td>
                      </tr>
                      <tr>
                        <td className="border border-purple-300 px-4 py-2">Team & Recruitment</td>
                        <td className="border border-purple-300 px-4 py-2">12.00%</td>
                        <td className="border border-purple-300 px-4 py-2">1,200,000</td>
                        <td className="border border-purple-300 px-4 py-2">6 month cliff, daily linear 24 months</td>
                        <td className="border border-purple-300 px-4 py-2">0.00%</td>
                        <td className="border border-purple-300 px-4 py-2">0</td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="border border-purple-300 px-4 py-2">Marketing & Partnerships</td>
                        <td className="border border-purple-300 px-4 py-2">15.00%</td>
                        <td className="border border-purple-300 px-4 py-2">1,500,000</td>
                        <td className="border border-purple-300 px-4 py-2">1 month cliff, daily linear for 48 months</td>
                        <td className="border border-purple-300 px-4 py-2">0.00%</td>
                        <td className="border border-purple-300 px-4 py-2">0</td>
                      </tr>
                      <tr>
                        <td className="border border-purple-300 px-4 py-2">Staking Incentives</td>
                        <td className="border border-purple-300 px-4 py-2">10.00%</td>
                        <td className="border border-purple-300 px-4 py-2">1,000,000</td>
                        <td className="border border-purple-300 px-4 py-2">1 month cliff, daily linear for 48 months</td>
                        <td className="border border-purple-300 px-4 py-2">0.00%</td>
                        <td className="border border-purple-300 px-4 py-2">0</td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="border border-purple-300 px-4 py-2">Ecosystem Rewards</td>
                        <td className="border border-purple-300 px-4 py-2">15.00%</td>
                        <td className="border border-purple-300 px-4 py-2">1,500,000</td>
                        <td className="border border-purple-300 px-4 py-2">3 month cliff, daily linear for 48 months</td>
                        <td className="border border-purple-300 px-4 py-2">0.00%</td>
                        <td className="border border-purple-300 px-4 py-2">0</td>
                      </tr>
                      <tr>
                        <td className="border border-purple-300 px-4 py-2">Liquidity</td>
                        <td className="border border-purple-300 px-4 py-2">13.00%</td>
                        <td className="border border-purple-300 px-4 py-2">1,300,000</td>
                        <td className="border border-purple-300 px-4 py-2">50% at TGE, daily linear for 2 months</td>
                        <td className="border border-purple-300 px-4 py-2">50.00%</td>
                        <td className="border border-purple-300 px-4 py-2">650,000</td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="border border-purple-300 px-4 py-2">Private Round</td>
                        <td className="border border-purple-300 px-4 py-2">7.00%</td>
                        <td className="border border-purple-300 px-4 py-2">700,000</td>
                        <td className="border border-purple-300 px-4 py-2">20% at TGE, daily linear for 6 months</td>
                        <td className="border border-purple-300 px-4 py-2">20.00%</td>
                        <td className="border border-purple-300 px-4 py-2">140,000</td>
                      </tr>
                      <tr>
                        <td className="border border-purple-300 px-4 py-2">Strategic Round</td>
                        <td className="border border-purple-300 px-4 py-2">3.50%</td>
                        <td className="border border-purple-300 px-4 py-2">350,000</td>
                        <td className="border border-purple-300 px-4 py-2">25% TGE, daily linear for 4 months</td>
                        <td className="border border-purple-300 px-4 py-2">25.00%</td>
                        <td className="border border-purple-300 px-4 py-2">87,500</td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="border border-purple-300 px-4 py-2">Public Round</td>
                        <td className="border border-purple-300 px-4 py-2">4.00%</td>
                        <td className="border border-purple-300 px-4 py-2">400,000</td>
                        <td className="border border-purple-300 px-4 py-2">25% TGE, daily linear for 4 months</td>
                        <td className="border border-purple-300 px-4 py-2">25.00%</td>
                        <td className="border border-purple-300 px-4 py-2">100,000</td>
                      </tr>
                      <tr className="font-semibold bg-purple-200">
                        <td className="border border-purple-300 px-4 py-2">Total</td>
                        <td className="border border-purple-300 px-4 py-2">100.00%</td>
                        <td className="border border-purple-300 px-4 py-2">10,000,000</td>
                        <td className="border border-purple-300 px-4 py-2">-</td>
                        <td className="border border-purple-300 px-4 py-2">-</td>
                        <td className="border border-purple-300 px-4 py-2">977,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* IDOs & Sales Table */}
              <div>
                <h3 className="text-xl font-semibold text-purple-900 mb-4">IDOs & Sales</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-purple-300">
                    <thead>
                      <tr className="bg-purple-100">
                        <th className="border border-purple-300 px-4 py-2 text-left">Round</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">Token Price</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">% of Token Distribution</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">Tokens for Sale</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">Total</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">FDV</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">Vesting Period</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">TGE Release %</th>
                        <th className="border border-purple-300 px-4 py-2 text-left">TGE Supply</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-purple-300 px-4 py-2">Private</td>
                        <td className="border border-purple-300 px-4 py-2">$0.5500</td>
                        <td className="border border-purple-300 px-4 py-2">7.00%</td>
                        <td className="border border-purple-300 px-4 py-2">700,000</td>
                        <td className="border border-purple-300 px-4 py-2">$385,000</td>
                        <td className="border border-purple-300 px-4 py-2">$5,500,000</td>
                        <td className="border border-purple-300 px-4 py-2">20% at TGE, daily linear for 6 months</td>
                        <td className="border border-purple-300 px-4 py-2">20%</td>
                        <td className="border border-purple-300 px-4 py-2">140,000</td>
                      </tr>
                      <tr className="bg-purple-50">
                        <td className="border border-purple-300 px-4 py-2">Strategic</td>
                        <td className="border border-purple-300 px-4 py-2">$0.600</td>
                        <td className="border border-purple-300 px-4 py-2">3.50%</td>
                        <td className="border border-purple-300 px-4 py-2">350,000</td>
                        <td className="border border-purple-300 px-4 py-2">$210,000</td>
                        <td className="border border-purple-300 px-4 py-2">$6,000,000</td>
                        <td className="border border-purple-300 px-4 py-2">25% TGE, daily linear for 4 months</td>
                        <td className="border border-purple-300 px-4 py-2">25%</td>
                        <td className="border border-purple-300 px-4 py-2">87,500</td>
                      </tr>
                      <tr>
                        <td className="border border-purple-300 px-4 py-2">Public</td>
                        <td className="border border-purple-300 px-4 py-2">$0.600</td>
                        <td className="border border-purple-300 px-4 py-2">4.00%</td>
                        <td className="border border-purple-300 px-4 py-2">400,000</td>
                        <td className="border border-purple-300 px-4 py-2">$240,000</td>
                        <td className="border border-purple-300 px-4 py-2">$6,000,000</td>
                        <td className="border border-purple-300 px-4 py-2">25% TGE, daily linear for 4 months</td>
                        <td className="border border-purple-300 px-4 py-2">25%</td>
                        <td className="border border-purple-300 px-4 py-2">100,000</td>
                      </tr>
                      <tr className="font-semibold bg-purple-200">
                        <td className="border border-purple-300 px-4 py-2">Total</td>
                        <td className="border border-purple-300 px-4 py-2">-</td>
                        <td className="border border-purple-300 px-4 py-2">14.50%</td>
                        <td className="border border-purple-300 px-4 py-2">1,450,000</td>
                        <td className="border border-purple-300 px-4 py-2">$835,000</td>
                        <td className="border border-purple-300 px-4 py-2">-</td>
                        <td className="border border-purple-300 px-4 py-2">-</td>
                        <td className="border border-purple-300 px-4 py-2">-</td>
                        <td className="border border-purple-300 px-4 py-2">-</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Section */}
          <Card className="mb-8 border-green-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-100 to-emerald-100">
              <CardTitle className="text-2xl text-green-900">Key Features</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Decentralized Reporting</h4>
                    <p className="text-green-700 text-sm">Community-driven scam reporting system with blockchain verification.</p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Smart Contract Integration</h4>
                    <p className="text-blue-700 text-sm">Ethereum-based smart contracts for transparent and immutable records.</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Token Rewards</h4>
                    <p className="text-purple-700 text-sm">Earn BOSC tokens for verified scam reports and community contributions.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Real-time Analytics</h4>
                    <p className="text-orange-700 text-sm">Live dashboard showing scam trends and statistics.</p>
                  </div>
                  <div className="p-4 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Community Verification</h4>
                    <p className="text-red-700 text-sm">Peer-to-peer verification system for report accuracy.</p>
                  </div>
                  <div className="p-4 bg-indigo-50 rounded-lg">
                    <h4 className="font-semibold text-indigo-800 mb-2">API Access</h4>
                    <p className="text-indigo-700 text-sm">Developer-friendly API for integration with other platforms.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Documentation Section */}
          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-gray-100 to-slate-100">
              <CardTitle className="text-2xl text-gray-900">API Documentation</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Base URL</h4>
                  <code className="bg-gray-100 px-3 py-2 rounded text-sm">https://api.bookofscams.com/v1</code>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Endpoints</h4>
                  <div className="space-y-3">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h5 className="font-medium">GET /scammers</h5>
                      <p className="text-sm text-gray-600">Retrieve list of reported scammers</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h5 className="font-medium">POST /scammers</h5>
                      <p className="text-sm text-gray-600">Submit a new scammer report</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h5 className="font-medium">GET /stats</h5>
                      <p className="text-sm text-gray-600">Get platform statistics and analytics</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Authentication</h4>
                  <p className="text-gray-600 text-sm mb-2">Include your API key in the request headers:</p>
                  <code className="bg-gray-100 px-3 py-2 rounded text-sm block">Authorization: Bearer YOUR_API_KEY</code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Docs;
