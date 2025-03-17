
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {actionLink && actionLabel && (
        <Button asChild>
          <Link to={actionLink} className="flex items-center">
            {actionIcon}
            {actionLabel}
          </Link>
        </Button>
      )}
    </div>
  );
};
