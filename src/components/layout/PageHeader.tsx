
import { Button } from "@/components/ui/button";
import { FileText, Skull } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  title: string;
  description: string;
  actionLink?: string;
  actionLabel?: string;
  actionIcon?: React.ReactNode;
}

export const PageHeader = ({
  title,
  description,
  actionLink,
  actionLabel,
  actionIcon
}: PageHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 paper-texture p-6 rounded-sm border-2 border-western-wood">
      <div className="flex items-center gap-3">
        <Skull className="h-8 w-8 text-western-accent hidden md:block" />
        <div>
          <h1 className="text-3xl font-wanted text-western-accent uppercase tracking-wide">{title}</h1>
          <p className="text-western-wood font-western">{description}</p>
        </div>
      </div>
      {actionLink && actionLabel && (
        <Button asChild className="western-btn">
          <Link to={actionLink} className="flex items-center">
            {actionIcon}
            {actionLabel}
          </Link>
        </Button>
      )}
    </div>
  );
}
