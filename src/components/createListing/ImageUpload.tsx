
import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Image, Trash2, FileX, Upload } from "lucide-react";
import { storageService } from "@/services/storage";
import { useWallet } from "@/context/WalletContext";
import { supabase } from "@/integrations/supabase/client";

interface ImageUploadProps {
  onImageUpload: (url: string) => void;
  scammerId: string;
  currentImage?: string;
}

export function ImageUpload({ onImageUpload, scammerId, currentImage }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(currentImage || null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { address, isConnected } = useWallet();

  const checkAuthentication = async () => {
    const { data: session } = await supabase.auth.getSession();
    return !!session?.session;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image size exceeds 5MB limit");
      toast.error("Image size exceeds 5MB limit");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      toast.error("Only image files are allowed");
      return;
    }
    
    // Check if user is authenticated
    const isAuthenticated = await checkAuthentication();
    if (!isAuthenticated) {
      setError("Authentication required to upload images");
      toast.error("Please sign in to upload images");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Use either the provided scammerId or a temporary id based on user address
      const effectiveId = scammerId || `temp-${address?.substring(0, 8)}`;
      
      const url = await storageService.uploadScammerImage(file, effectiveId);
      
      if (url) {
        setImageUrl(url);
        onImageUpload(url);
        toast.success("Image uploaded successfully");
      } else {
        setError("Failed to upload image. Please try again.");
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      setError("Error uploading image. Please try again.");
      toast.error("Error uploading image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleUploadClick = () => {
    if (!isConnected) {
      toast.error("Please connect your wallet before uploading an image");
      return;
    }
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    setImageUrl(null);
    onImageUpload("");
  };

  const handleImageError = () => {
    setError("Failed to load image");
    // Don't clear the URL here as it might be a temporary network issue
  };

  return (
    <div className="space-y-4">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
      />

      {imageUrl ? (
        // Image preview
        <Card className="overflow-hidden border-dashed">
          <CardContent className="p-2 relative">
            <div className="relative aspect-square w-full overflow-hidden rounded-md">
              <img
                src={imageUrl}
                alt="Most wanted"
                className="h-full w-full object-cover"
                onError={handleImageError}
              />
              
              {/* Overlay with remove button */}
              <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button 
                  variant="destructive" 
                  size="sm" 
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        // Upload placeholder
        <Card 
          className={`border-dashed border-2 ${error ? 'border-destructive' : 'border-muted-foreground/25'} hover:border-muted-foreground/50 transition-colors`}
        >
          <CardContent className="p-0">
            <Button 
              variant="ghost" 
              className="relative h-40 w-full rounded-md flex flex-col items-center justify-center gap-1 text-xs"
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
                  <span className="text-muted-foreground">Uploading...</span>
                </>
              ) : error ? (
                <>
                  <FileX className="h-12 w-12 text-destructive/60" />
                  <span className="text-destructive font-medium">{error}</span>
                  <span className="text-muted-foreground">Click to try again</span>
                </>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-muted-foreground/70" />
                  <span className="font-medium">Click to upload image</span>
                  <span className="text-muted-foreground">JPG, PNG, GIF up to 5MB</span>
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default ImageUpload;
