import React from "react";
import { SearchBarIcon } from "./SearchBarIcon";

export const SearchBarContainer = () => {
  return (
    <>
      <div className="flex h-full justify-end">
        <input
          className="bg-zinc-200 rounded-full flex px-4 w-full h-full border-2 border-transparent focus-visible:border-zinc-300 outline-none transition-all font-semibold"
          placeholder="search most popular places by #"
        />

        <SearchBarIcon />
      </div>
    </>
  );
};
