
import React from "react";

interface CompactTableFooterProps {
  isSortable: boolean;
}

export const CompactTableFooter = ({ isSortable }: CompactTableFooterProps) => {
  return (
    <div className="text-center py-3 text-xs text-western-wood/70">
      Swipe for more details {isSortable && "— Tap headers to sort"}
    </div>
  );
};
