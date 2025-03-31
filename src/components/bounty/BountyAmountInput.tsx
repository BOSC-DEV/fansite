
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

interface BountyAmountInputProps {
  amount: string;
  message: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMessageChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function BountyAmountInput({ 
  amount, 
  message, 
  onChange, 
  onMessageChange 
}: BountyAmountInputProps) {
  return (
    <>
      <Separator className="my-4 bg-western-wood/20" />
      
      <div>
        <Label htmlFor="amount" className="text-western-wood font-western">Contribution Amount (in SOL)</Label>
        <div className="flex mt-1.5">
          <Input
            id="amount"
            type="text"
            placeholder="0.00"
            value={amount}
            onChange={onChange}
            className="bg-western-parchment border-western-wood/50 text-western-wood font-western"
          />
          <div className="flex items-center justify-center bg-western-sand/30 border border-western-wood/30 border-l-0 px-3 rounded-r-sm">
            <span className="text-sm font-medium text-western-wood font-western">SOL</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <Label htmlFor="message" className="text-western-wood font-western">Message (optional)</Label>
        <Textarea
          id="message"
          placeholder="Add a message with your contribution..."
          value={message}
          onChange={onMessageChange}
          className="mt-1.5 h-20 bg-western-parchment border-western-wood/50 text-western-wood font-western resize-none"
        />
      </div>
    </>
  );
}
