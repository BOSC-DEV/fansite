
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
  SidebarHeader,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Overview",
    icon: FileText,
    href: "#mission-statement",
  },
  {
    title: "Statistics",
    icon: BarChart3,
    href: "#stats",
  },
  {
    title: "Tokenomics",
    icon: Target,
    href: "#tokenomics",
  },
  {
    title: "Technology",
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
    const element = document.querySelector(href.replace('#', '').replace('-', ' ').toLowerCase());
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Sidebar className="bg-gray-50 border-r border-gray-100">
      <SidebarHeader className="border-b border-gray-100 p-4 bg-white">
        <h2 className="text-lg font-semibold text-gray-800">Documentation</h2>
      </SidebarHeader>
      
      <SidebarContent className="bg-gray-50">
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
