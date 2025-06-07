

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
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The creator economy is experiencing exponential growth, with a projected market size of over $104.2 billion in 2022. However, current platforms often exploit creators by taking a significant portion of their earnings and limiting their ability to connect with fans. Fan Site aims to disrupt this model by providing a decentralized alternative that empowers creators and fosters a more equitable ecosystem.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Industry Statistics</h3>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto">The creator economy includes over 50 million individuals worldwide.</li>
                  <li className="break-words hyphens-auto">Content creators earn an estimated $6,000 per month on average.</li>
                  <li className="break-words hyphens-auto">The market size of the creator economy is projected to reach $104.2 billion in 2022.</li>
                </ul>

                {/* Tokenomics */}
                <h2 id="tokenomics" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Tokenomics</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The Fan Site ecosystem is powered by a native utility token, $FAN, which serves as the primary medium of exchange within the platform. $FAN tokens are used for various purposes, including rewarding content creators, incentivizing community participation, and facilitating governance decisions.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Economics Summary</h3>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words">Total Supply: 10,000,000 $FAN</li>
                  <li className="break-words">Distribution:
                    <ul className="list-[circle] list-inside ml-4 mt-1 space-y-1">
                      <li className="break-words">17.5% - Treasury Reserve</li>
                      <li className="break-words">15% - Marketing & Partnerships</li>
                      <li className="break-words">15% - Ecosystem Rewards</li>
                      <li className="break-words">13% - Liquidity</li>
                      <li className="break-words">12% - Team & Recruitment</li>
                      <li className="break-words">10% - Staking Incentives</li>
                      <li className="break-words">7% - Private Round</li>
                      <li className="break-words">4% - Public Round</li>
                      <li className="break-words">3.5% - Strategic Round</li>
                      <li className="break-words">3% - Advisory</li>
                    </ul>
                  </li>
                </ul>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 break-words">Dilution Schedule</h3>
                
                <div className="w-full overflow-hidden mb-4 md:mb-6">
                  <TokenReleaseChart />
                </div>

                {/* Distribution Table */}
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-3 md:mb-4 break-words">Distribution Details</h3>
                
                <div className="w-full overflow-x-auto mb-6 md:mb-8">
                  <table className="min-w-full border border-gray-300 text-xs md:text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-2 md:px-4 py-2 text-left font-semibold text-gray-900">Allocation</th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2 text-left font-semibold text-gray-900">% of Allocation</th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2 text-left font-semibold text-gray-900">Number of Tokens</th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2 text-left font-semibold text-gray-900">Dilution</th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2 text-left font-semibold text-gray-900">TGE Release %</th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2 text-left font-semibold text-gray-900">TGE Supply</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white">
                      <tr>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">Treasury Reserve</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">17.50%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">1,750,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">3 month cliff, daily linear 48 months</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">Advisory</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">3.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">300,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">6 month cliff, daily linear 24 months</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">Team & Recruitment</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">12.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">1,200,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">6 month cliff, daily linear 24 months</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">Marketing & Partnerships</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">15.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">1,500,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">1 month cliff, daily linear for 48 months</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">Staking Incentives</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">10.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">1,000,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">1 month cliff, daily linear for 48 months</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">Ecosystem Rewards</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">15.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">1,500,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">3 month cliff, daily linear for 48 months</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">0</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">Liquidity</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">13.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">1,300,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">50% at TGE, daily linear for 2 months</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">50.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">650,000</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">Private Round</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">7.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">700,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">20% at TGE, daily linear for 6 months</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">20.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">140,000</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">Strategic Round</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">3.50%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">350,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">25% TGE, daily linear for 4 months</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">25.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">87,500</td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">Public Round</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">4.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">400,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">25% TGE, daily linear for 4 months</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">25.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-700">100,000</td>
                      </tr>
                      <tr className="bg-gray-100 font-semibold">
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-900">Total</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-900">100.00%</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-900">10,000,000</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-900">-</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-900">-</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2 text-gray-900">977,500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Utility */}
                <h2 id="utility" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Utility</h2>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Why do these wankers actually need a token?</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  Every user owned and decentralised app requires a token for true network ownership & governance. 
                  You can't rely on the native chain token as each protocol has its own incentives, user base and 
                  direction. Every digital business and arguably brick & mortar ones alike will need a token one day, to 
                  reward, engage or monetise their consumer base as we hurtle into the new digital frontier.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Utility of $FAN includes but is not limited to;</h3>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto">In app currency for tipping or purchasing content, usernames, profiles & products.</li>
                  <li className="break-words hyphens-auto">Unlock enhanced app features, verification badges & climb up leaderboards.</li>
                  <li className="break-words hyphens-auto">Vote in fair FIPs, Fan Improvement Proposals, to enhance the Fan network.</li>
                  <li className="break-words hyphens-auto">Rewards from uploads and other unique campaigns.</li>
                  <li className="break-words hyphens-auto">Access instant, direct and 24/7 customer support.</li>
                  <li className="break-words hyphens-auto">Access exclusive content & premium features.</li>
                  <li className="break-words hyphens-auto">Moderate content and earn from bounties.</li>
                  <li className="break-words hyphens-auto">Free airdrops & mints of the Fan Network.</li>
                  <li className="break-words hyphens-auto">Access to premium platform features & beyond.</li>
                  <li className="break-words hyphens-auto">Revenue share for stakeholders.</li>
                </ul>

                {/* Ranking Badges */}
                <h2 id="ranking-badges" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Ranking Badges</h2>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">How to yank it all the way to the top</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  You will also notice a badge system on our app, this is the next generation of permissionless verifications that are much harder to exploit for scammers while being easier to avoid for victims. The badge system also doubles as a loyalty system where higher ranks unlock lower fees, enhanced app features, early bird access and more revenue share.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  They also offer endless benefit potential to verified users, as everyone starts as a little badge holder and the more $FAN they hold, the higher they rank, thus the more enhanced features they gain.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  Earn or buy $FAN directly in app to use or hoard. The more you have, the higher your ranking badge. The higher your badge, the better features and enhancents you unlock such as trending superpowers to get on the timeline or revenue share.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Badge Requirements</h3>
                
                <ul className="list-decimal list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words">Badge TBC - 50,000 $FAN</li>
                  <li className="break-words">Badge TBC - 25,000 $FAN</li>
                  <li className="break-words">Badge TBC - 10,000 $FAN</li>
                  <li className="break-words">Badge TBC - 4,000 $FAN</li>
                  <li className="break-words">Badge TBC - 3,000 $FAN</li>
                  <li className="break-words">Badge TBC - 2,000 $FAN</li>
                  <li className="break-words">Badge TBC - 1,000 $FAN</li>
                  <li className="break-words">Badge TBC - 400 $FAN</li>
                  <li className="break-words">Badge TBC - 200 $FAN</li>
                  <li className="break-words">Badge TBC - 100 $FAN</li>
                  <li className="break-words">Badge TBC - 50 $FAN</li>
                  <li className="break-words">Badge TBC - 10 $FAN</li>
                  <li className="break-words">Badge TBC - 1 $FAN</li>
                </ul>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  Badges are interchangeable once unlocked and are always owned by users. Holding requirements per ranking change depending on weekly average price however once you unlock a badge, it's yours forever to use at your own will.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  As the network grows, it will naturally become harder to unlock top medals, so collect them all before the world snaps them up!
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  You'll also notice the leaderboards on the home page that track:
                </p>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words">$FAN Holdings</li>
                  <li className="break-words">Followers</li>
                  <li className="break-words">Earnings</li>
                  <li className="break-words">Views</li>
                  <li className="break-words">Likes</li>
                  <li className="break-words">Tips</li>
                </ul>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  These can be filtered to track daily, weekly, monthly and yearly so you never miss a beat!
                </p>

                {/* DePIN */}
                <h2 id="depin" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">🍆 DePIN</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The only way we can sustainably scale to disrupt this gigantic industry is via a network of shared computing power to host, transcode & deliver content. Mine globally from as little as a mobile phone.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Abstract</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  This whitepaper introduces a Decentralised Physical Infrastructure Network (DePIN) designed to scale and sustain Blocjerk. The system leverages shared computing power from a network of miners who contribute resources for data hosting, transcoding, and delivery. Miners are rewarded directly from application revenue and token transaction fees, ensuring a sustainable, inflation-free model. This paper outlines the technical framework, economic incentives, and implementation strategies for deploying this DePIN, enabling contributions from as little as a mobile device.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">System Architecture</h3>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Challenges in Streaming and Gaming Platforms</h4>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  Centralised infrastructure for streaming and gaming platforms faces challenges such as high operational costs, scalability limits, and susceptibility to censorship or outages. These challenges hinder the ability of platforms like Blocjerk to achieve its purpose of being a decentralised, permissionless and user owned protocol that lives forever on-chain while maintaining cost efficiency.
                </p>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Solution: Shared Computing DePIN</h4>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  By decentralising the infrastructure, Blocjerk can tap into a distributed network of computing power to address these challenges. A DePIN allows users to share their computing resources, ensuring:
                </p>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Cost Efficiency</strong>: Lower hosting and delivery costs by using shared resources.</li>
                  <li className="break-words hyphens-auto"><strong>Scalability</strong>: Dynamically grow the network as demand increases.</li>
                  <li className="break-words hyphens-auto"><strong>Sustainability</strong>: Reward contributors directly from app revenues without token inflation.</li>
                </ul>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Core Components</h4>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Contributors (Miners)</strong>: Individuals providing computing resources via devices such as mobile phones, PCs, or dedicated servers.</li>
                  <li className="break-words hyphens-auto"><strong>DePIN Coordinator</strong>: A data encryption, decryption and smart contract system managing miner rewards, resource allocation, and task distribution.</li>
                  <li className="break-words hyphens-auto"><strong>Blocjerk Application</strong>: The streaming and gaming app interfacing with the DePIN to request and deliver data.</li>
                  <li className="break-words hyphens-auto"><strong>Clients (End Users)</strong>: Users consuming content via Blocjerk.</li>
                </ul>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Workflow</h4>
                
                <ol className="list-decimal list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Resource Sharing</strong>: Contributors register and allocate resources.</li>
                  <li className="break-words hyphens-auto"><strong>Task Assignment</strong>: The DePIN Coordinator assigns tasks such as hosting, transcoding, or delivery based on contributor capacity.</li>
                  <li className="break-words hyphens-auto"><strong>Revenue Sharing</strong>: Miners are compensated from a revenue pool funded by in-app revenue and token transaction fees.</li>
                  <li className="break-words hyphens-auto"><strong>Verification</strong>: Proof-of-computation mechanisms validate miners' contributions.</li>
                </ol>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Incentive Model</h3>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Revenue Pool</h4>
                
                <p className="text-gray-700 leading-relaxed mb-2 text-sm md:text-base break-words hyphens-auto">
                  The reward pool is composed of:
                </p>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>In-App Revenue</strong>: A percentage of subscription fees, ad revenue, and in-app purchases.</li>
                  <li className="break-words hyphens-auto"><strong>Token Transaction Fees</strong>: A share of transaction fees from the $FAN token.</li>
                </ul>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Distribution Mechanism</h4>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto">Rewards are distributed based on the volume and quality of contributions.</li>
                  <li className="break-words hyphens-auto">Miners earn proportionally higher rewards for tasks requiring more resources or bandwidth.</li>
                </ul>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Participation Requirements</h3>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Minimum Hardware Requirements</h4>
                
                <div className="overflow-x-auto mb-4 md:mb-6">
                  <table className="min-w-full border border-gray-300 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border border-gray-300 px-2 md:px-4 py-2 text-left font-semibold">Device Type</th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2 text-left font-semibold">Minimum Specs</th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2 text-left font-semibold">Supported Tasks</th>
                        <th className="border border-gray-300 px-2 md:px-4 py-2 text-left font-semibold">Staking Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">Mobile Phones</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">Quad-core CPU, 4GB RAM</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">Hosting</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">420 $FAN</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">PCs/Laptops</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">4-core CPU, 8GB RAM, GPU</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">Transcoding, Hosting, Delivery</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">6900 $FAN</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">Dedicated Servers</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">8-core CPU, 16GB RAM, SSD</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">High-volume Hosting, Delivery</td>
                        <td className="border border-gray-300 px-2 md:px-4 py-2">18,000 $FAN</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Software Setup</h4>
                
                <p className="text-gray-700 leading-relaxed mb-2 text-sm md:text-base break-words hyphens-auto">
                  Miners install a lightweight client application that:
                </p>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto">Connects to the DePIN network.</li>
                  <li className="break-words hyphens-auto">Reports available resources.</li>
                  <li className="break-words hyphens-auto">Executes assigned tasks.</li>
                </ul>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Full System Code Implementation</h3>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Miner Client Code</h4>
                
                <div className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto mb-4 md:mb-6">
                  <pre className="text-xs md:text-sm"><code>{`import requests
import time
import hashlib

API_BASE = "https://depin-coordinator.blocjerk.com"

class MinerClient:
    def __init__(self, device_id, cpu_cores, ram_gb, bandwidth_mbps):
        self.device_id = device_id
        self.cpu_cores = cpu_cores
        self.ram_gb = ram_gb
        self.bandwidth_mbps = bandwidth_mbps
        self.session_token = None

    def register_device(self):
        payload = {
            "device_id": self.device_id,
            "cpu_cores": self.cpu_cores,
            "ram_gb": self.ram_gb,
            "bandwidth_mbps": self.bandwidth_mbps
        }
        response = requests.post(f"{API_BASE}/register", json=payload)
        if response.status_code == 200:
            self.session_token = response.json().get("session_token")
            print("Registered successfully.")
        else:
            print("Registration failed:", response.text)

    def fetch_task(self):
        headers = {"Authorization": f"Bearer {self.session_token}"}
        response = requests.get(f"{API_BASE}/tasks", headers=headers)
        if response.status_code == 200:
            return response.json()
        return None

    def submit_result(self, task_id, result):
        headers = {"Authorization": f"Bearer {self.session_token}"}
        payload = {"task_id": task_id, "result": result}
        response = requests.post(f"{API_BASE}/submit", json=payload, headers=headers)
        if response.status_code == 200:
            print("Result submitted successfully.")
        else:
            print("Failed to submit result:", response.text)

    def run(self):
        while True:
            task = self.fetch_task()
            if task:
                print(f"Received task: {task['type']}")
                task_result = self.execute_task(task)
                self.submit_result(task['task_id'], task_result)
            time.sleep(10)

    def execute_task(self, task):
        # Simulate task execution
        task_data = task.get("data")
        result_hash = hashlib.sha256(task_data.encode()).hexdigest()
        time.sleep(task.get("duration", 5))  # Simulate processing time
        return result_hash

if __name__ == "__main__":
    miner = MinerClient(device_id="unique_device_123", cpu_cores=4, ram_gb=8, bandwidth_mbps=20)
    miner.register_device()
    miner.run()`}</code></pre>
                </div>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">DePIN Coordinator (Server-Side Logic)</h4>
                
                <div className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto mb-4 md:mb-6">
                  <pre className="text-xs md:text-sm"><code>{`from flask import Flask, request, jsonify
import uuid

app = Flask(__name__)

# Mock databases
devices = {}
tasks = []
completed_tasks = {}

@app.route('/register', methods=['POST'])
def register_device():
    data = request.json
    device_id = data.get('device_id')
    if not device_id or device_id in devices:
        return jsonify({"error": "Invalid or duplicate device ID."}), 400

    devices[device_id] = {
        "cpu_cores": data.get("cpu_cores"),
        "ram_gb": data.get("ram_gb"),
        "bandwidth_mbps": data.get("bandwidth_mbps"),
        "session_token": str(uuid.uuid4())
    }
    return jsonify({"session_token": devices[device_id]["session_token"]}), 200

@app.route('/tasks', methods=['GET'])
def get_task():
    session_token = request.headers.get("Authorization").split(" ")[1]
    device = next((d for d in devices.values() if d["session_token"] == session_token), None)
    if not device:
        return jsonify({"error": "Unauthorized"}), 403

    # Generate a mock task
    task = {
        "task_id": str(uuid.uuid4()),
        "type": "hash_computation",
        "data": "sample_data",
        "duration": 5
    }
    tasks.append(task)
    return jsonify(task), 200

@app.route('/submit', methods=['POST'])
def submit_task():
    data = request.json
    task_id = data.get("task_id")
    result = data.get("result")
    if not task_id or not result:
        return jsonify({"error": "Invalid submission."}), 400

    completed_tasks[task_id] = result
    return jsonify({"message": "Task completed successfully."}), 200

if __name__ == '__main__':
    app.run(debug=True)`}</code></pre>
                </div>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Scalability and Security</h3>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Dynamic Task Allocation</h4>
                
                <p className="text-gray-700 leading-relaxed mb-2 text-sm md:text-base break-words hyphens-auto">
                  Tasks are distributed based on:
                </p>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto">Current demand.</li>
                  <li className="break-words hyphens-auto">Contributor capacity.</li>
                  <li className="break-words hyphens-auto">Proximity to end users.</li>
                </ul>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Proof-of-Computation</h4>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  A lightweight proof-of-computation mechanism ensures tasks are completed reliably. Rewards are only issued upon verification.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Reward Calculator</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The DePIN includes a reward calculator that estimates miners' earnings based on their contributions.
                </p>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Reward Formula</h4>
                
                <p className="text-gray-700 leading-relaxed mb-2 text-sm md:text-base break-words hyphens-auto">
                  The rewards are calculated using the following formula:
                </p>
                
                <div className="bg-gray-100 p-3 md:p-4 rounded-lg mb-4 md:mb-6">
                  <code className="text-sm md:text-base">Reward = (Task Weight x Resource Score x Revenue Pool Share)</code>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-2 text-sm md:text-base break-words hyphens-auto">
                  Where:
                </p>
                
                <ul className="list-disc list-inside text-gray-700 mb-3 md:mb-6 text-sm md:text-base space-y-1">
                  <li className="break-words hyphens-auto"><strong>Task Weight</strong>: A predefined multiplier based on the type of task (e.g., hosting = 1.5, transcoding = 2.0, data delivery = 1.0).</li>
                  <li className="break-words hyphens-auto"><strong>Resource Score</strong>: A score calculated from the miner's resources, such as CPU cores, bandwidth, and RAM.</li>
                  <li className="break-words hyphens-auto"><strong>Revenue Pool Share</strong>: The miner's proportional share of the revenue pool.</li>
                </ul>
                
                <h4 className="text-sm md:text-lg font-semibold text-gray-800 mb-2 break-words">Example Code for Reward Calculation</h4>
                
                <div className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto mb-4 md:mb-6">
                  <pre className="text-xs md:text-sm"><code>{`class RewardCalculator:
    def __init__(self, task_weight, cpu_cores, bandwidth_mbps, ram_gb, revenue_pool):
        self.task_weight = task_weight
        self.cpu_cores = cpu_cores
        self.bandwidth_mbps = bandwidth_mbps
        self.ram_gb = ram_gb
        self.revenue_pool = revenue_pool

    def calculate_resource_score(self):
        return (self.cpu_cores * 0.4) + (self.bandwidth_mbps * 0.3) + (self.ram_gb * 0.3)

    def calculate_reward(self):
        resource_score = self.calculate_resource_score()
        return self.task_weight * resource_score * self.revenue_pool

# Example usage
if __name__ == "__main__":
    calculator = RewardCalculator(task_weight=1.5, cpu_cores=4, bandwidth_mbps=20, ram_gb=8, revenue_pool=10000)
    reward = calculator.calculate_reward()
    print(f"Estimated Reward: {reward:.2f} Fan Tokens")`}</code></pre>
                </div>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  This reward calculator can be integrated into the miner client for real-time reward estimation.
                </p>
                
                <h3 className="text-base md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 break-words">Conclusion</h3>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  The proposed DePIN enables truly decentralised, censorship resistant, limitlessly scalable, and cost-efficient infrastructure for Blocjerk. By leveraging shared computing power and rewarding miners directly from revenue, the system avoids inflation and ensures long-term sustainability. This model empowers anyone with spare computing resources, from mobile phones to servers, to participate in and benefit from Blocjerk's growth. In order to disrupt this behemoth of an industry, one requires billionaire backing or true innovation, just like this DePIN.
                </p>
                
                <p className="text-gray-700 leading-relaxed mb-6 md:mb-8 text-sm md:text-base break-words hyphens-auto font-italic">
                  *The full code will be open sourced upon completion.
                </p>

                {/* Technology Stack */}
                <h2 id="technology-stack" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Technology Stack</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  Fan Site is built on a robust and scalable technology stack that leverages the power of blockchain technology, decentralized storage solutions, and cutting-edge development frameworks. Our platform is designed to be secure, transparent, and user-friendly, ensuring a seamless experience for both creators and fans.
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
                  Fan Site is committed to building a community-driven platform where users have a voice in shaping the future of the ecosystem. Our governance model is designed to be transparent, inclusive, and democratic, ensuring that all stakeholders have the opportunity to participate in decision-making processes.
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
                  As with any innovative project, Fan Site faces certain risks and challenges. These include market adoption, regulatory uncertainty, and technological hurdles. We are committed to mitigating these risks through careful planning, proactive communication, and continuous innovation.
                </p>

                {/* Legal & Compliance */}
                <h2 id="legal-compliance" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Legal & Compliance</h2>
                
                <p className="text-gray-700 leading-relaxed mb-3 md:mb-6 text-sm md:text-base break-words hyphens-auto">
                  Fan Site is committed to operating in full compliance with all applicable laws and regulations. We are working closely with legal experts to ensure that our platform meets the highest standards of transparency, security, and accountability.
                </p>

                {/* Conclusion */}
                <h2 id="conclusion" className="text-lg md:text-2xl font-semibold text-gray-900 mt-6 md:mt-12 mb-2 md:mb-4 break-words">Conclusion</h2>
                
                <p className="text-gray-700 leading-relaxed mb-6 md:mb-8 text-sm md:text-base break-words hyphens-auto">
                  Fan Site represents a bold vision for the future of the creator economy. By leveraging blockchain technology and community-driven governance, we are building a platform that empowers content creators, fosters direct engagement with fans, and promotes a more equitable ecosystem for all stakeholders. We invite you to join us on this exciting journey as we revolutionize the way content is created, shared, and monetized.
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
