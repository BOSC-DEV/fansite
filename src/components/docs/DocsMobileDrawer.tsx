
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu, FileText, BarChart3, Map, Target, Code, Shield, Gavel, Rocket } from "lucide-react";

const navigationItems = [
  {
    title: "Mission Statement",
    icon: FileText,
    href: "#mission-statement"
  },
  {
    title: "Executive Summary", 
    icon: Target,
    href: "#executive-summary"
  },
  {
    title: "Market Analysis",
    icon: BarChart3,
    href: "#market-analysis"
  },
  {
    title: "Tokenomics",
    icon: Target,
    href: "#tokenomics"
  },
  {
    title: "Technology Stack",
    icon: Code,
    href: "#technology-stack"
  },
  {
    title: "Governance",
    icon: Target,
    href: "#governance"
  },
  {
    title: "Roadmap",
    icon: Map,
    href: "#roadmap"
  },
  {
    title: "Risk Analysis",
    icon: Shield,
    href: "#risk-analysis"
  },
  {
    title: "Legal & Compliance",
    icon: Gavel,
    href: "#legal-compliance"
  },
  {
    title: "Conclusion",
    icon: Rocket,
    href: "#conclusion"
  }
];

export const DocsMobileDrawer = () => {
  const [open, setOpen] = React.useState(false);

  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:text-gray-900 p-2"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open navigation menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white border-gray-200 max-h-[80vh]">
        <DrawerHeader className="border-b border-gray-100">
          <DrawerTitle className="text-gray-900 font-semibold text-lg">Documentation Navigation</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-6 overflow-y-auto">
          <nav className="space-y-1 pt-4">
            {navigationItems.map((item) => (
              <button
                key={item.title}
                onClick={() => handleNavClick(item.href)}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-700 hover:bg-blue-50 hover:text-blue-900 text-left border border-transparent hover:border-blue-200"
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="text-base font-medium">{item.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
