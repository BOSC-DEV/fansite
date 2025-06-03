
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import TokenReleaseChart from "@/components/ui/token-release-chart";

const Docs = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with home link */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <Home className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="prose prose-lg max-w-none">
          
          {/* Main Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-8 pb-4 border-b border-gray-200">
            Book of Scams Documentation
          </h1>
          
          {/* Mission Statement */}
          <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">Mission Statement</h2>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            To provide a decentralised, permissionless & censorship resistant protocol for mature content creators and consumers that requires no KYC or bank, while offering private payments, data analytics, wank2earn & other cutting edge innovations through the full utilisation of rapidly advancing blockchain & AI technologies.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            To sustainably scale and actually have the resources to disrupt a giant market without a billion dollar bankroll. We utilise our decentralised physical infrastructure network (DeePin) of shared computing power to host, transcode and deliver content or data while rewarding miners.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            To create a user centric ecosystem that self moderates and removes the middle-man while tokenising ownership to empower & minimise the fees incurred by creators as well as consumers.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-4">
            To build a complete suite of data analytics toolkits that help creators find the biggest spenders, users find their ideal creators and businesses increase ROI by choosing the right partners.
          </p>
          
          <p className="text-gray-700 leading-relaxed mb-6">
            To solve the rise of illicit online content and protecting children, victims of crime or the generally vulnerable via a more efficient decentralised moderation system to compete with the failing incumbent (https://www.bbc.com/news/uk-63249018)
          </p>
          
          {/* Stats Section */}
          <h3 className="text-xl font-semibold text-red-700 mb-3">Some stats that hit home</h3>
          
          <ul className="list-disc pl-6 mb-8 space-y-3 text-gray-700">
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

          {/* Tokenomics */}
          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Tokenomics</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Token Distribution</h3>
          
          <table className="w-full border-collapse border border-gray-300 mb-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-2 text-left">Allocation</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Percentage</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Tokens</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Community & Ecosystem</td>
                <td className="border border-gray-300 px-4 py-2">40%</td>
                <td className="border border-gray-300 px-4 py-2">400,000,000 UNI</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Team & Advisors</td>
                <td className="border border-gray-300 px-4 py-2">30%</td>
                <td className="border border-gray-300 px-4 py-2">300,000,000 UNI</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Investors</td>
                <td className="border border-gray-300 px-4 py-2">20%</td>
                <td className="border border-gray-300 px-4 py-2">200,000,000 UNI</td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">Treasury</td>
                <td className="border border-gray-300 px-4 py-2">10%</td>
                <td className="border border-gray-300 px-4 py-2">100,000,000 UNI</td>
              </tr>
            </tbody>
          </table>

          {/* Token Release Schedule */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">UNI 4 Year Release Schedule</h3>
          
          <p className="text-gray-700 mb-4">
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

          {/* Token Utility */}
          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">Token Utility</h3>
          
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Governance voting rights</li>
            <li>Platform fee discounts</li>
            <li>Access to premium features</li>
            <li>Staking rewards</li>
            <li>Creator support mechanism</li>
            <li>Liquidity mining incentives</li>
          </ul>

          {/* Token Economics */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Token Economics</h3>
          
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li><strong>Total Supply:</strong> 1,000,000,000 UNI</li>
            <li><strong>Initial Circulating Supply:</strong> 150,000,000 UNI</li>
            <li><strong>Emission Schedule:</strong> 4 years</li>
            <li><strong>Platform fees:</strong> 3% of transactions</li>
            <li><strong>Premium subscription revenue</strong></li>
            <li><strong>NFT marketplace fees</strong></li>
            <li><strong>Data analytics services</strong></li>
            <li><strong>Infrastructure services</strong></li>
          </ul>

          {/* Technology Stack */}
          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Technology Stack</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Blockchain Layer</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Ethereum L2 solution</li>
            <li>Smart contracts (Solidity)</li>
            <li>ERC-20 token standard</li>
            <li>ERC-721 for NFTs</li>
            <li>Decentralized governance</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Infrastructure</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Decentralized storage (IPFS)</li>
            <li>Content delivery network</li>
            <li>Transcoding nodes</li>
            <li>Edge computing</li>
            <li>Distributed database</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Application Layer</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>React frontend</li>
            <li>GraphQL API</li>
            <li>AI content moderation</li>
            <li>Analytics engine</li>
            <li>Recommendation system</li>
          </ul>

          {/* Key Technical Features */}
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Technical Features</h3>
          
          <h4 className="text-lg font-medium text-gray-800 mb-2">🔒 Privacy-Preserving Payments</h4>
          <p className="text-gray-700 mb-4">Zero-knowledge proofs for private transactions while maintaining compliance</p>
          
          <h4 className="text-lg font-medium text-gray-800 mb-2">👥 Decentralized Moderation</h4>
          <p className="text-gray-700 mb-4">Community-driven content moderation with AI assistance</p>
          
          <h4 className="text-lg font-medium text-gray-800 mb-2">❤️ Engagement Rewards</h4>
          <p className="text-gray-700 mb-4">Tokenized incentives for platform participation and engagement</p>
          
          <h4 className="text-lg font-medium text-gray-800 mb-2">📊 Advanced Analytics</h4>
          <p className="text-gray-700 mb-6">Data-driven insights for creators to optimize content and earnings</p>

          {/* Roadmap */}
          <h2 className="text-2xl font-semibold text-gray-900 mt-12 mb-4">Roadmap</h2>
          
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Q1 2023: Foundation</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Team formation and core development</li>
            <li>Whitepaper and technical documentation</li>
            <li>Smart contract architecture design</li>
            <li>Initial seed funding round</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Q2 2023: Development</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>MVP development</li>
            <li>Smart contract audits</li>
            <li>Infrastructure node software development</li>
            <li>Private alpha testing</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Q3 2023: Testing & Refinement</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Public beta launch</li>
            <li>Creator onboarding program</li>
            <li>Community building initiatives</li>
            <li>Strategic partnerships</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">Q4 2023: Launch & Growth</h3>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
            <li>Token Generation Event (TGE)</li>
            <li>Mainnet launch</li>
            <li>Liquidity mining program</li>
            <li>Marketing campaign</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">2024: Expansion</h3>
          <ul className="list-disc pl-6 mb-8 space-y-2 text-gray-700">
            <li>Advanced analytics platform</li>
            <li>Mobile application</li>
            <li>DAO governance implementation</li>
            <li>Global expansion and localization</li>
            <li>Integration with major wallets and services</li>
          </ul>

        </div>
      </div>
    </div>
  );
};

export default Docs;
