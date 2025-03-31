
import React from 'react';
import { Button, ButtonProps } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

interface WalletButtonProps extends ButtonProps {
  onClick: () => Promise<void>;
  children?: React.ReactNode;
}

export function WalletButton({ onClick, children, className, ...props }: WalletButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={`flex items-center gap-2 ${className}`}
      {...props}
    >
      <Wallet className="h-4 w-4" />
      {children || "Connect Wallet"}
    </Button>
  );
}
