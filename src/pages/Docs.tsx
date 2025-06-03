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
        
        <main className="flex-1 w-full min-w-0">
          {/* Header with home link and sidebar trigger */}
          <div className="border-b border-gray-200 bg-white sticky top-0 z-10 w-full h-[73px]">
            <div className="w-full px-4 py-4 flex items-center h-full">
              {!isMobile && <SidebarTrigger className="mr-4" />}
              <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Home className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="w-full px-4 md:px-6 lg:px-8 py-4 md:py-8 max-w-4xl mx-auto">
            <div className="prose prose-sm md:prose-lg max-w-none">
              
              {/* Main Title */}
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-8 pb-2 md:pb-4 border-b border-gray-200">fan.site</h1>
              
              {/* Mission Statement */}
              <h2 id="mission-statement" className="text-xl md:text-2xl font-semibold text-gray-900 mt-6 md:mt-8 mb-3 md:mb-4">Mission Statement</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                To empower content creators and their fans through a decentralized platform that fosters direct engagement, fair monetization, and community governance. We aim to revolutionize the creator economy by providing innovative tools and transparent systems that prioritize the interests of both creators and their audiences.
              </p>
              
              {/* Executive Summary */}
              <h2 id="executive-summary" className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 md:mt-12 mb-3 md:mb-4">Executive Summary</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                fan.site is a decentralized platform designed to transform the relationship between content creators and their fans. By leveraging blockchain technology, fan.site offers a suite of tools that enable direct engagement, fair monetization, and community-driven governance. This platform addresses the key challenges faced by creators today, including unfair revenue splits, lack of control over content, and limited interaction with their audience.
              </p>

              {/* Market Analysis */}
              <h2 id="market-analysis" className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 md:mt-12 mb-3 md:mb-4">Market Analysis</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                The creator economy is experiencing exponential growth, with a projected market size of over $104.2 billion in 2022. However, current platforms often exploit creators by taking a significant portion of their earnings and limiting their ability to connect with fans. fan.site aims to disrupt this model by providing a decentralized alternative that empowers creators and fosters a more equitable ecosystem.
              </p>
              
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Industry Statistics</h3>
              
              <ul className="list-disc list-inside text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                <li>The creator economy includes over 50 million individuals worldwide.</li>
                <li>Content creators earn an estimated $6,000 per month on average.</li>
                <li>The market size of the creator economy is projected to reach $104.2 billion in 2022.</li>
              </ul>

              {/* Tokenomics */}
              <h2 id="tokenomics" className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 md:mt-12 mb-3 md:mb-4">Tokenomics</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                The fan.site ecosystem is powered by a native utility token, $FAN, which serves as the primary medium of exchange within the platform. $FAN tokens are used for various purposes, including rewarding content creators, incentivizing community participation, and facilitating governance decisions.
              </p>
              
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Economics Summary</h3>
              
              <ul className="list-disc list-inside text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                <li>Total Supply: 1,000,000,000 $FAN</li>
                <li>Distribution:
                  <ul className="list-decimal list-inside">
                    <li>50% - Creator Rewards</li>
                    <li>20% - Community Incentives</li>
                    <li>15% - Team & Advisors</li>
                    <li>10% - Ecosystem Development</li>
                    <li>5% - Marketing & Partnerships</li>
                  </ul>
                </li>
              </ul>
              
              <TokenReleaseChart />

              {/* Technology Stack */}
              <h2 id="technology-stack" className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 md:mt-12 mb-3 md:mb-4">Technology Stack</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                fan.site is built on a robust and scalable technology stack that leverages the power of blockchain technology, decentralized storage solutions, and cutting-edge development frameworks. Our platform is designed to be secure, transparent, and user-friendly, ensuring a seamless experience for both creators and fans.
              </p>
              
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Key Components</h3>
              
              <ul className="list-disc list-inside text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                <li>Blockchain: Ethereum (for smart contracts and token management)</li>
                <li>Storage: IPFS (for decentralized content storage)</li>
                <li>Development: React, Node.js, Web3.js</li>
              </ul>
              
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">AI and Machine Learning</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                We are integrating AI and machine learning technologies to enhance content discovery, personalize user experiences, and detect fraudulent activities. These technologies will help us create a more engaging and secure platform for our users.
              </p>

              {/* Governance */}
              <h2 id="governance" className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 md:mt-12 mb-3 md:mb-4">Governance Model</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                fan.site is committed to building a community-driven platform where users have a voice in shaping the future of the ecosystem. Our governance model is designed to be transparent, inclusive, and democratic, ensuring that all stakeholders have the opportunity to participate in decision-making processes.
              </p>
              
              <ul className="list-disc list-inside text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                <li>Token Holders: $FAN token holders can submit proposals and vote on key decisions.</li>
                <li>Council: A council of elected community members will oversee the implementation of governance decisions.</li>
                <li>Transparency: All governance processes and decisions will be publicly documented on the blockchain.</li>
              </ul>

              {/* Roadmap */}
              <h2 id="roadmap" className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 md:mt-12 mb-3 md:mb-4">Development Roadmap</h2>
              
              <ul className="list-disc list-inside text-gray-700 mb-4 md:mb-6 text-sm md:text-base">
                <li>Q1 2024: Platform Development and Testing</li>
                <li>Q2 2024: Beta Launch and Community Onboarding</li>
                <li>Q3 2024: Mainnet Launch and Token Distribution</li>
                <li>Q4 2024: Feature Expansion and Partnership Development</li>
              </ul>

              {/* Team & Advisors */}
              <h2 id="team" className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 md:mt-12 mb-3 md:mb-4">Team & Advisors</h2>
              
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Core Team</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                Our leadership team brings together decades of experience in content platforms, blockchain technology, business development, and talent management. With proven track records from successful ventures and industry-leading companies, we have the expertise to execute our ambitious vision for fan.site.
              </p>

              <div className="grid grid-cols-1 gap-4 md:gap-8 mb-6 md:mb-8">
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg flex flex-col gap-4 md:flex-row md:gap-6">
                  <div className="flex-shrink-0 self-center">
                    <img src="/lovable-uploads/2d361a2e-492b-42f2-b860-9d609003de77.png" alt="Indi Jay Cammish" className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover mx-auto" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2 md:mb-3 text-base md:text-lg text-center md:text-left">Indi Jay Cammish - Co-Founder</h4>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      Co-founder of First Class alongside Mike and co-founder of DeHub. Indi brings a unique perspective as a renowned professional dancer who has performed for A-list celebrities and even royalty, while starring in Channel 4's "The Masked Dancer". Her entertainment industry experience and business acumen provide valuable insights into creator needs and audience engagement.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 rounded-lg flex flex-col gap-4 md:flex-row md:gap-6">
                  <div className="flex-shrink-0 self-center">
                    <img src="/lovable-uploads/1e74480a-7089-4d87-83d1-2261736a44db.png" alt="Mike Hales" className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover mx-auto" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2 md:mb-3 text-base md:text-lg text-center md:text-left">Mike Hales - Co-Founder</h4>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      Founder of First Class, the UK's largest TikTok partner agency with millions in turnover and close to 1,000 streamers signed exclusively. Under Mike's leadership, First Class has partnered with some of the largest social media accounts and top-earning content creators, demonstrating his deep understanding of the creator economy and talent management at scale.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 rounded-lg flex flex-col gap-4 md:flex-row md:gap-6">
                  <div className="flex-shrink-0 self-center">
                    <img src="/lovable-uploads/4f3983f4-6b1d-418f-8aa7-75903179a831.png" alt="Bailey Young" className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover mx-auto" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2 md:mb-3 text-base md:text-lg text-center md:text-left">Bailey Young - Business Development</h4>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      Highly experienced business professional with a strong commercial background and leadership roles at multi-million pound UK businesses. Bailey achieved a 7-figure exit at Flamengo Resourcing, demonstrating his ability to scale businesses and execute successful strategies in competitive markets.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 md:p-6 rounded-lg flex flex-col gap-4 md:flex-row md:gap-6">
                  <div className="flex-shrink-0 self-center">
                    <img src="/lovable-uploads/0d533e72-e0d4-4a75-ace1-d8b0006d2ad0.png" alt="Malik Jan" className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover mx-auto" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 mb-2 md:mb-3 text-base md:text-lg text-center md:text-left">Malik Jan - Strategic Advisor</h4>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      Founder of DeHub, which achieved an ROI of 1000x and $10M in liquidity at peak performance. Previously served as the top billing agent at Blue Arrow, the UK's largest agency with 65 offices nationwide and 600 staff, and formerly at Randstad, the world's largest staffing agency. His expertise in scaling operations and strategic partnerships is invaluable to fan.site's growth.
                    </p>
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3">Expertise Summary</h3>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                Our team's combined expertise spans the entire spectrum of the creator economy, from content creation and talent management to blockchain technology and business development. We are passionate about building a platform that empowers creators and fosters a more equitable ecosystem for all stakeholders.
              </p>

              {/* Risk Analysis */}
              <h2 id="risk-analysis" className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 md:mt-12 mb-3 md:mb-4">Risk Analysis</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                As with any innovative project, fan.site faces certain risks and challenges. These include market adoption, regulatory uncertainty, and technological hurdles. We are committed to mitigating these risks through careful planning, proactive communication, and continuous innovation.
              </p>

              {/* Legal & Compliance */}
              <h2 id="legal-compliance" className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 md:mt-12 mb-3 md:mb-4">Legal & Compliance</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                fan.site is committed to operating in full compliance with all applicable laws and regulations. We are working closely with legal experts to ensure that our platform meets the highest standards of transparency, security, and accountability.
              </p>

              {/* Conclusion */}
              <h2 id="conclusion" className="text-xl md:text-2xl font-semibold text-gray-900 mt-8 md:mt-12 mb-3 md:mb-4">Conclusion</h2>
              
              <p className="text-gray-700 leading-relaxed mb-4 md:mb-6 text-sm md:text-base">
                fan.site represents a bold vision for the future of the creator economy. By leveraging blockchain technology and community-driven governance, we are building a platform that empowers content creators, fosters direct engagement with fans, and promotes a more equitable ecosystem for all stakeholders. We invite you to join us on this exciting journey as we revolutionize the way content is created, shared, and monetized.
              </p>

            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Docs;
