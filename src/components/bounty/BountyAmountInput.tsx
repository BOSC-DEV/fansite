
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface BountyAmountInputProps {
  amount: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function BountyAmountInput({ amount, onChange }: BountyAmountInputProps) {
  return (
    <>
      <Separator className="my-4 bg-western-wood/20" />
      
      <div>
        <Label htmlFor="amount" className="text-western-wood">Contribution Amount (in SOL)</Label>
        <div className="flex mt-1.5">
          <Input
            id="amount"
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={onChange}
            className="bg-western-parchment border-western-wood/50 text-western-wood"
          />
          <div className="flex items-center justify-center bg-western-sand/20 border border-western-wood/30 border-l-0 px-3 rounded-r-sm">
            <span className="text-sm font-medium text-western-wood">SOL</span>
          </div>
        </div>
      </div>
    </>
  );
}
