import React, { useState } from "react";
import { TbSearch } from "react-icons/tb";

export const SearchBarIcon: React.FC = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div
      className="flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition-all active:bg-zinc-300 cursor-pointer absolute border-2 border-zinc-300"
      style={{
        minWidth: "55px",
        minHeight: "55px",
        height: "55px",
        width: "55px",
      }}
    >
      <div
        className="w-7 h-7 flex-col gap-3 flex items-center justify-center"
        onClick={() => {
          setEnabled(!enabled);
        }}
      >
        <TbSearch size="28px" />
      </div>
    </div>
  );
};
