
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface BasicInfoFormProps {
  displayName: string;
  bio: string;
  bioCharCount: number;
  walletAddress: string | null;
  onDisplayNameChange: (name: string) => void;
  onBioChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function BasicInfoForm({
  displayName,
  bio,
  bioCharCount,
  walletAddress,
  onDisplayNameChange,
  onBioChange,
}: BasicInfoFormProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="displayName">Display Name</Label>
        <Input
          id="displayName"
          placeholder="Your Name"
          value={displayName}
          onChange={(e) => onDisplayNameChange(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          placeholder="Short bio about yourself (142 chars max)"
          value={bio}
          onChange={onBioChange}
          maxLength={142}
          className="resize-none"
        />
        <p className="text-xs text-muted-foreground flex justify-between">
          <span>Brief description about yourself</span>
          <span className={bioCharCount > 120 ? "text-amber-500" : ""}>
            {bioCharCount}/142
          </span>
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="walletAddress">Wallet Address</Label>
        <Input
          id="walletAddress"
          value={walletAddress || ""}
          disabled
          className="bg-muted"
        />
        <p className="text-xs text-muted-foreground">Your connected wallet address (public)</p>
      </div>
    </div>
  );
}
