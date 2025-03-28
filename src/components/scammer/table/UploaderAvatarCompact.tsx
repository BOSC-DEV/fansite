
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useScammerProfile } from "@/hooks/useScammerProfile";

interface UploaderAvatarProps {
  addedBy: string | undefined;
}

export const UploaderAvatarCompact = ({ addedBy }: UploaderAvatarProps) => {
  const { addedByUsername, addedByPhotoUrl, profileId } = useScammerProfile(addedBy);
  
  if (!addedBy) return <div className="flex justify-center">-</div>;
  
  const profileUrl = addedByUsername ? `/${addedByUsername}` : `/user/${profileId}`;
  
  return (
    <div className="flex justify-center">
      <Link 
        to={profileUrl}
        onClick={(e) => e.stopPropagation()}
      >
        <Avatar className="w-8 h-8 border border-western-wood hover:border-western-accent transition-all">
          <AvatarImage src={addedByPhotoUrl || ''} alt={addedByUsername || addedBy} />
          <AvatarFallback className="bg-western-wood text-western-parchment text-xs">
            {(addedByUsername || addedBy).charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
};
