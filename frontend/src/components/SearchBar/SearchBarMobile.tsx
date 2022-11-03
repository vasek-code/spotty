import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { TbSearch } from "react-icons/tb";

export const SearchBarMobile = () => {
  return (
    <div
      className="flex md:hidden ml-auto pl-1"
      style={{
        minWidth: "2.75rem",
        minHeight: "2.75rem",
        height: "2.75rem",
        width: "2.75rem",
      }}
    >
      <div
        className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-zinc-200 transition-all active:bg-zinc-300 cursor-pointer"
        style={{
          minWidth: "2.75rem",
          minHeight: "2.75rem",
          height: "2.75rem",
          width: "2.75rem",
        }}
        // onClick={() => {}}
      >
        <div className="w-7 h-7 flex-col gap-3 flex items-center justify-center">
          <TbSearch size="28px" />
        </div>
      </div>
    </div>
  );
};
