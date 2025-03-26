
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { useState, useEffect } from "react";

interface TagInputProps {
  label: string;
  placeholder: string;
  currentValue: string;
  values: string[];
  setCurrentValue: (value: string) => void;
  addValue: (e: React.FormEvent) => void;
  removeValue: (value: string) => void;
}

export function TagInput({
  label,
  placeholder,
  currentValue,
  values,
  setCurrentValue,
  addValue,
  removeValue,
}: TagInputProps) {
  const [showReminder, setShowReminder] = useState(false);
  
  // Check if user has entered text but hasn't added it
  useEffect(() => {
    if (currentValue.trim().length > 0) {
      const timer = setTimeout(() => {
        setShowReminder(true);
      }, 3000); // Show reminder after 3 seconds of inactivity
      
      return () => clearTimeout(timer);
    } else {
      setShowReminder(false);
    }
  }, [currentValue]);

  // Hide reminder when value is added
  const handleAddValue = (e: React.FormEvent) => {
    addValue(e);
    setShowReminder(false);
  };

  return (
    <div className="space-y-3">
      <Label>{label}</Label>
      <div className="flex space-x-2">
        <Input
          placeholder={placeholder}
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddValue(e))}
          className={showReminder ? "border-amber-500" : ""}
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddValue}
          className="bg-western-wood/20 border-western-wood/40 hover:bg-western-wood/30"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {showReminder && (
        <p className="text-amber-600 text-sm mt-1">
          Press + or Enter to add this {label.toLowerCase().replace(/s$/, '')}
        </p>
      )}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {values.map((value, i) => (
            <Badge key={i} variant="secondary" className="pl-2 pr-1 py-1 flex items-center">
              <span className="truncate max-w-[150px]">{value}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-5 w-5 ml-1"
                onClick={() => removeValue(value)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}

interface TextFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

export function TextField({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  required = false 
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} {required && '*'}</Label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  );
}

interface TextAreaFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  className?: string;
}

export function TextAreaField({ 
  id, 
  label, 
  placeholder, 
  value, 
  onChange, 
  required = false,
  className = "min-h-[80px]"
}: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label} {required && '*'}</Label>
      <Textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={className}
        required={required}
      />
    </div>
  );
}
