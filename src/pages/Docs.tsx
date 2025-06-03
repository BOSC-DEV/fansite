import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  BookOpen, 
  FileText, 
  Users, 
  Settings, 
  Instagram, 
  Twitter,
  Code,
  Shield,
  Zap,
  Coins,
  Lock,
  Eye,
  Globe,
  TrendingUp
} from 'lucide-react';

const Docs = () => {
  const [activeSection, setActiveSection] = useState('introduction');

  const sections = [
    { id: 'introduction', title: 'Introduction', icon: BookOpen },
    { id: 'whitepaper', title: 'Whitepaper', icon: FileText },
    { id: 'tokenomics', title: 'Tokenomics', icon: Coins },
    { id: 'technology', title: 'Technology', icon: Code },
    { id: 'privacy', title: 'Privacy & Security', icon: Shield },
    { id: 'api', title: 'API Reference', icon: Settings },
    { id: 'getting-started', title: 'Getting Started', icon: Zap },
    { id: 'community', title: 'Community', icon: Users }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'introduction':
        return (
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome to fan.site</h1>
            
            <div className="bg-gradient-to-r from-[#D4A574]/10 to-[#E0B878]/10 border border-[#D4A574]/20 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center">
                <Globe className="h-6 w-6 mr-2" />
                Revolutionizing Creator-Fan Relationships
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                fan.site is a decentralized platform that empowers creators to monetize their content 
                while maintaining complete ownership of their data and fan relationships. Built on blockchain 
                technology with privacy-first principles, we eliminate intermediaries and reduce fees to 
                near-zero levels.
              </p>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">Our Mission</h2>
              <div className="space-y-4 text-blue-800">
                <p className="leading-relaxed">
                  <strong>Decentralized Freedom:</strong> To provide a decentralised, permissionless & censorship resistant protocol for mature content creators and consumers that requires no KYC or bank, while offering private payments, data analytics, wank2earn & other cutting edge innovations through the full utilisation of rapidly advancing blockchain & AI technologies.
                </p>
                
                <p className="leading-relaxed">
                  <strong>Sustainable Infrastructure:</strong> To sustainably scale and actually have the resources to disrupt a giant market without a billion dollar bankroll. We utilise our decentralised physical infrastructure network (DeePin) of shared computing power to host, transcode and deliver content or data while rewarding miners.
                </p>
                
                <p className="leading-relaxed">
                  <strong>User Empowerment:</strong> To create a user centric ecosystem that self moderates and removes the middle-man while tokenising ownership to empower & minimise the fees incurred by creators as well as consumers.
                </p>
                
                <p className="leading-relaxed">
                  <strong>Advanced Analytics:</strong> To build a complete suite of data analytics toolkits that help creators find the biggest spenders, users find their ideal creators and businesses increase ROI by choosing the right partners.
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <Lock className="h-8 w-8 text-[#D889A5] mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy First</h3>
                <p className="text-gray-600">
                  Zero-knowledge proofs and encrypted communications ensure your data remains private.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <Coins className="h-8 w-8 text-[#B8A5D9] mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Low Fees</h3>
                <p className="text-gray-600">
                  Decentralized infrastructure means creators keep more of what they earn.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <Shield className="h-8 w-8 text-[#8FB1E0] mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Own Your Data</h3>
                <p className="text-gray-600">
                  Complete ownership and control over your content, fan base, and revenue streams.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Key Features</h2>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center"><Eye className="h-4 w-4 mr-2 text-[#D4A574]" /> No surveillance or data harvesting</li>
              <li className="flex items-center"><Lock className="h-4 w-4 mr-2 text-[#D889A5]" /> Encrypted direct messaging</li>
              <li className="flex items-center"><Zap className="h-4 w-4 mr-2 text-[#B8A5D9]" /> Instant, low-cost transactions</li>
              <li className="flex items-center"><TrendingUp className="h-4 w-4 mr-2 text-[#8FB1E0]" /> Creator-owned monetization tools</li>
            </ul>
          </div>
        );

      case 'whitepaper':
        return (
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">fan.site Whitepaper</h1>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Abstract</h2>
            <p className="text-gray-700 mb-6">
              The creator economy is broken. Centralized platforms extract excessive fees, spy on communications, 
              and control creator-fan relationships. fan.site presents a decentralized alternative that prioritizes 
              creator sovereignty, fan privacy, and fair monetization through blockchain technology and zero-knowledge proofs.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Problem Statement</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-red-900 mb-2">Current Platform Issues</h3>
              <ul className="text-red-800 space-y-2">
                <li>• High platform fees (20-30% average)</li>
                <li>• Surveillance of private communications</li>
                <li>• Platform ownership of creator data and relationships</li>
                <li>• Arbitrary content restrictions and deplatforming</li>
                <li>• Lack of transparent revenue sharing</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Solution Architecture</h2>
            <p className="text-gray-700 mb-4">
              fan.site leverages blockchain technology to create a trustless, decentralized platform where:
            </p>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>• Smart contracts handle payments and revenue distribution</li>
              <li>• Zero-knowledge proofs protect user privacy</li>
              <li>• IPFS ensures decentralized content storage</li>
              <li>• Creators maintain full ownership of their data</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Technical Implementation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Blockchain Layer</h3>
                <p className="text-gray-600">
                  Built on Ethereum for smart contracts with Layer 2 scaling solutions for low-cost transactions.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Privacy Layer</h3>
                <p className="text-gray-600">
                  Zero-knowledge proofs enable private transactions and communications without revealing sensitive data.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Economic Model</h2>
            <p className="text-gray-700 mb-4">
              The fan.site economic model is designed to maximize creator revenue while maintaining platform sustainability:
            </p>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>• 2% platform fee (vs 20-30% traditional platforms)</li>
              <li>• Direct creator-fan transactions</li>
              <li>• Transparent fee structure</li>
              <li>• Community governance through $FAN token</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Roadmap</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-[#D4A574] pl-4">
                <h3 className="font-semibold text-gray-900">Q1 2024: Foundation</h3>
                <p className="text-gray-600">MVP launch, basic creator tools, $FAN token distribution</p>
              </div>
              <div className="border-l-4 border-[#D889A5] pl-4">
                <h3 className="font-semibold text-gray-900">Q2 2024: Privacy Features</h3>
                <p className="text-gray-600">Zero-knowledge messaging, encrypted content delivery</p>
              </div>
              <div className="border-l-4 border-[#B8A5D9] pl-4">
                <h3 className="font-semibold text-gray-900">Q3 2024: Advanced Tools</h3>
                <p className="text-gray-600">Analytics dashboard, creator collaboration tools</p>
              </div>
              <div className="border-l-4 border-[#8FB1E0] pl-4">
                <h3 className="font-semibold text-gray-900">Q4 2024: Ecosystem</h3>
                <p className="text-gray-600">Third-party integrations, mobile app, governance launch</p>
              </div>
            </div>
          </div>
        );

      case 'tokenomics':
        return (
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">$FAN Tokenomics</h1>
            
            <div className="bg-gradient-to-r from-[#D4A574]/10 to-[#E0B878]/10 border border-[#D4A574]/20 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#D4A574] mb-4 flex items-center">
                <Coins className="h-6 w-6 mr-2" />
                Token Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">$FAN</div>
                  <div className="text-sm text-gray-600">Token Symbol</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">10M</div>
                  <div className="text-sm text-gray-600">Total Supply</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">ERC-20</div>
                  <div className="text-sm text-gray-600">Standard</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">Fixed</div>
                  <div className="text-sm text-gray-600">Supply Model</div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Token Distribution</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Distribution</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">% of Allocation</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Number of Tokens</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Vesting Schedule</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">TGE Release %</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">TGE Supply</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Treasury Reserve</td>
                    <td className="border border-gray-300 px-4 py-3">17.50%</td>
                    <td className="border border-gray-300 px-4 py-3">1,750,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">3 month cliff, daily linear 48 months</td>
                    <td className="border border-gray-300 px-4 py-3">0.00%</td>
                    <td className="border border-gray-300 px-4 py-3">0</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Advisory</td>
                    <td className="border border-gray-300 px-4 py-3">3.00%</td>
                    <td className="border border-gray-300 px-4 py-3">300,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">6 month cliff, daily linear 24 months</td>
                    <td className="border border-gray-300 px-4 py-3">0.00%</td>
                    <td className="border border-gray-300 px-4 py-3">0</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Team & Recruitment</td>
                    <td className="border border-gray-300 px-4 py-3">12.00%</td>
                    <td className="border border-gray-300 px-4 py-3">1,200,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">6 month cliff, daily linear 24 months</td>
                    <td className="border border-gray-300 px-4 py-3">0.00%</td>
                    <td className="border border-gray-300 px-4 py-3">0</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Marketing & Partnerships</td>
                    <td className="border border-gray-300 px-4 py-3">15.00%</td>
                    <td className="border border-gray-300 px-4 py-3">1,500,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">1 month cliff, daily linear for 48 months</td>
                    <td className="border border-gray-300 px-4 py-3">0.00%</td>
                    <td className="border border-gray-300 px-4 py-3">0</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Staking Incentives</td>
                    <td className="border border-gray-300 px-4 py-3">10.00%</td>
                    <td className="border border-gray-300 px-4 py-3">1,000,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">1 month cliff, daily linear for 48 months</td>
                    <td className="border border-gray-300 px-4 py-3">0.00%</td>
                    <td className="border border-gray-300 px-4 py-3">0</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Ecosystem Rewards</td>
                    <td className="border border-gray-300 px-4 py-3">15.00%</td>
                    <td className="border border-gray-300 px-4 py-3">1,500,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">3 month cliff, daily linear for 48 months</td>
                    <td className="border border-gray-300 px-4 py-3">0.00%</td>
                    <td className="border border-gray-300 px-4 py-3">0</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Liquidity</td>
                    <td className="border border-gray-300 px-4 py-3">13.00%</td>
                    <td className="border border-gray-300 px-4 py-3">1,300,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">50% at TGE, daily linear for 2 months</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">50.00%</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">650,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Private Round</td>
                    <td className="border border-gray-300 px-4 py-3">7.00%</td>
                    <td className="border border-gray-300 px-4 py-3">700,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">20% at TGE, daily linear for 6 months</td>
                    <td className="border border-gray-300 px-4 py-3 text-blue-600 font-semibold">20.00%</td>
                    <td className="border border-gray-300 px-4 py-3 text-blue-600 font-semibold">140,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Strategic Round</td>
                    <td className="border border-gray-300 px-4 py-3">3.50%</td>
                    <td className="border border-gray-300 px-4 py-3">350,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">25% TGE, daily linear for 4 months</td>
                    <td className="border border-gray-300 px-4 py-3 text-purple-600 font-semibold">25.00%</td>
                    <td className="border border-gray-300 px-4 py-3 text-purple-600 font-semibold">87,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Public Round</td>
                    <td className="border border-gray-300 px-4 py-3">4.00%</td>
                    <td className="border border-gray-300 px-4 py-3">400,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-sm">25% TGE, daily linear for 4 months</td>
                    <td className="border border-gray-300 px-4 py-3 text-orange-600 font-semibold">25.00%</td>
                    <td className="border border-gray-300 px-4 py-3 text-orange-600 font-semibold">100,000</td>
                  </tr>
                  <tr className="bg-gray-100 font-bold">
                    <td className="border border-gray-300 px-4 py-3">Total</td>
                    <td className="border border-gray-300 px-4 py-3">100.00%</td>
                    <td className="border border-gray-300 px-4 py-3">10,000,000</td>
                    <td className="border border-gray-300 px-4 py-3">-</td>
                    <td className="border border-gray-300 px-4 py-3">-</td>
                    <td className="border border-gray-300 px-4 py-3">977,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">IDOs & Sales</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Round</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Token Price</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">% of Distribution</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Tokens for Sale</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Total Raised</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">FDV</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">TGE Release %</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">TGE Supply</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Private</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-blue-600">$0.5500</td>
                    <td className="border border-gray-300 px-4 py-3">7.00%</td>
                    <td className="border border-gray-300 px-4 py-3">700,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">$385,000</td>
                    <td className="border border-gray-300 px-4 py-3">$5,500,000</td>
                    <td className="border border-gray-300 px-4 py-3">20%</td>
                    <td className="border border-gray-300 px-4 py-3">140,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Strategic</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-purple-600">$0.600</td>
                    <td className="border border-gray-300 px-4 py-3">3.50%</td>
                    <td className="border border-gray-300 px-4 py-3">350,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">$210,000</td>
                    <td className="border border-gray-300 px-4 py-3">$6,000,000</td>
                    <td className="border border-gray-300 px-4 py-3">25%</td>
                    <td className="border border-gray-300 px-4 py-3">87,500</td>
                  </tr>
                  <tr className="hover:bg-gray-50 bg-yellow-50">
                    <td className="border border-gray-300 px-4 py-3 font-medium">Public</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold text-orange-600">$0.600</td>
                    <td className="border border-gray-300 px-4 py-3">4.00%</td>
                    <td className="border border-gray-300 px-4 py-3">400,000</td>
                    <td className="border border-gray-300 px-4 py-3 font-semibold">$240,000</td>
                    <td className="border border-gray-300 px-4 py-3">$6,000,000</td>
                    <td className="border border-gray-300 px-4 py-3">25%</td>
                    <td className="border border-gray-300 px-4 py-3">100,000</td>
                  </tr>
                  <tr className="bg-gray-100 font-bold">
                    <td className="border border-gray-300 px-4 py-3">Total</td>
                    <td className="border border-gray-300 px-4 py-3">-</td>
                    <td className="border border-gray-300 px-4 py-3">14.50%</td>
                    <td className="border border-gray-300 px-4 py-3">1,450,000</td>
                    <td className="border border-gray-300 px-4 py-3">$835,000</td>
                    <td className="border border-gray-300 px-4 py-3">-</td>
                    <td className="border border-gray-300 px-4 py-3">-</td>
                    <td className="border border-gray-300 px-4 py-3">327,500</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Token Utility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-[#D4A574]" />
                  Governance
                </h3>
                <p className="text-gray-600">
                  Vote on platform upgrades, fee structures, and community proposals.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-[#D889A5]" />
                  Transaction Fees
                </h3>
                <p className="text-gray-600">
                  Discounted platform fees for transactions paid in $FAN tokens.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-[#B8A5D9]" />
                  Staking Rewards
                </h3>
                <p className="text-gray-600">
                  Stake tokens to earn rewards and unlock premium platform features.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-[#8FB1E0]" />
                  Creator Rewards
                </h3>
                <p className="text-gray-600">
                  Additional $FAN rewards for high-performing creators and community builders.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Economic Mechanics</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Deflationary Pressure</h3>
              <p className="text-blue-800 mb-4">
                A portion of platform fees are used to buy back and burn $FAN tokens, creating deflationary pressure and long-term value accrual.
              </p>
              <ul className="text-blue-800 space-y-1">
                <li>• 50% of platform fees used for token buybacks</li>
                <li>• Quarterly burning events</li>
                <li>• Transparent on-chain tracking</li>
              </ul>
            </div>
          </div>
        );

      case 'technology':
        return (
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Technical Architecture</h1>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">System Overview</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
              <pre className="text-sm text-gray-700 overflow-x-auto">
{`┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   IPFS Storage  │    │   Blockchain    │
│   (React/Web3)  │◄──►│   (Content)     │◄──►│   (Smart       │
│                 │    │                 │    │   Contracts)    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         ▲                       ▲                       ▲
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ZK Privacy    │    │   P2P Messaging │    │   Token         │
│   Layer         │    │   Network       │    │   Economics     │
└─────────────────┘    └─────────────────┘    └─────────────────┘`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Core Components</h2>
            
            <div className="space-y-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-[#D4A574]" />
                  Smart Contract Layer
                </h3>
                <p className="text-gray-600 mb-3">
                  Ethereum-based smart contracts handle all financial transactions, content ownership, and governance.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Key Contracts:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• <code>FanToken.sol</code> - ERC-20 token implementation</li>
                    <li>• <code>CreatorRegistry.sol</code> - Creator profile and verification</li>
                    <li>• <code>ContentNFT.sol</code> - Content ownership and licensing</li>
                    <li>• <code>PaymentProcessor.sol</code> - Subscription and tip handling</li>
                    <li>• <code>Governance.sol</code> - DAO voting and proposals</li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-[#D889A5]" />
                  Zero-Knowledge Privacy
                </h3>
                <p className="text-gray-600 mb-3">
                  Advanced cryptographic proofs ensure user privacy while maintaining platform integrity.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Privacy Features:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Anonymous subscription verification</li>
                    <li>• Private transaction amounts</li>
                    <li>• Encrypted direct messaging</li>
                    <li>• Hidden fan/creator relationships</li>
                  </ul>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-[#B8A5D9]" />
                  Decentralized Storage
                </h3>
                <p className="text-gray-600 mb-3">
                  IPFS and Arweave provide censorship-resistant, permanent content storage.
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-2">Storage Strategy:</h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• IPFS for dynamic content and metadata</li>
                    <li>• Arweave for permanent content archival</li>
                    <li>• Client-side encryption before upload</li>
                    <li>• Redundant pinning across multiple nodes</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Measures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-green-200 bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Smart Contract Security</h3>
                <ul className="text-green-800 text-sm space-y-1">
                  <li>• Multi-signature wallet controls</li>
                  <li>• Time-locked upgrades</li>
                  <li>• Formal verification</li>
                  <li>• Third-party audits</li>
                </ul>
              </div>
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">User Security</h3>
                <ul className="text-blue-800 text-sm space-y-1">
                  <li>• Hardware wallet integration</li>
                  <li>• Multi-factor authentication</li>
                  <li>• End-to-end encryption</li>
                  <li>• Regular security audits</li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy & Security</h1>
            
            <div className="bg-gradient-to-r from-[#D889A5]/10 to-[#B8A5D9]/10 border border-[#D889A5]/20 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#D889A5] mb-4 flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Privacy-First Architecture
              </h2>
              <p className="text-gray-700 text-lg">
                fan.site is built from the ground up with privacy as a core principle. We use cutting-edge 
                cryptographic techniques to ensure that user data remains private and secure.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Zero-Knowledge Proofs</h2>
            <p className="text-gray-700 mb-4">
              Our zero-knowledge proof system allows users to verify their subscription status, 
              transaction history, and identity without revealing any sensitive information.
            </p>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">How It Works</h3>
              <ol className="text-gray-700 space-y-2">
                <li>1. User generates a cryptographic proof of their subscription</li>
                <li>2. Creator can verify the proof without seeing payment details</li>
                <li>3. Platform confirms access rights without storing personal data</li>
                <li>4. All interactions remain private and untraceable</li>
              </ol>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Encrypted Communications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-[#D4A574]" />
                  End-to-End Encryption
                </h3>
                <p className="text-gray-600">
                  All direct messages between creators and fans use Signal Protocol encryption, 
                  ensuring only intended recipients can read messages.
                </p>
              </div>
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Eye className="h-5 w-5 mr-2 text-[#D889A5]" />
                  No Message Scanning
                </h3>
                <p className="text-gray-600">
                  Unlike traditional platforms, we never scan, analyze, or store the content 
                  of private communications between users.
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Ownership</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-green-900 mb-2">Your Data, Your Control</h3>
              <ul className="text-green-800 space-y-2">
                <li>• Creators own all content and fan relationship data</li>
                <li>• Export your data at any time in standard formats</li>
                <li>• Delete your account and all associated data permanently</li>
                <li>• No third-party data sharing or selling</li>
                <li>• Transparent data usage policies</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Transaction Privacy</h2>
            <p className="text-gray-700 mb-4">
              Financial privacy is crucial for both creators and fans. Our system implements 
              several layers of transaction privacy:
            </p>
            
            <div className="space-y-4 mb-6">
              <div className="border-l-4 border-[#D4A574] pl-4">
                <h3 className="font-semibold text-gray-900">Private Payment Amounts</h3>
                <p className="text-gray-600">Transaction amounts are hidden using cryptographic commitments</p>
              </div>
              <div className="border-l-4 border-[#D889A5] pl-4">
                <h3 className="font-semibold text-gray-900">Anonymous Subscriptions</h3>
                <p className="text-gray-600">Subscribe to creators without revealing your identity or payment history</p>
              </div>
              <div className="border-l-4 border-[#B8A5D9] pl-4">
                <h3 className="font-semibold text-gray-900">Mixing Protocols</h3>
                <p className="text-gray-600">Optional transaction mixing for enhanced privacy</p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Security Audits</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#D4A574] mb-2">Quarterly</div>
                <div className="text-sm text-gray-600">Smart Contract Audits</div>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#D889A5] mb-2">Monthly</div>
                <div className="text-sm text-gray-600">Penetration Testing</div>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <div className="text-2xl font-bold text-[#B8A5D9] mb-2">Continuous</div>
                <div className="text-sm text-gray-600">Bug Bounty Program</div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">API Reference</h1>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-blue-900 mb-2">REST API v1</h2>
              <p className="text-blue-800">
                Base URL: <code className="bg-blue-100 px-2 py-1 rounded">https://api.fan.site/v1</code>
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Authentication</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Wallet-Based Auth</h3>
              <p className="text-gray-700 mb-3">All API requests require wallet signature authentication:</p>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded text-sm overflow-x-auto">
{`POST /auth/challenge
{
  "address": "0x742d35Cc6638C0532925a3b8D43D8cC302d90F53"
}

Response:
{
  "challenge": "Sign this message to authenticate: 1234567890",
  "expires": "2024-01-01T12:00:00Z"
}

POST /auth/verify
{
  "address": "0x742d35Cc6638C0532925a3b8D43D8cC302d90F53",
  "signature": "0x...",
  "challenge": "Sign this message to authenticate: 1234567890"
}

Response:
{
  "token": "jwt_token_here",
  "expires": "2024-01-01T12:00:00Z"
}`}
              </pre>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Endpoints</h2>
            
            <div className="space-y-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-green-600">Creator Endpoints</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
                      <span className="font-mono text-sm">/creators/{`{wallet_address}`}</span>
                    </div>
                    <p className="text-gray-600 text-sm">Get creator profile and statistics</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono mr-2">POST</span>
                      <span className="font-mono text-sm">/creators/profile</span>
                    </div>
                    <p className="text-gray-600 text-sm">Update creator profile information</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
                      <span className="font-mono text-sm">/creators/{`{wallet_address}`}/content</span>
                    </div>
                    <p className="text-gray-600 text-sm">List creator's published content</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-blue-600">Content Endpoints</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono mr-2">POST</span>
                      <span className="font-mono text-sm">/content/upload</span>
                    </div>
                    <p className="text-gray-600 text-sm">Upload new content to IPFS</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
                      <span className="font-mono text-sm">/content/{`{content_hash}`}</span>
                    </div>
                    <p className="text-gray-600 text-sm">Get content metadata and access URL</p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 text-purple-600">Subscription Endpoints</h3>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-mono mr-2">POST</span>
                      <span className="font-mono text-sm">/subscriptions/create</span>
                    </div>
                    <p className="text-gray-600 text-sm">Create new subscription with zero-knowledge proof</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="flex items-center mb-2">
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-mono mr-2">GET</span>
                      <span className="font-mono text-sm">/subscriptions/verify</span>
                    </div>
                    <p className="text-gray-600 text-sm">Verify subscription status without revealing details</p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">WebSocket Events</h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p className="text-gray-700 mb-3">Real-time updates via WebSocket connection:</p>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded text-sm overflow-x-auto">
{`// Connect to WebSocket
const ws = new WebSocket('wss://api.fan.site/v1/ws');

// Subscribe to creator updates
ws.send(JSON.stringify({
  type: 'subscribe',
  channel: 'creator_updates',
  creator_address: '0x742d35Cc6638C0532925a3b8D43D8cC302d90F53'
}));

// Receive real-time notifications
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('New update:', data);
};`}
              </pre>
            </div>
          </div>
        );

      case 'getting-started':
        return (
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Getting Started</h1>
            
            <div className="bg-gradient-to-r from-[#8FB1E0]/10 to-[#B8A5D9]/10 border border-[#8FB1E0]/20 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#8FB1E0] mb-4 flex items-center">
                <Zap className="h-6 w-6 mr-2" />
                Quick Start Guide
              </h2>
              <p className="text-gray-700 text-lg">
                Get up and running on fan.site in just a few minutes. Follow this step-by-step guide 
                to create your profile and start monetizing your content.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">For Creators</h2>
            
            <div className="space-y-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="bg-[#D4A574] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Wallet</h3>
                    <p className="text-gray-600 mb-3">
                      Install MetaMask or another Web3 wallet and connect it to fan.site. This will be your 
                      identity and payment address on the platform.
                    </p>
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Supported Wallets:</strong> MetaMask, WalletConnect, Coinbase Wallet, Rainbow
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="bg-[#D889A5] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Set Up Your Profile</h3>
                    <p className="text-gray-600 mb-3">
                      Create your creator profile with a bio, profile picture, and links to your other 
                      social media accounts.
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Upload a profile picture and banner</li>
                      <li>• Write a compelling bio</li>
                      <li>• Add links to your other platforms</li>
                      <li>• Set your subscription tiers and pricing</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="bg-[#B8A5D9] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Publish Your First Content</h3>
                    <p className="text-gray-600 mb-3">
                      Upload your content to the decentralized storage network and set access permissions 
                      for different subscription tiers.
                    </p>
                    <div className="bg-blue-50 p-4 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Pro Tip:</strong> Start with some free content to attract followers, 
                        then gradually introduce premium tiers.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="bg-[#8FB1E0] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">4</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Start Earning</h3>
                    <p className="text-gray-600 mb-3">
                      Share your fan.site profile link and start receiving subscriptions and tips from your fans.
                    </p>
                    <ul className="text-gray-600 space-y-1 text-sm">
                      <li>• Share your profile on social media</li>
                      <li>• Engage with your subscribers</li>
                      <li>• Track your earnings in the dashboard</li>
                      <li>• Withdraw earnings to your wallet anytime</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">For Fans</h2>
            
            <div className="space-y-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="bg-[#D4A574] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">1</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Some $FAN Tokens</h3>
                    <p className="text-gray-600 mb-3">
                      Purchase $FAN tokens from a decentralized exchange or receive them as rewards 
                      for platform participation.
                    </p>
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-sm text-gray-700">
                        <strong>Where to Buy:</strong> Uniswap, SushiSwap, or directly through our platform
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="bg-[#D889A5] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">2</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Discover Creators</h3>
                    <p className="text-gray-600 mb-3">
                      Browse the creator directory, search by category, or follow recommendations 
                      to find creators you want to support.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start">
                  <div className="bg-[#B8A5D9] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 mt-1">3</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Subscribe & Support</h3>
                    <p className="text-gray-600 mb-3">
                      Choose a subscription tier and start supporting your favorite creators. 
                      All transactions are private and secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need Help?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Users className="h-8 w-8 text-[#D4A574] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Community</h3>
                <p className="text-gray-600 text-sm">Join our Discord for support and discussions</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <FileText className="h-8 w-8 text-[#D889A5] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Documentation</h3>
                <p className="text-gray-600 text-sm">Browse our comprehensive docs and tutorials</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg">
                <Settings className="h-8 w-8 text-[#B8A5D9] mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
                <p className="text-gray-600 text-sm">Contact our support team for technical help</p>
              </div>
            </div>
          </div>
        );

      case 'community':
        return (
          <div className="prose max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Community</h1>
            
            <div className="bg-gradient-to-r from-[#B8A5D9]/10 to-[#8FB1E0]/10 border border-[#B8A5D9]/20 rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-[#B8A5D9] mb-4 flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Join the fan.site Community
              </h2>
              <p className="text-gray-700 text-lg">
                Connect with creators, developers, and fans building the future of decentralized content monetization.
              </p>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Community Channels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-[#D4A574]" />
                  Discord Server
                </h3>
                <p className="text-gray-600 mb-3">
                  Join our Discord for real-time discussions, support, and community events.
                </p>
                <a href="#" className="text-[#D4A574] hover:text-[#E0B878] font-medium">
                  Join Discord →
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Code className="h-5 w-5 mr-2 text-[#D889A5]" />
                  GitHub
                </h3>
                <p className="text-gray-600 mb-3">
                  Contribute to our open-source codebase and help build the platform.
                </p>
                <a href="#" className="text-[#D889A5] hover:text-[#E0B8A5] font-medium">
                  View Repository →
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <Twitter className="h-5 w-5 mr-2 text-[#B8A5D9]" />
                  Twitter
                </h3>
                <p className="text-gray-600 mb-3">
                  Follow us for the latest updates, announcements, and community highlights.
                </p>
                <a href="#" className="text-[#B8A5D9] hover:text-[#C8B5E9] font-medium">
                  Follow @fansite →
                </a>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-[#8FB1E0]" />
                  Forum
                </h3>
                <p className="text-gray-600 mb-3">
                  Participate in governance discussions and feature proposals.
                </p>
                <a href="#" className="text-[#8FB1E0] hover:text-[#9FC1F0] font-medium">
                  Join Forum →
                </a>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Community Guidelines</h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Our Values</h3>
              <ul className="text-blue-800 space-y-2">
                <li>• <strong>Respect:</strong> Treat all community members with kindness and respect</li>
                <li>• <strong>Privacy:</strong> Honor our commitment to user privacy and data protection</li>
                <li>• <strong>Decentralization:</strong> Support the principles of decentralized technology</li>
                <li>• <strong>Innovation:</strong> Encourage creative solutions and new ideas</li>
                <li>• <strong>Transparency:</strong> Maintain open communication and honest discussions</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Get Involved</h2>
            <div className="space-y-6 mb-8">
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Bug Bounty Program</h3>
                <p className="text-gray-600 mb-3">
                  Help us improve platform security and earn $FAN tokens for finding vulnerabilities.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Rewards:</strong> 100-10,000 $FAN tokens based on severity
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Creator Ambassador Program</h3>
                <p className="text-gray-600 mb-3">
                  Become a fan.site ambassador and help onboard new creators to the platform.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Benefits:</strong> Exclusive features, $FAN rewards, direct team access
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Developer Grants</h3>
                <p className="text-gray-600 mb-3">
                  Build integrations, tools, or improvements for the fan.site ecosystem.
                </p>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Funding:</strong> Up to $50,000 worth of $FAN tokens for qualifying projects
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Community Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-green-200 bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-green-900 mb-2">Weekly Creator Showcases</h3>
                <p className="text-green-800 text-sm">
                  Every Friday, we highlight amazing creators and their content on the platform.
                </p>
              </div>
              <div className="border border-purple-200 bg-purple-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-2">Monthly Town Halls</h3>
                <p className="text-purple-800 text-sm">
                  Join our monthly community calls to discuss platform updates and future plans.
                </p>
              </div>
              <div className="border border-orange-200 bg-orange-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-orange-900 mb-2">Hackathons</h3>
                <p className="text-orange-800 text-sm">
                  Quarterly hackathons with prizes for the best fan.site integrations and tools.
                </p>
              </div>
              <div className="border border-blue-200 bg-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Educational Workshops</h3>
                <p className="text-blue-800 text-sm">
                  Learn about Web3, privacy, and content monetization in our regular workshops.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>fan.site Documentation</title>
        <meta name="description" content="Comprehensive documentation for fan.site - the decentralized creator monetization platform" />
      </Helmet>
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Home
              </Link>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-[#D4A574] mr-2" />
              <h1 className="text-xl font-semibold text-gray-900">fan.site Documentation</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Documentation</h2>
              <ul className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <li key={section.id}>
                      <button
                        onClick={() => setActiveSection(section.id)}
                        className={`flex items-center w-full text-left px-3 py-2 rounded-md transition-colors ${
                          activeSection === section.id
                            ? 'bg-[#D4A574]/10 text-[#D4A574] font-medium'
                            : 'text-gray-600 hover:text-[#D4A574] hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {section.title}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
              {renderContent()}
            </div>
          </main>
        </div>
        
        {/* Social buttons at bottom third */}
        <div className="flex justify-center mt-16 pt-8">
          <div className="flex gap-4">
            <a 
              href="https://instagram.com/fandotsite" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#D889A5] to-[#B8A5D9] text-white hover:scale-110 transition-transform duration-200 shadow-lg"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            
            <a 
              href="https://x.com/fandotsite" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#8FB1E0] to-[#B8A5D9] text-white hover:scale-110 transition-transform duration-200 shadow-lg"
              aria-label="Follow us on X (Twitter)"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Docs;
