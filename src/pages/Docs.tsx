
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, BarChart3, Map, Settings, Users } from 'lucide-react';
import TokenReleaseChart from "@/components/ui/token-release-chart";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
const Docs = () => {
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        <DocsSidebar />
        
        <main className="flex-1">
          {/* Header with home link and sidebar trigger */}
          <div className="border-b border-gray-200 bg-white sticky top-0 z-10 w-full h-[73px]">
            <div className="w-full px-4 py-4 flex items-center h-full">
              <SidebarTrigger className="mr-4" />
              <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Home className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="prose prose-lg max-w-none">
              
              {/* Main Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
                $FAN Protocol Documentation
              </h1>
              
              {/* Mission Statement */}
              <h2 id="mission-statement" className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Mission Statement</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                To provide a decentralized, permissionless, and censorship-resistant protocol for digital content creators and consumers that requires no KYC or traditional banking, while offering private payments, advanced data analytics, creator rewards, and other cutting-edge innovations through the full utilization of rapidly advancing blockchain and AI technologies.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                To sustainably scale and actually have the resources to disrupt a giant market without a billion-dollar bankroll. We utilize our decentralized physical infrastructure network (DePIN) of shared computing power to host, transcode, and deliver content or data while rewarding miners and network participants.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                To create a user-centric ecosystem that self-moderates and removes the middleman while tokenizing ownership to empower creators and minimize the fees incurred by both creators and consumers.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                To build a complete suite of data analytics toolkits that help creators find their ideal audience, users discover relevant content, and businesses increase ROI by choosing the right partnerships and advertising strategies.
              </p>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                To address the challenges of digital content moderation and user safety through innovative decentralized systems that protect vulnerable users while maintaining platform integrity and creator freedom.
              </p>

              {/* Executive Summary */}
              <h2 id="executive-summary" className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Executive Summary</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                $FAN Protocol represents a paradigm shift in how digital content platforms operate, moving away from centralized, extractive models toward a truly decentralized ecosystem that empowers both creators and consumers. Our platform leverages cutting-edge blockchain technology, artificial intelligence, and decentralized infrastructure to create a sustainable, scalable solution for the digital content economy.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The digital content industry faces numerous challenges including high platform fees, censorship, privacy concerns, limited monetization options, and inadequate creator tools. Traditional platforms extract significant value from creators while providing limited transparency and control. $FAN Protocol addresses these issues through innovative tokenomics, decentralized governance, and creator-first economics.
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                Our solution combines decentralized storage, AI-powered content discovery, privacy-preserving payments, and community governance to create a platform that truly serves its users. The $FAN token serves as the native currency for all platform interactions, governance decisions, and reward distribution.
              </p>

              {/* Market Analysis */}
              <h2 id="market-analysis" className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Market Analysis</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Market Size and Opportunity</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                The global digital content market is experiencing unprecedented growth, with the creator economy valued at over $104 billion in 2023 and projected to reach $480 billion by 2028. This represents a compound annual growth rate (CAGR) of 35.2%, driven by increasing digital consumption, mobile adoption, and the rise of independent content creators.
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Over 50 million people worldwide consider themselves content creators</li>
                <li>The subscription economy has grown by 435% over the past decade</li>
                <li>Digital content consumption increased by 215% during 2020-2023</li>
                <li>Creator-focused platforms generated over $25 billion in revenue in 2023</li>
                <li>Decentralized content platforms represent less than 1% of the total market, indicating massive growth potential</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Current Market Challenges</h3>
              
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>High Platform Fees:</strong> Traditional platforms charge 20-50% commission rates</li>
                <li><strong>Limited Monetization:</strong> Creators often struggle with payment processing and geographic restrictions</li>
                <li><strong>Censorship and Control:</strong> Centralized platforms can arbitrarily remove content or ban creators</li>
                <li><strong>Data Ownership:</strong> Platforms retain ownership of user data and analytics</li>
                <li><strong>Payment Delays:</strong> Traditional payment systems can delay payouts for weeks or months</li>
                <li><strong>Limited Analytics:</strong> Creators lack comprehensive insights into their audience and performance</li>
              </ul>
              
              {/* Technology Innovation */}
              <h3 id="some-stats-that-hit-home" className="text-xl font-semibold text-red-700 mb-3">Industry Statistics</h3>
              
              <ul className="list-disc pl-6 mb-8 space-y-3 text-gray-700">
                <li>
                  Platform fees on traditional content platforms average 30% globally, with some platforms charging up to 50% for certain transaction types, significantly reducing creator earnings and limiting platform adoption.
                </li>
                <li>
                  Over 47% of content creators report experiencing unexpected content removal or account restrictions, highlighting the need for transparent, decentralized moderation systems that protect both creators and platforms.
                </li>
                <li>
                  Payment processing delays affect 73% of international creators, with some experiencing delays of 30-90 days for payouts, demonstrating the need for instant, blockchain-based payment solutions.
                </li>
                <li>
                  Data analytics and audience insights are rated as "inadequate" by 68% of professional content creators, indicating a significant opportunity for platforms that provide comprehensive analytics tools.
                </li>
              </ul>

              {/* Tokenomics */}
              <h2 id="tokenomics" className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Tokenomics</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Token Overview</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                The $FAN token is an ERC-20 compatible utility token that serves as the native currency of the $FAN Protocol ecosystem. It facilitates all platform interactions, governance decisions, and value transfer while providing holders with various benefits and utilities.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Token Utility</h3>
              
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Platform Payments:</strong> Primary currency for all content purchases and subscriptions</li>
                <li><strong>Creator Rewards:</strong> Incentivize high-quality content creation and platform engagement</li>
                <li><strong>Governance Voting:</strong> Token holders participate in protocol governance and feature development</li>
                <li><strong>Staking Rewards:</strong> Earn additional tokens by staking and securing the network</li>
                <li><strong>Premium Features:</strong> Access to advanced analytics, priority support, and exclusive tools</li>
                <li><strong>Fee Discounts:</strong> Reduced transaction fees for token holders</li>
                <li><strong>Network Validation:</strong> Participate in content moderation and network security</li>
              </ul>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Token Distribution</h3>
              
              <table className="w-full border-collapse border border-gray-300 mb-6 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left">Allocation</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">% of allocation</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Number of Tokens</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Vesting Schedule</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">TGE Release %</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">TGE Supply</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Treasury Reserve</td>
                    <td className="border border-gray-300 px-3 py-2">17.50%</td>
                    <td className="border border-gray-300 px-3 py-2">1,750,000</td>
                    <td className="border border-gray-300 px-3 py-2">3 month cliff, daily linear 48 months</td>
                    <td className="border border-gray-300 px-3 py-2">0.00%</td>
                    <td className="border border-gray-300 px-3 py-2">0</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Advisory</td>
                    <td className="border border-gray-300 px-3 py-2">3.00%</td>
                    <td className="border border-gray-300 px-3 py-2">300,000</td>
                    <td className="border border-gray-300 px-3 py-2">6 month cliff, daily linear 24 months</td>
                    <td className="border border-gray-300 px-3 py-2">0.00%</td>
                    <td className="border border-gray-300 px-3 py-2">0</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Team & Recruitment</td>
                    <td className="border border-gray-300 px-3 py-2">12.00%</td>
                    <td className="border border-gray-300 px-3 py-2">1,200,000</td>
                    <td className="border border-gray-300 px-3 py-2">6 month cliff, daily linear 24 months</td>
                    <td className="border border-gray-300 px-3 py-2">0.00%</td>
                    <td className="border border-gray-300 px-3 py-2">0</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Marketing & Partnerships</td>
                    <td className="border border-gray-300 px-3 py-2">15.00%</td>
                    <td className="border border-gray-300 px-3 py-2">1,500,000</td>
                    <td className="border border-gray-300 px-3 py-2">1 month cliff, daily linear for 48 months</td>
                    <td className="border border-gray-300 px-3 py-2">0.00%</td>
                    <td className="border border-gray-300 px-3 py-2">0</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Staking Incentives</td>
                    <td className="border border-gray-300 px-3 py-2">10.00%</td>
                    <td className="border border-gray-300 px-3 py-2">1,000,000</td>
                    <td className="border border-gray-300 px-3 py-2">1 month cliff, daily linear for 48 months</td>
                    <td className="border border-gray-300 px-3 py-2">0.00%</td>
                    <td className="border border-gray-300 px-3 py-2">0</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Ecosystem Rewards</td>
                    <td className="border border-gray-300 px-3 py-2">15.00%</td>
                    <td className="border border-gray-300 px-3 py-2">1,500,000</td>
                    <td className="border border-gray-300 px-3 py-2">3 month cliff, daily linear for 48 months</td>
                    <td className="border border-gray-300 px-3 py-2">0.00%</td>
                    <td className="border border-gray-300 px-3 py-2">0</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Liquidity</td>
                    <td className="border border-gray-300 px-3 py-2">13.00%</td>
                    <td className="border border-gray-300 px-3 py-2">1,300,000</td>
                    <td className="border border-gray-300 px-3 py-2">50% at TGE, daily linear for 2 months</td>
                    <td className="border border-gray-300 px-3 py-2">50.00%</td>
                    <td className="border border-gray-300 px-3 py-2">650,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Private Round</td>
                    <td className="border border-gray-300 px-3 py-2">7.00%</td>
                    <td className="border border-gray-300 px-3 py-2">700,000</td>
                    <td className="border border-gray-300 px-3 py-2">20% at TGE, daily linear for 6 months</td>
                    <td className="border border-gray-300 px-3 py-2">20.00%</td>
                    <td className="border border-gray-300 px-3 py-2">140,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Strategic Round</td>
                    <td className="border border-gray-300 px-3 py-2">3.50%</td>
                    <td className="border border-gray-300 px-3 py-2">350,000</td>
                    <td className="border border-gray-300 px-3 py-2">25% TGE, daily linear for 4 months</td>
                    <td className="border border-gray-300 px-3 py-2">25.00%</td>
                    <td className="border border-gray-300 px-3 py-2">87,500</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Public Round</td>
                    <td className="border border-gray-300 px-3 py-2">4.00%</td>
                    <td className="border border-gray-300 px-3 py-2">400,000</td>
                    <td className="border border-gray-300 px-3 py-2">25% TGE, daily linear for 4 months</td>
                    <td className="border border-gray-300 px-3 py-2">25.00%</td>
                    <td className="border border-gray-300 px-3 py-2">100,000</td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="border border-gray-300 px-3 py-2">Total</td>
                    <td className="border border-gray-300 px-3 py-2">100.00%</td>
                    <td className="border border-gray-300 px-3 py-2">10,000,000</td>
                    <td className="border border-gray-300 px-3 py-2">Release Schedule</td>
                    <td className="border border-gray-300 px-3 py-2">-</td>
                    <td className="border border-gray-300 px-3 py-2">977,500</td>
                  </tr>
                </tbody>
              </table>

              {/* Token Release Schedule */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">$FAN 4 Year Release Schedule</h3>
              
              <p className="text-gray-700 mb-4">
                This chart shows the circulating supply of $FAN tokens over a 4-year period, with different vesting schedules for each allocation category designed to ensure long-term sustainability and prevent market manipulation.
              </p>
              
              <TokenReleaseChart />
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#f0d9ff] rounded mr-2"></div>
                    <span><strong>Treasury (17.5%):</strong> 3-month cliff, then linear over 45 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#ffc9c9] rounded mr-2"></div>
                    <span><strong>Advisory (3%):</strong> 6-month cliff, then linear over 24 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#b8e6ff] rounded mr-2"></div>
                    <span><strong>Team (12%):</strong> 6-month cliff, then linear over 24 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#c3ffc3] rounded mr-2"></div>
                    <span><strong>Marketing (15%):</strong> 1-month cliff, then linear over 47 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#fff380] rounded mr-2"></div>
                    <span><strong>Staking (10%):</strong> 1-month cliff, then linear over 47 months</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#ffcc80] rounded mr-2"></div>
                    <span><strong>Ecosystem (15%):</strong> 3-month cliff, then linear over 45 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#7fffd4] rounded mr-2"></div>
                    <span><strong>Liquidity (13%):</strong> 50% at TGE, then linear over 2 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#dda0dd] rounded mr-2"></div>
                    <span><strong>Private (7%):</strong> 20% at TGE, then linear over 6 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#ffb3d9] rounded mr-2"></div>
                    <span><strong>Strategic (3.5%):</strong> 25% at TGE, then linear over 4 months</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-4 h-4 bg-[#87ceeb] rounded mr-2"></div>
                    <span><strong>Public (4%):</strong> 25% at TGE, then linear over 4 months</span>
                  </div>
                </div>
              </div>

              {/* Funding Rounds */}
              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Funding Rounds & Token Sales</h3>
              
              <table className="w-full border-collapse border border-gray-300 mb-6 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-3 py-2 text-left">Round</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Token Price</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">% of Distribution</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Tokens for Sale</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Total Raise</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">Fully Diluted Valuation</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">TGE Release %</th>
                    <th className="border border-gray-300 px-3 py-2 text-left">TGE Supply</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Private</td>
                    <td className="border border-gray-300 px-3 py-2">$0.5500</td>
                    <td className="border border-gray-300 px-3 py-2">7.00%</td>
                    <td className="border border-gray-300 px-3 py-2">700,000</td>
                    <td className="border border-gray-300 px-3 py-2">$385,000</td>
                    <td className="border border-gray-300 px-3 py-2">$5,500,000</td>
                    <td className="border border-gray-300 px-3 py-2">20%</td>
                    <td className="border border-gray-300 px-3 py-2">140,000</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Strategic</td>
                    <td className="border border-gray-300 px-3 py-2">$0.600</td>
                    <td className="border border-gray-300 px-3 py-2">3.50%</td>
                    <td className="border border-gray-300 px-3 py-2">350,000</td>
                    <td className="border border-gray-300 px-3 py-2">$210,000</td>
                    <td className="border border-gray-300 px-3 py-2">$6,000,000</td>
                    <td className="border border-gray-300 px-3 py-2">25%</td>
                    <td className="border border-gray-300 px-3 py-2">87,500</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-3 py-2">Public</td>
                    <td className="border border-gray-300 px-3 py-2">$0.600</td>
                    <td className="border border-gray-300 px-3 py-2">4.00%</td>
                    <td className="border border-gray-300 px-3 py-2">400,000</td>
                    <td className="border border-gray-300 px-3 py-2">$240,000</td>
                    <td className="border border-gray-300 px-3 py-2">$6,000,000</td>
                    <td className="border border-gray-300 px-3 py-2">25%</td>
                    <td className="border border-gray-300 px-3 py-2">100,000</td>
                  </tr>
                  <tr className="bg-gray-50 font-semibold">
                    <td className="border border-gray-300 px-3 py-2">Total</td>
                    <td className="border border-gray-300 px-3 py-2">-</td>
                    <td className="border border-gray-300 px-3 py-2">14.50%</td>
                    <td className="border border-gray-300 px-3 py-2">1,450,000</td>
                    <td className="border border-gray-300 px-3 py-2">$835,000</td>
                    <td className="border border-gray-300 px-3 py-2">-</td>
                    <td className="border border-gray-300 px-3 py-2">-</td>
                    <td className="border border-gray-300 px-3 py-2">327,500</td>
                  </tr>
                </tbody>
              </table>

              {/* Token Economics Summary */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Economics Summary</h3>
              
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Total Supply:</span>
                      <span className="text-gray-900">10,000,000 $FAN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Initial Circulating Supply:</span>
                      <span className="text-gray-900">977,500 $FAN</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Amount to be Raised:</span>
                      <span className="text-gray-900">$835,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Tokens for Sale:</span>
                      <span className="text-gray-900">1,450,000 $FAN</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Sale Percentage:</span>
                      <span className="text-gray-900">14.50%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Initial Market Cap:</span>
                      <span className="text-gray-900">$586,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Fully Diluted Valuation:</span>
                      <span className="text-gray-900">$6,000,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-700">Emission Period:</span>
                      <span className="text-gray-900">48 months</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Revenue Model */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Revenue Model</h3>
              
              <p className="text-gray-700 mb-4">
                $FAN Protocol generates revenue through multiple streams designed to create sustainable value for all stakeholders:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Platform Transaction Fees:</strong> 3% fee on all content purchases and subscriptions</li>
                <li><strong>Premium Subscriptions:</strong> Monthly/annual subscriptions for enhanced features and analytics</li>
                <li><strong>NFT Marketplace Fees:</strong> Commission on NFT sales and transfers</li>
                <li><strong>Data Analytics Services:</strong> Paid insights and reporting for creators and businesses</li>
                <li><strong>Infrastructure Services:</strong> Revenue sharing from DePIN network operations</li>
                <li><strong>Advertising Revenue:</strong> Targeted, privacy-preserving advertising options</li>
                <li><strong>API Access:</strong> Developer tools and third-party integrations</li>
              </ul>

              {/* Technology Stack */}
              <h2 id="technology-stack" className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Technology Stack</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                $FAN Protocol is built on a cutting-edge technology stack designed for scalability, security, and user experience. Our architecture combines the best of Web3 innovations with proven Web2 technologies to deliver a seamless platform experience.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Blockchain Infrastructure</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Ethereum Layer 2:</strong> Built on Polygon for fast, low-cost transactions</li>
                <li><strong>Smart Contracts:</strong> Audited Solidity contracts for token management and governance</li>
                <li><strong>ERC-20 Token Standard:</strong> Ensuring compatibility with existing DeFi ecosystem</li>
                <li><strong>ERC-721 for NFTs:</strong> Supporting unique digital collectibles and creator assets</li>
                <li><strong>Multi-chain Support:</strong> Planned expansion to Solana, Avalanche, and other chains</li>
                <li><strong>Cross-chain Bridges:</strong> Seamless asset transfer between supported networks</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Decentralized Infrastructure (DePIN)</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>IPFS Storage:</strong> Distributed file storage for content and metadata</li>
                <li><strong>Content Delivery Network:</strong> Global edge nodes for fast content delivery</li>
                <li><strong>Transcoding Nodes:</strong> Distributed video and audio processing</li>
                <li><strong>Edge Computing:</strong> Computational resources distributed globally</li>
                <li><strong>Distributed Database:</strong> Redundant data storage across multiple nodes</li>
                <li><strong>Load Balancing:</strong> Intelligent traffic distribution for optimal performance</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Application Layer</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>React Frontend:</strong> Modern, responsive user interface built with React 18</li>
                <li><strong>GraphQL API:</strong> Efficient data fetching and real-time subscriptions</li>
                <li><strong>AI Content Moderation:</strong> Machine learning models for automated content review</li>
                <li><strong>Analytics Engine:</strong> Real-time data processing and insights generation</li>
                <li><strong>Recommendation System:</strong> AI-powered content discovery and personalization</li>
                <li><strong>Search Engine:</strong> Advanced search capabilities with filters and categorization</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Security & Privacy</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>End-to-End Encryption:</strong> All sensitive data encrypted in transit and at rest</li>
                <li><strong>Zero-Knowledge Proofs:</strong> Privacy-preserving payment verification</li>
                <li><strong>Multi-signature Wallets:</strong> Enhanced security for treasury and governance</li>
                <li><strong>Regular Security Audits:</strong> Quarterly reviews by leading security firms</li>
                <li><strong>Bug Bounty Program:</strong> Community-driven security testing and rewards</li>
                <li><strong>GDPR Compliance:</strong> Full compliance with global privacy regulations</li>
              </ul>

              {/* Platform Features */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Core Platform Features</h3>
              
              <h4 className="text-lg font-medium text-gray-800 mb-2">🔒 Privacy-Preserving Payments</h4>
              <p className="text-gray-700 mb-4">
                Utilizing zero-knowledge proof technology, $FAN Protocol enables completely private transactions while maintaining regulatory compliance. Users can purchase content and support creators without revealing their identity or transaction history to third parties.
              </p>
              
              <h4 className="text-lg font-medium text-gray-800 mb-2">👥 Decentralized Governance</h4>
              <p className="text-gray-700 mb-4">
                Token holders participate in platform governance through a sophisticated voting system. Proposals cover everything from feature development to economic parameters, ensuring the platform evolves according to community needs.
              </p>
              
              <h4 className="text-lg font-medium text-gray-800 mb-2">🎯 Creator Reward System</h4>
              <p className="text-gray-700 mb-4">
                Our innovative reward system incentivizes high-quality content creation, community engagement, and platform growth. Creators earn tokens based on content performance, user engagement, and community contributions.
              </p>
              
              <h4 className="text-lg font-medium text-gray-800 mb-2">📊 Advanced Analytics Suite</h4>
              <p className="text-gray-700 mb-6">
                Comprehensive analytics dashboard providing creators with deep insights into audience behavior, content performance, revenue optimization, and growth opportunities. Data-driven tools help creators maximize their success on the platform.
              </p>

              {/* AI and Machine Learning */}
              <h3 className="text-xl font-semibold text-gray-800 mb-3">AI & Machine Learning</h3>
              
              <p className="text-gray-700 mb-4">
                $FAN Protocol leverages advanced AI and machine learning technologies to enhance user experience, improve content discovery, and ensure platform safety:
              </p>

              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Content Recommendation Engine:</strong> Personalized content discovery based on user preferences and behavior</li>
                <li><strong>Automated Content Moderation:</strong> AI-powered detection of inappropriate content and policy violations</li>
                <li><strong>Fraud Detection:</strong> Machine learning models to identify and prevent fraudulent activities</li>
                <li><strong>Dynamic Pricing:</strong> AI-optimized pricing suggestions for creators based on market conditions</li>
                <li><strong>Audience Insights:</strong> Predictive analytics for creator audience growth and engagement</li>
                <li><strong>Content Tagging:</strong> Automated categorization and tagging of uploaded content</li>
              </ul>

              {/* Governance */}
              <h2 id="governance" className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Governance Model</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Decentralized Autonomous Organization (DAO)</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                $FAN Protocol operates as a Decentralized Autonomous Organization (DAO), ensuring that all major decisions are made collectively by the community of token holders. This governance model promotes transparency, accountability, and democratic participation in the platform's evolution.
              </p>

              <h4 className="text-lg font-medium text-gray-800 mb-2">Governance Structure</h4>
              
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Token-Weighted Voting:</strong> Voting power proportional to $FAN token holdings</li>
                <li><strong>Proposal System:</strong> Community members can submit improvement proposals</li>
                <li><strong>Voting Periods:</strong> Structured timeframes for proposal discussion and voting</li>
                <li><strong>Execution Framework:</strong> Automatic execution of approved proposals through smart contracts</li>
                <li><strong>Veto Powers:</strong> Emergency mechanisms to prevent harmful proposals</li>
                <li><strong>Delegation:</strong> Token holders can delegate voting power to trusted community members</li>
              </ul>

              <h4 className="text-lg font-medium text-gray-800 mb-2">Governance Topics</h4>
              
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li>Platform fee adjustments and revenue distribution</li>
                <li>New feature development and prioritization</li>
                <li>Token emission rate and staking rewards</li>
                <li>Partnership and integration approvals</li>
                <li>Content moderation policies and guidelines</li>
                <li>Treasury fund allocation and investment decisions</li>
                <li>Technical upgrades and protocol improvements</li>
              </ul>

              {/* Roadmap */}
              <h2 id="roadmap" className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Development Roadmap</h2>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Our comprehensive roadmap outlines the strategic development phases for $FAN Protocol, from initial launch through global scale adoption. Each phase builds upon previous achievements while introducing new capabilities and expanding our ecosystem.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Phase 1: Foundation (Q1-Q2 2024)</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Team Expansion:</strong> Core development team formation and advisory board establishment</li>
                <li><strong>Technical Foundation:</strong> Smart contract development and security audits</li>
                <li><strong>MVP Development:</strong> Basic platform functionality and user interface</li>
                <li><strong>Private Alpha:</strong> Closed testing with selected creators and early adopters</li>
                <li><strong>Whitepaper Publication:</strong> Comprehensive technical and economic documentation</li>
                <li><strong>Initial Funding:</strong> Seed round completion and strategic partnerships</li>
                <li><strong>Legal Framework:</strong> Regulatory compliance and legal structure establishment</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Phase 2: Platform Launch (Q3-Q4 2024)</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Public Beta Launch:</strong> Open beta testing with creator onboarding program</li>
                <li><strong>Token Generation Event:</strong> $FAN token launch and initial distribution</li>
                <li><strong>Core Features:</strong> Content upload, payment processing, and basic analytics</li>
                <li><strong>Community Building:</strong> Social features, commenting, and creator tools</li>
                <li><strong>Mobile Application:</strong> iOS and Android app development and release</li>
                <li><strong>Payment Integration:</strong> Cryptocurrency and traditional payment method support</li>
                <li><strong>Content Moderation:</strong> AI-powered moderation system implementation</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Phase 3: Ecosystem Expansion (Q1-Q2 2025)</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Advanced Analytics:</strong> Comprehensive creator dashboard and audience insights</li>
                <li><strong>NFT Marketplace:</strong> Creator NFT minting and trading capabilities</li>
                <li><strong>Governance Launch:</strong> DAO implementation and community voting system</li>
                <li><strong>Staking Platform:</strong> Token staking rewards and network security participation</li>
                <li><strong>API Development:</strong> Third-party integration and developer tools</li>
                <li><strong>Multi-chain Support:</strong> Cross-chain functionality and asset bridging</li>
                <li><strong>Creator Tools:</strong> Advanced editing, scheduling, and collaboration features</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Phase 4: Global Scale (Q3-Q4 2025)</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Global Expansion:</strong> Multi-language support and regional partnerships</li>
                <li><strong>Enterprise Solutions:</strong> B2B services and white-label platform options</li>
                <li><strong>Advanced AI Features:</strong> Personalized recommendations and content optimization</li>
                <li><strong>Virtual Reality:</strong> VR content support and immersive experiences</li>
                <li><strong>DeFi Integration:</strong> Yield farming, lending, and advanced financial products</li>
                <li><strong>Institutional Adoption:</strong> Enterprise partnerships and institutional investor onboarding</li>
                <li><strong>Regulatory Compliance:</strong> Full compliance with global digital asset regulations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Phase 5: Innovation & Growth (2026+)</h3>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                <li><strong>Metaverse Integration:</strong> Virtual world content creation and monetization</li>
                <li><strong>AI Content Generation:</strong> AI-assisted content creation tools and automation</li>
                <li><strong>Decentralized Computing:</strong> Expanded DePIN network for global infrastructure</li>
                <li><strong>Social Commerce:</strong> Integrated e-commerce and social shopping features</li>
                <li><strong>Educational Platform:</strong> Creator education and skill development programs</li>
                <li><strong>Sustainability Initiative:</strong> Carbon-neutral operations and environmental impact reduction</li>
                <li><strong>Research & Development:</strong> Continued innovation in blockchain and content technology</li>
              </ul>

              {/* Team & Advisors */}
              <h2 id="team" className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Team & Advisors</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Core Team</h3>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                Our leadership team brings together decades of experience in content platforms, blockchain technology, business development, and talent management. With proven track records from successful ventures and industry-leading companies, we have the expertise to execute our ambitious vision for $FAN Protocol.
              </p>

              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Mike Hales - Co-Founder</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Founder of First Class, the UK's largest TikTok partner agency with millions in turnover and close to 1,000 streamers signed exclusively. Under Mike's leadership, First Class has partnered with some of the largest social media accounts and top-earning content creators, demonstrating his deep understanding of the creator economy and talent management at scale.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Indi Jay Cammish - Co-Founder</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Co-founder of First Class alongside Mike and co-founder of DeHub. Indi brings a unique perspective as a renowned professional dancer who has performed for A-list celebrities and even royalty, while starring in Channel 4's "The Masked Dancer". Her entertainment industry experience and business acumen provide valuable insights into creator needs and audience engagement.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Crypto Columbus - Blockchain Advisor</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Original founder with extensive experience in cryptocurrency and blockchain project development. His deep understanding of tokenomics, community building, and decentralized protocol development brings crucial expertise to $FAN Protocol's technical and strategic direction.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Bailey Young - Business Development</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Highly experienced business professional with a strong commercial background and leadership roles at multi-million pound UK businesses. Bailey achieved a 7-figure exit at Flamengo Resourcing, demonstrating his ability to scale businesses and execute successful strategies in competitive markets.
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg">Malik Jan - Strategic Advisor</h4>
                  <p className="text-gray-700 leading-relaxed">
                    Founder of DeHub, which achieved an ROI of 1000x and $10M in liquidity at peak performance. Previously served as the top billing agent at Blue Arrow, the UK's largest agency with 65 offices nationwide and 600 staff, and formerly at Randstad, the world's largest staffing agency. His expertise in scaling operations and strategic partnerships is invaluable to $FAN Protocol's growth.
                  </p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Team Expertise Summary</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Content & Creator Economy</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• TikTok partner agency with 1,000+ creators</li>
                    <li>• Multi-million turnover content business</li>
                    <li>• Entertainment industry performance experience</li>
                    <li>• Creator monetization and talent management</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Blockchain & Technology</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Cryptocurrency project founding experience</li>
                    <li>• DeFi protocol development expertise</li>
                    <li>• 1000x ROI project execution</li>
                    <li>• Tokenomics and community building</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Business Development</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• 7-figure business exit experience</li>
                    <li>• Multi-million pound business leadership</li>
                    <li>• Strategic partnership development</li>
                    <li>• Commercial strategy and execution</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Operations & Scale</h4>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Global staffing agency experience</li>
                    <li>• 65-office network management</li>
                    <li>• 600+ staff operational oversight</li>
                    <li>• International business development</li>
                  </ul>
                </div>
              </div>

              {/* Risk Analysis */}
              <h2 id="risk-analysis" className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Risk Analysis</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                While $FAN Protocol presents significant opportunities, we acknowledge various risks that could impact the project's success. Our team has developed comprehensive risk mitigation strategies to address these challenges.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Technical Risks</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Smart Contract Vulnerabilities:</strong> Mitigated through multiple security audits and bug bounty programs</li>
                <li><strong>Scalability Challenges:</strong> Addressed through Layer 2 solutions and optimized architecture</li>
                <li><strong>Network Congestion:</strong> Multi-chain strategy provides alternative pathways for transactions</li>
                <li><strong>Technology Evolution:</strong> Agile development approach allows adaptation to new technologies</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Market Risks</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Competition:</strong> Strong differentiation through decentralized approach and creator-first economics</li>
                <li><strong>Market Volatility:</strong> Diversified revenue streams reduce dependence on token price</li>
                <li><strong>User Adoption:</strong> Comprehensive marketing and incentive programs drive platform growth</li>
                <li><strong>Regulatory Changes:</strong> Proactive compliance strategy and legal expertise</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Operational Risks</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Team Risk:</strong> Strong team retention strategies and knowledge documentation</li>
                <li><strong>Funding Risk:</strong> Multiple funding sources and conservative financial management</li>
                <li><strong>Partnership Risk:</strong> Diversified partnership strategy reduces single points of failure</li>
                <li><strong>Execution Risk:</strong> Experienced team with proven track record in similar projects</li>
              </ul>

              {/* Legal & Compliance */}
              <h2 id="legal-compliance" className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Legal & Compliance</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                $FAN Protocol is committed to operating within all applicable legal frameworks while maintaining the decentralized and permissionless nature of the platform. We work closely with legal experts to ensure compliance across multiple jurisdictions.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Regulatory Compliance</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                <li><strong>Securities Compliance:</strong> $FAN token structure designed to comply with applicable securities laws</li>
                <li><strong>Anti-Money Laundering:</strong> KYC/AML procedures for large transactions and institutional users</li>
                <li><strong>Data Protection:</strong> GDPR, CCPA, and other privacy regulation compliance</li>
                <li><strong>Content Regulation:</strong> Age verification and content classification systems</li>
                <li><strong>Tax Compliance:</strong> Clear tax reporting and withholding procedures</li>
                <li><strong>Consumer Protection:</strong> User rights protection and dispute resolution mechanisms</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">Terms of Service</h3>
              <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
                <li>Clear user rights and responsibilities</li>
                <li>Content creation and sharing guidelines</li>
                <li>Payment and refund policies</li>
                <li>Intellectual property protection</li>
                <li>Dispute resolution procedures</li>
                <li>Platform modification and termination terms</li>
              </ul>

              {/* Conclusion */}
              <h2 id="conclusion" className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Conclusion</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4">
                $FAN Protocol represents a fundamental shift toward a more equitable, transparent, and creator-centric digital content ecosystem. By combining cutting-edge blockchain technology with user-focused design, we are building a platform that truly serves its community while creating sustainable value for all stakeholders.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                Our comprehensive approach addresses the core challenges facing today's content creators: high platform fees, limited monetization options, censorship concerns, and inadequate analytics. Through decentralized governance, innovative tokenomics, and advanced technology infrastructure, $FAN Protocol creates a sustainable ecosystem where creators can thrive.
              </p>

              <p className="text-gray-700 leading-relaxed mb-4">
                The significant market opportunity, combined with our experienced team and robust technology stack, positions $FAN Protocol for long-term success. As we execute our roadmap and grow our community, we remain committed to our core mission of empowering creators and revolutionizing the digital content industry.
              </p>

              <p className="text-gray-700 leading-relaxed mb-8">
                We invite creators, users, and investors to join us in building the future of decentralized content platforms. Together, we can create a more open, fair, and prosperous digital economy for everyone.
              </p>

            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>;
};
export default Docs;
