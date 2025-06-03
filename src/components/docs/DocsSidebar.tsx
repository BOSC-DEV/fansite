
import React from 'react';
import { FileText, BarChart3, Map, Settings, Users, Target, Rocket, Code } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Mission Statement",
    icon: FileText,
    href: "#mission-statement",
  },
  {
    title: "Some stats that hit home",
    icon: BarChart3,
    href: "#some-stats-that-hit-home",
  },
  {
    title: "Tokenomics",
    icon: Target,
    href: "#tokenomics",
  },
  {
    title: "Technology Stack",
    icon: Code,
    href: "#technology-stack",
  },
  {
    title: "Roadmap",
    icon: Map,
    href: "#roadmap",
  },
];

export function DocsSidebar() {
  const handleNavClick = (href: string) => {
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Sidebar className="bg-gray-50 border-r border-gray-200">
      <SidebarContent className="bg-gray-50 pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-600">Contents</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleNavClick(item.href)}
                    className="cursor-pointer text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
