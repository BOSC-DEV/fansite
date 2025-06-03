
import React from 'react';
import { Link } from 'react-router-dom';
import { Home, FileText, BarChart3, Map, Settings, Users } from 'lucide-react';
import TokenReleaseChart from "@/components/ui/token-release-chart";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Docs = () => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-white">
        {!isMobile && <DocsSidebar />}
        
        <main className="flex-1 w-full min-w-0 overflow-hidden">
          {/* Header with home link and sidebar trigger */}
          <div className="border-b border-gray-200 bg-white sticky top-0 z-10 w-full h-[60px] md:h-[73px]">
            <div className="w-full px-3 md:px-4 py-3 md:py-4 flex items-center h-full">
              {!isMobile && <SidebarTrigger className="mr-4" />}
              <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Home className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="w-full px-3 md:px-6 lg:px-8 py-3 md:py-8 max-w-full overflow-hidden">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-sm md:prose-lg max-w-none break-words">
                
                {/* Main Title */}
                <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8 pb-2 md:pb-4 border-b border-gray-200 break-words">fan.site</h1>
                
                {/* Mission Statement */}
                <h2 id="mission-statement" className="text-lg md:text-2xl font-semibold text-gray-900 mt-4 md:mt-8 mb-2 md:mb-4 break-words">Mission Statement</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  To empower content creators and their fans through a decentralized platform that fosters direct engagement, fair monetization, and community governance. We aim to revolutionize the creator economy by providing innovative tools and transparent systems that prioritize the interests of both creators and their audiences.
                </p>
                
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

                {/* Team & Advisors */}
                <h2 id="team" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Team & Advisors</h2>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Core Team</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  Our leadership team brings together decades of experience in content platforms, blockchain technology, business development, and talent management. With proven track records from successful ventures and industry-leading companies, we have the expertise to execute our ambitious vision for fan.site.
                </p>

                <div className="grid grid-cols-1 gap-3 md:gap-8 mb-4 md:mb-8">
                  <div className="bg-gray-50 p-3 md:p-6 rounded-lg">
                    <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-3 md:gap-6">
                      <div className="flex-shrink-0">
                        <img src="/lovable-uploads/2d361a2e-492b-42f2-b860-9d609003de77.png" alt="Indi Jay Cammish" className="w-20 h-20 md:w-32 md:h-32 rounded-lg object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-lg break-words">Indi Jay Cammish - Co-Founder</h4>
                        <p className="text-gray-700 leading-relaxed text-xs md:text-base break-words hyphens-auto">
                          Co-founder of First Class alongside Mike and co-founder of DeHub. Indi brings a unique perspective as a renowned professional dancer who has performed for A-list celebrities and even royalty, while starring in Channel 4's "The Masked Dancer". Her entertainment industry experience and business acumen provide valuable insights into creator needs and audience engagement.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 md:p-6 rounded-lg">
                    <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-3 md:gap-6">
                      <div className="flex-shrink-0">
                        <img src="/lovable-uploads/1e74480a-7089-4d87-83d1-2261736a44db.png" alt="Mike Hales" className="w-20 h-20 md:w-32 md:h-32 rounded-lg object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-lg break-words">Mike Hales - Co-Founder</h4>
                        <p className="text-gray-700 leading-relaxed text-xs md:text-base break-words hyphens-auto">
                          Founder of First Class, the UK's largest TikTok partner agency with millions in turnover and close to 1,000 streamers signed exclusively. Under Mike's leadership, First Class has partnered with some of the largest social media accounts and top-earning content creators, demonstrating his deep understanding of the creator economy and talent management at scale.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 md:p-6 rounded-lg">
                    <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-3 md:gap-6">
                      <div className="flex-shrink-0">
                        <img src="/lovable-uploads/4f3983f4-6b1d-418f-8aa7-75903179a831.png" alt="Bailey Young" className="w-20 h-20 md:w-32 md:h-32 rounded-lg object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-lg break-words">Bailey Young - Business Development</h4>
                        <p className="text-gray-700 leading-relaxed text-xs md:text-base break-words hyphens-auto">
                          Highly experienced business professional with a strong commercial background and leadership roles at multi-million pound UK businesses. Bailey achieved a 7-figure exit at Flamengo Resourcing, demonstrating his ability to scale businesses and execute successful strategies in competitive markets.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 md:p-6 rounded-lg">
                    <div className="flex flex-col items-center text-center md:flex-row md:text-left gap-3 md:gap-6">
                      <div className="flex-shrink-0">
                        <img src="/lovable-uploads/0d533e72-e0d4-4a75-ace1-d8b0006d2ad0.png" alt="Malik Jan" className="w-20 h-20 md:w-32 md:h-32 rounded-lg object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm md:text-lg break-words">Malik Jan - Strategic Advisor</h4>
                        <p className="text-gray-700 leading-relaxed text-xs md:text-base break-words hyphens-auto">
                          Founder of DeHub, which achieved an ROI of 1000x and $10M in liquidity at peak performance. Previously served as the top billing agent at Blue Arrow, the UK's largest agency with 65 offices nationwide and 600 staff, and formerly at Randstad, the world's largest staffing agency. His expertise in scaling operations and strategic partnerships is invaluable to fan.site's growth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Expertise Summary</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  Our team's combined expertise spans the entire spectrum of the creator economy, from content creation and talent management to blockchain technology and business development. We are passionate about building a platform that empowers creators and fosters a more equitable ecosystem for all stakeholders.
                </p>

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
    </SidebarProvider>
  );
};

export default Docs;
