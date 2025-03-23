
import { useState, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserCircle2, Upload } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { storageService } from "@/services/storage/storageService";

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
    
    if (file.size > 1 * 1024 * 1024) {  // 1MB
      toast.error("File size should be less than 1MB");
      return;
    }

    if (!userId) {
      toast.error("User ID is required for uploading images");
      return;
    }

    setIsUploading(true);
    
    try {
      // Use the storageService to upload the image
      const publicUrl = await uploadProfileImage(file, userId);
      
      if (publicUrl) {
        onProfilePicChange(publicUrl);
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

  // Helper function to upload the image directly
  const uploadProfileImage = async (file: File, userId: string): Promise<string | null> => {
    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      console.log("Uploading file:", filePath);
      
      // Upload the file to the 'profile-images' bucket
      const { error: uploadError } = await supabase.storage
        .from('profile-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Overwrite if the file already exists
        });
        
      if (uploadError) {
        console.error('Error uploading image:', uploadError);
        return null;
      }
      
      // Get the public URL for the uploaded file
      const { data: publicUrlData } = supabase.storage
        .from('profile-images')
        .getPublicUrl(filePath);
      
      console.log("Uploaded successfully, public URL:", publicUrlData.publicUrl);
      return publicUrlData.publicUrl;
    } catch (error) {
      console.error("Error in uploadProfileImage:", error);
      return null;
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
        Max file size: 1MB<br />
        Supported formats: JPEG, PNG, GIF
      </p>
    </div>
  );
}
