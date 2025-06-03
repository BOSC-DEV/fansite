
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  path: string;
  label: string;
  icon: React.ReactNode;
}

interface MobileDrawerProps {
  menuItems: MenuItem[];
}

export const MobileDrawer = ({ menuItems }: MobileDrawerProps) => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm" className="text-western-parchment hover:text-western-sand">
          <Menu className="h-5 w-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="bg-western-wood border-western-accent">
        <DrawerHeader>
          <DrawerTitle className="text-western-parchment font-wanted">Navigation</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-6">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors font-western",
                  location.pathname === item.path
                    ? "bg-western-accent/30 text-western-parchment"
                    : "text-western-sand hover:text-western-parchment hover:bg-western-accent/10"
                )}
              >
                {item.icon}
                <span className="text-base">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
