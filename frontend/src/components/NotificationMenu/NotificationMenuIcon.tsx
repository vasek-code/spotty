import React, { useState } from "react";
import { BiBell, BiBellOff } from "react-icons/bi";

export const NotificationMenuIcon: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-zinc-200 transition-all active:bg-zinc-300 cursor-pointer"
      style={{
        minWidth: "2.75rem",
        minHeight: "2.75rem",
        height: "2.75rem",
        width: "2.75rem",
      }}
      onClick={() => {
        setEnabled(!enabled);
      }}
    >
      <div className="w-7 h-7 flex-col gap-3 flex items-center justify-center">
        {enabled ? <BiBell size="28px" /> : <BiBellOff size="28px" />}
      </div>
    </div>
  );
};
