import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import TokenReleaseChart from "@/components/ui/token-release-chart";

const Docs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Book of Scams Documentation
          </h1>
          
          {/* Mission Statement Section */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-800">Mission Statement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-gray-700">
              <p>
                To provide a decentralised, permissionless & censorship resistant protocol for mature content creators and consumers that requires no KYC or bank, while offering private payments, data analytics, wank2earn & other cutting edge innovations through the full utilisation of rapidly advancing blockchain & AI technologies.
              </p>
              
              <p>
                To sustainably scale and actually have the resources to disrupt a giant market without a billion dollar bankroll. We utilise our decentralised physical infrastructure network (DeePin) of shared computing power to host, transcode and deliver content or data while rewarding miners.
              </p>
              
              <p>
                To create a user centric ecosystem that self moderates and removes the middle-man while tokenising ownership to empower & minimise the fees incurred by creators as well as consumers.
              </p>
              
              <p>
                To build a complete suite of data analytics toolkits that help creators find the biggest spenders, users find their ideal creators and businesses increase ROI by choosing the right partners.
              </p>
              
              <p>
                To solve the rise of illicit online content and protecting children, victims of crime or the generally vulnerable via a more efficient decentralised moderation system to compete with the failing incumbent (https://www.bbc.com/news/uk-63249018)
              </p>
              
              <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-400 rounded">
                <h4 className="font-semibold text-red-800 mb-2">Some stats that hit home</h4>
                <ul className="space-y-2 text-sm text-red-700">
                  <li>
                    The US Sentencing Commission's October 2021 report, which studied child sexual abuse image producers, found that OSEAC (online sexual exploitation and abuse of children) has increased by 422% over the last fifteen years (Federal Sentencing of Child Pornography Production Offenses, 2021)
                  </li>
                  <li>
                    In 2021, NCMEC received more than 29.3 million (up 35% over 2020) CyberTipline reports containing over 84.9 million images, videos, and other content related to suspected child sexual exploitation (up 29.8% over 2020). Over the past fifteen years, the number of reports of suspected child sexual abuse materials (CSAM) made to the CyberTipline has increased by 15,000% (CyberTipline 2021 Report, National Center for Missing and Exploited Children).
                  </li>
                  <li>
                    Transparency reports of seven of the biggest social networks were reviewed to find out how prevalent child abuse is on their platforms. Transparency reports typically include content removals, which are broken down into various categories. This report those related to child nudity, abuse, and sexual exploitation.
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Tokenomics Section */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-800">Tokenomics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700">
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-3">Token Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-purple-800 mb-4">Initial Distribution</h4>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span>Community & Ecosystem</span>
                        <span className="font-medium">40%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Team & Advisors</span>
                        <span className="font-medium">30%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Investors</span>
                        <span className="font-medium">20%</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Treasury</span>
                        <span className="font-medium">10%</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-blue-800 mb-4">Token Utility</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Governance voting rights</li>
                      <li>Platform fee discounts</li>
                      <li>Access to premium features</li>
                      <li>Staking rewards</li>
                      <li>Creator support mechanism</li>
                      <li>Liquidity mining incentives</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-purple-700 mb-3">Token Economics</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-indigo-800 mb-4">Supply & Emission</h4>
                    <ul className="space-y-3">
                      <li className="flex justify-between">
                        <span>Total Supply</span>
                        <span className="font-medium">1,000,000,000 UNI</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Initial Circulating Supply</span>
                        <span className="font-medium">150,000,000 UNI</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Emission Schedule</span>
                        <span className="font-medium">4 years</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-6 rounded-lg shadow-md">
                    <h4 className="font-semibold text-pink-800 mb-4">Value Capture</h4>
                    <ul className="space-y-2 list-disc pl-5">
                      <li>Platform fees (3% of transactions)</li>
                      <li>Premium subscription revenue</li>
                      <li>NFT marketplace fees</li>
                      <li>Data analytics services</li>
                      <li>Infrastructure services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Release Schedule Section */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-800">UNI 4 Year Release Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-6">
                This chart shows the circulating supply of UNI tokens over a 4-year period, with different vesting schedules for each allocation category.
              </p>
              <TokenReleaseChart />
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#ffb3d9] rounded mr-2"></div>
                    <span><strong>Community (40%):</strong> Linear release over 48 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#87ceeb] rounded mr-2"></div>
                    <span><strong>Team (20%):</strong> 12-month cliff, then linear over 36 months</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#b0f0e6] rounded mr-2"></div>
                    <span><strong>Investors (30%):</strong> 6-month cliff, then linear over 42 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#dda0dd] rounded mr-2"></div>
                    <span><strong>Advisors (10%):</strong> 18-month cliff, then linear over 30 months</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Technology Stack Section */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-800">Technology Stack</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-blue-800 mb-3">Blockchain Layer</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Ethereum L2 solution</li>
                    <li>Smart contracts (Solidity)</li>
                    <li>ERC-20 token standard</li>
                    <li>ERC-721 for NFTs</li>
                    <li>Decentralized governance</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-purple-800 mb-3">Infrastructure</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Decentralized storage (IPFS)</li>
                    <li>Content delivery network</li>
                    <li>Transcoding nodes</li>
                    <li>Edge computing</li>
                    <li>Distributed database</li>
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-5 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold text-indigo-800 mb-3">Application Layer</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>React frontend</li>
                    <li>GraphQL API</li>
                    <li>AI content moderation</li>
                    <li>Analytics engine</li>
                    <li>Recommendation system</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-purple-700 mb-3">Key Technical Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-purple-800">Privacy-Preserving Payments</h4>
                      <p className="text-sm text-gray-600">Zero-knowledge proofs for private transactions while maintaining compliance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-700" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-800">Decentralized Moderation</h4>
                      <p className="text-sm text-gray-600">Community-driven content moderation with AI assistance</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-indigo-800">Engagement Rewards</h4>
                      <p className="text-sm text-gray-600">Tokenized incentives for platform participation and engagement</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-pink-100 p-2 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-700" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium text-pink-800">Advanced Analytics</h4>
                      <p className="text-sm text-gray-600">Data-driven insights for creators to optimize content and earnings</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Roadmap Section */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-purple-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-purple-800">Roadmap</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-gray-700">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-blue-500"></div>
                
                {/* Q1 2023 */}
                <div className="relative pl-12 pb-8">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white font-bold shadow-lg">
                    1
                  </div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Q1 2023: Foundation</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Team formation and core development</li>
                    <li>Whitepaper and technical documentation</li>
                    <li>Smart contract architecture design</li>
                    <li>Initial seed funding round</li>
                  </ul>
                </div>
                
                {/* Q2 2023 */}
                <div className="relative pl-12 pb-8">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold shadow-lg">
                    2
                  </div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Q2 2023: Development</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>MVP development</li>
                    <li>Smart contract audits</li>
                    <li>Infrastructure node software development</li>
                    <li>Private alpha testing</li>
                  </ul>
                </div>
                
                {/* Q3 2023 */}
                <div className="relative pl-12 pb-8">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg">
                    3
                  </div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Q3 2023: Testing & Refinement</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Public beta launch</li>
                    <li>Creator onboarding program</li>
                    <li>Community building initiatives</li>
                    <li>Strategic partnerships</li>
                  </ul>
                </div>
                
                {/* Q4 2023 */}
                <div className="relative pl-12 pb-8">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                    4
                  </div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">Q4 2023: Launch & Growth</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Token Generation Event (TGE)</li>
                    <li>Mainnet launch</li>
                    <li>Liquidity mining program</li>
                    <li>Marketing campaign</li>
                  </ul>
                </div>
                
                {/* 2024 */}
                <div className="relative pl-12">
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg">
                    5
                  </div>
                  <h3 className="text-xl font-semibold text-purple-800 mb-2">2024: Expansion</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Advanced analytics platform</li>
                    <li>Mobile application</li>
                    <li>DAO governance implementation</li>
                    <li>Global expansion and localization</li>
                    <li>Integration with major wallets and services</li>
                  </ul>
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
