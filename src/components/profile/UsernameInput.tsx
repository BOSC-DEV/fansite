
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface UsernameInputProps {
  username: string;
  setUsername: (username: string) => void;
  isAvailable: boolean;
  checkingUsername: boolean;
}

export function UsernameInput({
  username,
  setUsername,
  isAvailable,
  checkingUsername
}: UsernameInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <div className="relative">
        <Input 
          id="username" 
          placeholder="your_username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className={`${!isAvailable && username ? 'border-red-500' : ''}`}
          required 
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          {checkingUsername && <div className="h-4 w-4 animate-spin rounded-full border-2 border-western-sand border-t-transparent" />}
          {!checkingUsername && username && (
            isAvailable 
              ? <div className="h-4 w-4 text-green-500">✓</div> 
              : <div className="h-4 w-4 text-red-500">✗</div>
          )}
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Your profile will be accessible at bookofscams.lol/{username}
      </p>
      {!isAvailable && username && (
        <p className="text-xs text-red-500 mt-1">
          Username unavailable or invalid. Use only letters, numbers, and underscores.
        </p>
      )}
    </div>
  );
}
