import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import TokenReleaseChart from "@/components/ui/token-release-chart";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsMobileDrawer } from "@/components/docs/DocsMobileDrawer";
import { useIsMobile } from "@/hooks/use-mobile";
const Docs = () => {
  const isMobile = useIsMobile();
  return <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        {!isMobile && <DocsSidebar />}
        
        <main className="flex-1 w-full min-w-0 overflow-hidden">
          {/* Header with navigation - ALWAYS show burger menu on mobile */}
          <div className="border-b border-gray-200 bg-white sticky top-0 z-50 w-full h-[60px] md:h-[73px]">
            <div className="w-full px-3 md:px-4 py-3 md:py-4 flex items-center justify-between h-full">
              <div className="flex items-center">
                {!isMobile && <SidebarTrigger className="mr-4" />}
                <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <Home className="h-4 w-4" />
                  <span className="ml-2 text-sm">Home</span>
                </Link>
              </div>
              
              {/* MOBILE BURGER MENU - Make it very visible */}
              <div className="md:hidden">
                <DocsMobileDrawer />
              </div>
            </div>
          </div>

          <div className="w-full px-3 md:px-6 lg:px-8 py-3 md:py-8 max-w-full overflow-hidden">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-sm md:prose-lg max-w-none break-words">
                
                {/* Main Title */}
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8 pb-2 md:pb-4 border-b border-gray-200 break-words">fan.site</h1>
                
                {/* Mission Statement */}
                <h2 id="mission-statement" className="text-lg md:text-2xl font-semibold text-gray-900 mt-4 md:mt-8 mb-2 md:mb-4 break-words">Mission Statement</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">Introducing fan.site, the ultimate fan platform where creators thrive! With low fees, a decentralized, user-owned structure, and unmatched censorship resistance, you control your content and earnings. Enjoy private, secure interactions with full data ownership—no one accesses your content but you. Join fan.site today and connect with fans on your terms!</p>
                
                {/* Executive Summary */}
                <h2 id="executive-summary" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Executive Summary</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  fan.site is a decentralized platform designed to transform the relationship between content creators and their fans. By leveraging blockchain technology, fan.site offers a suite of tools that enable direct engagement, fair monetization, and community-driven governance. This platform addresses the key challenges faced by creators today, including unfair revenue splits, lack of control over content, and limited interaction with their audience.
                </p>

                {/* Market Analysis */}
                <h2 id="market-analysis" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Market Analysis</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The creator economy is experiencing exponential growth, with a projected market size of over $104.2 billion in 2022. However, current platforms often exploit creators by taking a significant portion of their earnings and limiting their ability to connect with fans. fan.site aims to disrupt this model by providing a decentralized alternative that empowers creators and fosters a more equitable ecosystem.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Industry Statistics</h3>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1 break-words">
                  <li className="break-words hyphens-auto">The creator economy includes over 50 million individuals worldwide.</li>
                  <li className="break-words hyphens-auto">Content creators earn an estimated $6,000 per month on average.</li>
                  <li className="break-words hyphens-auto">The market size of the creator economy is projected to reach $104.2 billion in 2022.</li>
                </ul>

                {/* Tokenomics */}
                <h2 id="tokenomics" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Tokenomics</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The fan.site ecosystem is powered by a native utility token, $FAN, which serves as the primary medium of exchange within the platform. $FAN tokens are used for various purposes, including rewarding content creators, incentivizing community participation, and facilitating governance decisions.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Economics Summary</h3>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words">Total Supply: 1,000,000,000 $FAN</li>
                  <li className="break-words">Distribution:
                    <ul className="list-decimal list-inside ml-4 mt-1 space-y-1">
                      <li className="break-words">50% - Creator Rewards</li>
                      <li className="break-words">20% - Community Incentives</li>
                      <li className="break-words">15% - Team & Advisors</li>
                      <li className="break-words">10% - Ecosystem Development</li>
                      <li className="break-words">5% - Marketing & Partnerships</li>
                    </ul>
                  </li>
                </ul>
                
                <div className="w-full overflow-hidden mb-4 md:mb-6">
                  <TokenReleaseChart />
                </div>

                {/* Technology Stack */}
                <h2 id="technology-stack" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Technology Stack</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  fan.site is built on a robust and scalable technology stack that leverages the power of blockchain technology, decentralized storage solutions, and cutting-edge development frameworks. Our platform is designed to be secure, transparent, and user-friendly, ensuring a seamless experience for both creators and fans.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Key Components</h3>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto">Blockchain: Ethereum (for smart contracts and token management)</li>
                  <li className="break-words hyphens-auto">Storage: IPFS (for decentralized content storage)</li>
                  <li className="break-words hyphens-auto">Development: React, Node.js, Web3.js</li>
                </ul>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">AI and Machine Learning</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  We are integrating AI and machine learning technologies to enhance content discovery, personalize user experiences, and detect fraudulent activities. These technologies will help us create a more engaging and secure platform for our users.
                </p>

                {/* Governance */}
                <h2 id="governance" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Governance Model</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  fan.site is committed to building a community-driven platform where users have a voice in shaping the future of the ecosystem. Our governance model is designed to be transparent, inclusive, and democratic, ensuring that all stakeholders have the opportunity to participate in decision-making processes.
                </p>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto">Token Holders: $FAN token holders can submit proposals and vote on key decisions.</li>
                  <li className="break-words hyphens-auto">Council: A council of elected community members will oversee the implementation of governance decisions.</li>
                  <li className="break-words hyphens-auto">Transparency: All governance processes and decisions will be publicly documented on the blockchain.</li>
                </ul>

                {/* Roadmap */}
                <h2 id="roadmap" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Development Roadmap</h2>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words">Q1 2024: Platform Development and Testing</li>
                  <li className="break-words">Q2 2024: Beta Launch and Community Onboarding</li>
                  <li className="break-words">Q3 2024: Mainnet Launch and Token Distribution</li>
                  <li className="break-words">Q4 2024: Feature Expansion and Partnership Development</li>
                </ul>

                {/* Risk Analysis */}
                <h2 id="risk-analysis" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Risk Analysis</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  As with any innovative project, fan.site faces certain risks and challenges. These include market adoption, regulatory uncertainty, and technological hurdles. We are committed to mitigating these risks through careful planning, proactive communication, and continuous innovation.
                </p>

                {/* Legal & Compliance */}
                <h2 id="legal-compliance" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Legal & Compliance</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  fan.site is committed to operating in full compliance with all applicable laws and regulations. We are working closely with legal experts to ensure that our platform meets the highest standards of transparency, security, and accountability.
                </p>

                {/* Conclusion */}
                <h2 id="conclusion" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Conclusion</h2>
                
                <p className="text-gray-700 leading-relaxed mb-6 md:mb-8 text-sm md:text-base break-words hyphens-auto">
                  fan.site represents a bold vision for the future of the creator economy. By leveraging blockchain technology and community-driven governance, we are building a platform that empowers content creators, fosters direct engagement with fans, and promotes a more equitable ecosystem for all stakeholders. We invite you to join us on this exciting journey as we revolutionize the way content is created, shared, and monetized.
                </p>

              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>;
};
export default Docs;