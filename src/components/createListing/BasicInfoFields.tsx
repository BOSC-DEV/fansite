
import { TextField, TextAreaField } from "@/components/scammer/FormFields";

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
    <>
      <div className="grid gap-6 md:grid-cols-2">
        <TextField
          id="name"
          label="Name"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        
        <TextField
          id="photoUrl"
          label="Photo URL"
          placeholder="https://example.com/photo.jpg"
          value={photoUrl}
          onChange={(e) => setPhotoUrl(e.target.value)}
          required
        />
      </div>

      <TextAreaField
        id="accusedOf"
        label="Accused Of"
        placeholder="Describe the scam or fraudulent activity"
        value={accusedOf}
        onChange={(e) => setAccusedOf(e.target.value)}
        required
      />
    </>
  );
}
