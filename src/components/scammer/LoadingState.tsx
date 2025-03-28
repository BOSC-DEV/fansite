
import React from "react";
import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="text-center py-12">
      <Loader2 className="h-8 w-8 animate-spin mx-auto text-western-wood" />
      <p className="mt-4 text-western-wood">Loading...</p>
    </div>
  );
}
