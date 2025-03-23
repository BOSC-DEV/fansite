
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { storageService } from "@/services/storage";
import { v4 as uuidv4 } from "uuid";

interface ImageUploadProps {
  onImageChange: (url: string) => void;
  currentImage?: string;
}

export function ImageUpload({ onImageChange, currentImage }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentImage || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('File must be an image');
      return;
    }

    // Create a preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    setIsUploading(true);
    try {
      // Upload the file using the storage service
      const uniqueId = uuidv4();
      const imageUrl = await storageService.uploadProfileImage(file, uniqueId);
      
      if (imageUrl) {
        onImageChange(imageUrl);
      } else {
        throw new Error("Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Reset preview on error
      setPreviewUrl(null);
    } finally {
      setIsUploading(false);
    }
  };

  const clearImage = () => {
    setPreviewUrl(null);
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
      >
        <Upload className="h-4 w-4 mr-2" /> Upload image
      </Button>
    </div>
  );
}
