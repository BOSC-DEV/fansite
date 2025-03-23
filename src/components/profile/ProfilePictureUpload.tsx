
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserCircle2, Upload } from "lucide-react";
import { toast } from "sonner";
import { storageService } from "@/services/storage";

interface ProfilePictureUploadProps {
  displayName: string;
  profilePicUrl: string;
  onProfilePicChange: (url: string) => void;
  userId?: string;
}

export function ProfilePictureUpload({ 
  displayName, 
  profilePicUrl, 
  onProfilePicChange,
  userId
}: ProfilePictureUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    if (file.size > 2 * 1024 * 1024) {  // Increased to 2MB
      toast.error("File size should be less than 2MB");
      return;
    }

    if (!userId) {
      toast.error("User ID is required for uploading images");
      return;
    }

    setIsUploading(true);
    
    try {
      // Upload the file to Supabase Storage
      const imageUrl = await storageService.uploadProfileImage(file, userId);
      
      if (imageUrl) {
        onProfilePicChange(imageUrl);
        toast.success("Image uploaded successfully");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    } finally {
      setIsUploading(false);
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
        disabled={isUploading}
        className="flex items-center gap-2"
      >
        <Upload size={16} />
        {isUploading ? "Uploading..." : "Upload Picture"}
      </Button>
      
      <input 
        type="file" 
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      
      <p className="text-xs text-muted-foreground text-center">
        Max file size: 2MB<br />
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
          <p className="text-xs text-muted-foreground">Image URL (auto-filled after upload)</p>
        </div>
      )}
    </div>
  );
}
