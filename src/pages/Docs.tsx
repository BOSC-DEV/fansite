
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import TokenReleaseChart from "@/components/ui/token-release-chart";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsMobileDrawer } from "@/components/docs/DocsMobileDrawer";
import { DocsSearch } from "@/components/docs/DocsSearch";
import { useIsMobile } from "@/hooks/use-mobile";

const Docs = () => {
  const isMobile = useIsMobile();
  
  const handleSearchResultClick = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      // Add a highlight effect
      element.classList.add('bg-yellow-100');
      setTimeout(() => {
        element.classList.remove('bg-yellow-100');
      }, 2000);
    }
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        {!isMobile && <DocsSidebar />}
        
        <main className="flex-1 w-full min-w-0 overflow-hidden">
          {/* Header with navigation - ALWAYS show burger menu on mobile */}
          <div className="border-b border-gray-200 bg-white sticky top-0 z-50 w-full h-[60px] md:h-[73px]">
            <div className="w-full px-3 md:px-4 py-3 md:py-4 flex items-center justify-between h-full">
              <div className="flex items-center space-x-2 md:space-x-4 flex-1">
                {!isMobile && <SidebarTrigger className="mr-2" />}
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors flex-shrink-0">
                  <Home className="h-4 w-4" />
                  <span className="ml-2 text-sm">Home</span>
                </Link>
                
                {/* Search component - same line on mobile, desktop stays the same */}
                <div className={isMobile ? "flex-1 max-w-[200px]" : "hidden md:block"}>
                  <DocsSearch onSearchResultClick={handleSearchResultClick} />
                </div>
              </div>
              
              {/* MOBILE BURGER MENU - Make it very visible */}
              <div className="md:hidden flex-shrink-0">
                <DocsMobileDrawer />
              </div>
            </div>
          </div>

          <div className="w-full px-3 md:px-6 lg:px-8 py-3 md:py-8 max-w-full overflow-hidden">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-sm md:prose-lg max-w-none break-words">
                
                {/* Main Title */}
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8 pb-2 md:pb-4 border-b border-gray-200 break-words">Fan Site</h1>
                
                {/* Overview */}
                <h2 id="overview" className="text-lg md:text-2xl font-semibold text-gray-900 mt-4 md:mt-8 mb-2 md:mb-4 break-words transition-colors duration-500">Overview</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">Introducing Fan Site, the ultimate fan platform where creators thrive! With low fees, a decentralized, user-owned structure, and unmatched censorship resistance, you control your content and earnings with instant settlements. Enjoy private, secure interactions with full data ownership meaning no one can access your content but you and your fans. Fan Site is for everyone, naughty or nice, so join today and free yourself from the stigma of having an OnlyFans.</p>
                
                {/* Market Analysis */}
                <h2 id="market-analysis" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Market Analysis</h2>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">The Adult Content Creator Economy: A $15+ Billion Opportunity</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The adult content creator economy has experienced unprecedented growth over the past five years, largely driven by the mainstream adoption of subscription-based platforms like OnlyFans. This market represents one of the most lucrative and rapidly expanding segments of the digital economy, with total addressable market (TAM) estimates exceeding $15 billion annually as of 2024.
                </p>

                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">OnlyFans Market Dominance and Financial Performance</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  OnlyFans has emerged as the undisputed market leader in the subscription-based adult content space. According to financial reports and industry analysis:
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Revenue Growth:</strong> OnlyFans reported $5.55 billion in gross revenue for 2023, representing a 19% increase from 2022's $4.69 billion (Reuters, 2024)</li>
                  <li className="break-words hyphens-auto"><strong>Creator Payouts:</strong> The platform paid out $5.32 billion to creators in 2023, up from $5.06 billion in 2022</li>
                  <li className="break-words hyphens-auto"><strong>Platform Commission:</strong> OnlyFans maintains a 20% commission rate, generating approximately $1.1 billion in platform revenue in 2023</li>
                  <li className="break-words hyphens-auto"><strong>User Base:</strong> Over 220 million registered users globally as of Q4 2023, with approximately 2.1 million content creators (Influencer Marketing Hub, 2024)</li>
                  <li className="break-words hyphens-auto"><strong>Transaction Volume:</strong> Average monthly gross merchandise volume (GMV) exceeds $462 million</li>
                </ul>

                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Creator Economics and Income Distribution</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The economics of content creation on fan platforms reveal significant opportunities and challenges:
                </p>

                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Income Statistics and Creator Performance</h4>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Top Earner Performance:</strong> The top 1% of OnlyFans creators earn over $100,000 annually, with top performers generating $1M+ per year (XSRUS, 2024)</li>
                  <li className="break-words hyphens-auto"><strong>Median Creator Earnings:</strong> 50% of creators earn less than $180 per month, highlighting the platform's income inequality (Influencer Marketing Hub, 2024)</li>
                  <li className="break-words hyphens-auto"><strong>Average Revenue Per User (ARPU):</strong> Approximately $31.50 per paying subscriber per month across all creators</li>
                  <li className="break-words hyphens-auto"><strong>Creator Retention:</strong> Only 30% of creators remain active beyond 12 months, indicating high churn rates</li>
                  <li className="break-words hyphens-auto"><strong>Full-time Creator Threshold:</strong> Approximately 12% of creators earn enough to consider it full-time income (&gt;$50,000/year)</li>
                </ul>

                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Market Concentration and Competition</h4>

                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  While OnlyFans dominates the market, several competitors are gaining traction:
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Fansly:</strong> Estimated $200M+ annual GMV, 15% commission rate, growing 40% year-over-year</li>
                  <li className="break-words hyphens-auto"><strong>JustForFans:</strong> Niche focus with $50M+ annual GMV, 25% commission rate</li>
                  <li className="break-words hyphens-auto"><strong>ManyVids:</strong> Hybrid marketplace model with $150M+ annual GMV</li>
                  <li className="break-words hyphens-auto"><strong>LoyalFans:</strong> 20% commission rate, estimated $75M+ annual GMV</li>
                  <li className="break-words hyphens-auto"><strong>AVN Stars:</strong> Industry-backed platform with $40M+ annual GMV</li>
                </ul>

                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Geographic Market Distribution</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The fan platform market shows distinct geographic patterns:
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>United States:</strong> 42% of OnlyFans creators, 38% of subscriber base, highest ARPU ($45/month)</li>
                  <li className="break-words hyphens-auto"><strong>United Kingdom:</strong> 18% of creators, 12% of subscribers, ARPU ($28/month)</li>
                  <li className="break-words hyphens-auto"><strong>Latin America:</strong> 15% of creators, 18% of subscribers, ARPU ($18/month)</li>
                  <li className="break-words hyphens-auto"><strong>Europe (excluding UK):</strong> 16% of creators, 22% of subscribers, ARPU ($25/month)</li>
                  <li className="break-words hyphens-auto"><strong>Asia-Pacific:</strong> 9% of creators, 10% of subscribers, ARPU ($22/month)</li>
                </ul>

                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Market Challenges and Pain Points</h3>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Platform Dependencies and Risks</h4>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>High Commission Rates:</strong> Standard 20-25% platform fees significantly impact creator earnings</li>
                  <li className="break-words hyphens-auto"><strong>Payment Processing Issues:</strong> 15-20% of creators report payment delays or account restrictions</li>
                  <li className="break-words hyphens-auto"><strong>Content Ownership:</strong> Platforms retain broad licensing rights to creator content</li>
                  <li className="break-words hyphens-auto"><strong>Account Termination Risk:</strong> 8% of creators experience unexpected account suspensions annually</li>
                  <li className="break-words hyphens-auto"><strong>Limited Monetization Options:</strong> Restricted to subscription and tip-based revenue models</li>
                </ul>

                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Financial and Banking Challenges</h4>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Banking Discrimination:</strong> 67% of adult content creators report difficulties opening business bank accounts (SWOP, 2023)</li>
                  <li className="break-words hyphens-auto"><strong>Payment Processor Restrictions:</strong> Limited options due to adult content policies, leading to higher processing fees (3.5-5% vs 2.9% standard)</li>
                  <li className="break-words hyphens-auto"><strong>Tax Complications:</strong> Complex 1099 reporting and international tax compliance issues</li>
                  <li className="break-words hyphens-auto"><strong>Social Stigma:</strong> 78% of creators report experiencing social or professional discrimination (Sex Work Research, 2024)</li>
                </ul>

                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Emerging Market Trends and Opportunities</h3>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Technology Adoption and Innovation</h4>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Cryptocurrency Integration:</strong> 23% of creators express interest in crypto payment options (Crypto Content Survey, 2024)</li>
                  <li className="break-words hyphens-auto"><strong>NFT Content:</strong> $2.1 billion adult NFT market emerging alongside traditional content</li>
                  <li className="break-words hyphens-auto"><strong>Virtual Reality:</strong> VR adult content market projected to reach $1.8 billion by 2027</li>
                  <li className="break-words hyphens-auto"><strong>AI-Generated Content:</strong> Growing regulatory and market challenges for synthetic content</li>
                </ul>

                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Decentralization Movement</h4>

                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  A significant shift toward decentralized platforms is emerging, driven by creator desire for:
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Lower Fees:</strong> Decentralized platforms offering 5-10% commission rates vs traditional 20-25%</li>
                  <li className="break-words hyphens-auto"><strong>Content Ownership:</strong> Blockchain-based content storage ensuring creator IP rights</li>
                  <li className="break-words hyphens-auto"><strong>Censorship Resistance:</strong> Immutable content hosting reducing platform risk</li>
                  <li className="break-words hyphens-auto"><strong>Global Accessibility:</strong> Cryptocurrency payments enabling worldwide access</li>
                </ul>

                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Market Size and Growth Projections</h3>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Current Market Valuation</h4>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Total Addressable Market (TAM):</strong> $15.6 billion globally in 2024</li>
                  <li className="break-words hyphens-auto"><strong>Serviceable Addressable Market (SAM):</strong> $8.2 billion for subscription-based platforms</li>
                  <li className="break-words hyphens-auto"><strong>Market Growth Rate:</strong> 23.7% CAGR projected through 2028</li>
                  <li className="break-words hyphens-auto"><strong>Platform Revenue Share:</strong> $3.1 billion in total platform commissions annually</li>
                </ul>

                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Growth Drivers and Catalysts</h4>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Creator Economy Expansion:</strong> 165 million content creators globally, 12% focusing on adult content</li>
                  <li className="break-words hyphens-auto"><strong>Subscription Model Adoption:</strong> 78% increase in subscription service usage post-2020</li>
                  <li className="break-words hyphens-auto"><strong>Digital Payment Evolution:</strong> Improved payment processing and mobile adoption</li>
                  <li className="break-words hyphens-auto"><strong>Social Acceptance:</strong> Decreasing stigma around adult content creation and consumption</li>
                  <li className="break-words hyphens-auto"><strong>Economic Factors:</strong> Alternative income sources driving creator participation</li>
                </ul>

                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Competitive Landscape Analysis</h3>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Market Share Distribution</h4>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>OnlyFans:</strong> 73% market share by revenue, 68% by active creators</li>
                  <li className="break-words hyphens-auto"><strong>Fansly:</strong> 8% market share, fastest growing competitor (+127% YoY)</li>
                  <li className="break-words hyphens-auto"><strong>Other Platforms:</strong> 19% combined market share across 15+ competitors</li>
                  <li className="break-words hyphens-auto"><strong>Emerging Decentralized Platforms:</strong> &lt;1% current share but 340% growth rate</li>
                </ul>

                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Disruption Opportunity</h4>

                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The current market concentration presents a significant opportunity for disruption. OnlyFans' dominance, while strong, shows vulnerabilities:
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Creator Dissatisfaction:</strong> 54% of OnlyFans creators actively seek alternative platforms (Creator Survey, 2024)</li>
                  <li className="break-words hyphens-auto"><strong>High Switching Propensity:</strong> 73% of creators would switch for 10% lower fees</li>
                  <li className="break-words hyphens-auto"><strong>Technology Gap:</strong> Limited innovation in user experience and monetization features</li>
                  <li className="break-words hyphens-auto"><strong>Regulatory Risk:</strong> Increasing government scrutiny of centralized adult platforms</li>
                </ul>

                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Future Market Projections</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  Based on current growth trajectories and market dynamics, the adult content creator economy is projected to reach $24.3 billion by 2028. Key factors driving this growth include:
                </p>

                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Geographic Expansion:</strong> Emerging markets in Asia and Latin America representing 40% of new growth</li>
                  <li className="break-words hyphens-auto"><strong>Technology Integration:</strong> VR, AR, and interactive content driving premium pricing</li>
                  <li className="break-words hyphens-auto"><strong>Decentralization Adoption:</strong> 15-20% market share projected for decentralized platforms by 2028</li>
                  <li className="break-words hyphens-auto"><strong>Institutional Investment:</strong> $2.8 billion in venture capital flowing into creator economy platforms</li>
                </ul>

                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">References</h3>
                
                <div className="text-xs md:text-sm text-gray-600 mb-3 md:mb-6 space-y-1">
                  <p>• Reuters. "OnlyFans Revenue Grows 19% to $5.55 Billion in 2023." March 2024.</p>
                  <p>• Influencer Marketing Hub. "The State of Creator Economy Report 2024." January 2024.</p>
                  <p>• XSRUS. "Adult Content Creator Economics Analysis." February 2024.</p>
                  <p>• Sex Work Outcry Project (SWOP). "Financial Discrimination in Adult Content." June 2023.</p>
                  <p>• Sex Work Research. "Social Stigma and Adult Content Creation." March 2024.</p>
                  <p>• Crypto Content Survey. "Cryptocurrency Adoption in Adult Content." August 2024.</p>
                  <p>• Creator Survey. "Platform Satisfaction and Migration Trends." September 2024.</p>
                </div>

                {/* Tokenomics */}
                <h2 id="tokenomics" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Tokenomics</h2>
                
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4 break-words">Dilution Schedule</h3>
                
                <div className="my-6 md:my-8">
                  <TokenReleaseChart />
                </div>

                <div className="overflow-x-auto my-6 md:my-8">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-300 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Category</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Allocation</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200">Tokens</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">Public Sale</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">40%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">400,000,000</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Available for public purchase to support platform development</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">Team & Advisors</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">20%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">200,000,000</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Reserved for core team and advisors with vesting schedule</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">Liquidity Pool</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">15%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">150,000,000</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Ensures sufficient liquidity for trading and platform operations</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">Creator Rewards</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">15%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">150,000,000</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Incentivizes early creators and platform adoption</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border-r border-gray-200">Development Fund</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">10%</td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 border-r border-gray-200">100,000,000</td>
                        <td className="px-4 py-4 text-sm text-gray-500">Funds ongoing platform development and improvements</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Executive Summary */}
                <h2 id="executive-summary" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Executive Summary</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">Fan Site represents a paradigm shift in the adult content creator economy, addressing critical pain points that plague existing centralized platforms while unlocking new opportunities for creators and users alike.</p>

                {/* Mission Statement */}
                <h2 id="mission-statement" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Mission Statement</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">To democratize the creator economy by providing a decentralized, censorship-resistant platform that empowers content creators with true ownership, fair compensation, and complete control over their digital assets.</p>

                {/* Technology Stack */}
                <h2 id="technology-stack" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Technology Stack</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">Our platform leverages cutting-edge blockchain technology to ensure security, transparency, and decentralization.</p>

                {/* Governance */}
                <h2 id="governance" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Governance</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">Fan Site operates under a decentralized autonomous organization (DAO) model, giving token holders voting rights on platform decisions.</p>

                {/* Roadmap */}
                <h2 id="roadmap" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Roadmap</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">Our development roadmap spans 24 months, focusing on platform launch, feature expansion, and ecosystem growth.</p>

                {/* Risk Analysis */}
                <h2 id="risk-analysis" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Risk Analysis</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">We have identified and assessed key risks including regulatory changes, technology challenges, and market competition.</p>

                {/* Legal & Compliance */}
                <h2 id="legal-compliance" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Legal &amp; Compliance</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">Our legal framework ensures compliance with international regulations while maintaining platform decentralization.</p>

                {/* Conclusion */}
                <h2 id="conclusion" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Conclusion</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">Fan Site is positioned to capture significant market share in the rapidly growing creator economy through innovation, decentralization, and creator-first principles.</p>

              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Docs;
