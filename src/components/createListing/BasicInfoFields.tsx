
import { TextField, TextAreaField } from "@/components/scammer/FormFields";
import { ImageUpload } from "./ImageUpload";

interface BasicInfoFieldsProps {
  name: string;
  setName: (value: string) => void;
  photoUrl: string;
  setPhotoUrl: (value: string) => void;
  accusedOf: string;
  setAccusedOf: (value: string) => void;
}

export function BasicInfoFields({
  name,
  setName,
  photoUrl,
  setPhotoUrl,
  accusedOf,
  setAccusedOf
}: BasicInfoFieldsProps) {
  return (
    <div className="space-y-5">
      <TextField
        id="name"
        label="Name"
        placeholder="John Doe"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-western-wood mb-2">
          Scammer Photo <span className="text-western-accent">*</span>
        </label>
        <ImageUpload onImageChange={setPhotoUrl} currentImage={photoUrl} />
      </div>

      <TextAreaField
        id="accusedOf"
        label="Accused Of"
        placeholder="Describe the scam or fraudulent activity"
        value={accusedOf}
        onChange={(e) => setAccusedOf(e.target.value)}
        required
      />
    </div>
  );
}
