
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle2, Upload } from "lucide-react";
import { toast } from "sonner";

interface ProfilePictureUploadProps {
  displayName: string;
  profilePicUrl: string;
  onProfilePicChange: (url: string) => void;
}

export function ProfilePictureUpload({ 
  displayName, 
  profilePicUrl, 
  onProfilePicChange 
}: ProfilePictureUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        toast.error("File size should be less than 1MB");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          onProfilePicChange(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4 mb-4">
      <Avatar className="w-24 h-24">
        <AvatarImage src={profilePicUrl} alt={displayName} />
        <AvatarFallback className="bg-western-sand">
          <UserCircle2 className="w-12 h-12 text-western-wood" />
        </AvatarFallback>
      </Avatar>
      
      <Button 
        type="button" 
        variant="outline" 
        onClick={triggerFileInput}
        className="flex items-center gap-2"
      >
        <Upload size={16} />
        Upload Picture
      </Button>
      
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <p className="text-xs text-muted-foreground text-center">
        Max file size: 1MB<br />
        Supported formats: JPEG, PNG, GIF
      </p>

      {profilePicUrl && (
        <div className="space-y-2 w-full">
          <Label htmlFor="profilePic">Profile Picture URL</Label>
          <Input
            id="profilePic"
            value={profilePicUrl}
            onChange={(e) => onProfilePicChange(e.target.value)}
            disabled
          />
          <p className="text-xs text-muted-foreground">Your uploaded image or custom URL</p>
        </div>
      )}
    </div>
  );
}
