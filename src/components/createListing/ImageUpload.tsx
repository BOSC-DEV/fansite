import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Image as ImageIcon, X, Check } from "lucide-react";
import { storageService } from "@/services/storage";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageChange: (url: string) => void;
  currentImage?: string;
}

export function ImageUpload({ onImageChange, currentImage }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const [imageStatus, setImageStatus] = useState<'idle' | 'validating' | 'valid' | 'error'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      setImageStatus('validating');
      
      if (!file.type.startsWith('image/')) {
        toast.error('File must be an image');
        setImageStatus('error');
        resolve(false);
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        toast.error('File must be smaller than 10MB');
        setImageStatus('error');
        resolve(false);
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        setImageStatus('valid');
        resolve(true);
      };
      img.onerror = () => {
        toast.error('Image appears to be corrupted or invalid');
        setImageStatus('error');
        resolve(false);
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    const isValid = await validateImage(file);
    if (!isValid) {
      return;
    }

    setIsUploading(true);
    try {
      console.log("Starting scammer image upload...");
      
      const uniqueId = uuidv4();
      
      const imageUrl = await storageService.uploadScammerImage(file, uniqueId);
      
      if (imageUrl) {
        console.log("Scammer image uploaded successfully:", imageUrl);
        onImageChange(imageUrl);
        toast.success("Image uploaded successfully");
        
        const preloadImg = new Image();
        preloadImg.src = imageUrl;
      } else {
        console.error("Failed to upload scammer image, using placeholder");
        const placeholderUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(file.name)}&background=random`;
        onImageChange(placeholderUrl);
        toast.warning("Using placeholder image due to upload issues");
      }
    } catch (error: any) {
      console.error("Error uploading scammer image:", error);
      const placeholderUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(file.name)}&background=random`;
      onImageChange(placeholderUrl);
      toast.warning("Using placeholder image due to upload issues");
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
    setImageStatus('idle');
    onImageChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload scammer image"
      />

      {previewUrl ? (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Scammer preview"
            className="rounded-md border border-western-wood/20 object-cover max-h-48 mx-auto"
          />
          <Button
            type="button"
            size="icon"
            variant="destructive"
            className="absolute top-2 right-2 h-8 w-8 bg-western-wood/80 hover:bg-western-wood text-western-parchment"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
          
          {imageStatus === 'validating' && (
            <div className="absolute top-2 left-2 h-8 w-8 bg-western-sand/80 rounded-full flex items-center justify-center">
              <div className="h-4 w-4 border-2 border-western-wood border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {imageStatus === 'valid' && (
            <div className="absolute top-2 left-2 h-8 w-8 bg-green-500/80 rounded-full flex items-center justify-center">
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      ) : (
        <div
          onClick={triggerFileInput}
          className="border-2 border-dashed border-western-wood/30 rounded-md p-6 text-center cursor-pointer hover:border-western-wood/50 transition-colors"
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <ImageIcon className="h-10 w-10 text-western-wood/40" />
            <p className="text-western-wood font-medium text-sm">
              Click to upload an image
            </p>
            <p className="text-western-wood/60 text-xs">
              JPG, PNG or GIF (max. 10MB)
            </p>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="text-center py-2">
          <div className="animate-spin h-5 w-5 border-2 border-western-accent border-t-transparent rounded-full mx-auto"></div>
          <p className="text-western-wood/70 text-xs mt-1">Uploading image...</p>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full mt-2 border-western-wood/30 text-western-wood hover:bg-western-sand/20"
        onClick={triggerFileInput}
        disabled={isUploading || imageStatus === 'validating'}
      >
        <Upload className="h-4 w-4 mr-2" /> {isUploading ? "Uploading..." : "Upload image"}
      </Button>
    </div>
  );
}
