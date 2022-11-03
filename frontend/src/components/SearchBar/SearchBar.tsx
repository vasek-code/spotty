import React from "react";
import { BiSearchAlt } from "react-icons/bi";
import { SearchBarContainer } from "./SearchBarContainer";
import { SearchBarMobile } from "./SearchBarMobile";

export const SearchBar = () => {
  return (
    <>
      <div
        style={{
          maxWidth: "700px",
          width: "100%",
          height: "55px",
        }}
        className="hidden md:inline"
      >
        <SearchBarContainer />
      </div>
      <SearchBarMobile />
    </>
  );
};
