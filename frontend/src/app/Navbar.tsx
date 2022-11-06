/* eslint-disable @next/next/no-img-element */
// import Link from "next/link";
import React from "react";

import { HamburgerMenu } from "./Navbar.hamburger";
import NavbarAuth from "./Navbar.auth";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="w-full z-20 absolute h-16 md:h-20 md:p-5 md:gap-3 px-2 gap-2 bg-zinc-100 border-b-zinc-300 border-b-2 flex items-center justify-between">
      <div className="flex justify-between items-center gap-1">
        <HamburgerMenu />
        <Link href="/">
          <img
            src="/images/logo.svg"
            alt="logo"
            className="cursor-pointer md:ml-3"
            draggable={false}
            style={{
              width: "7rem",
              minWidth: "7rem",
            }}
          />
        </Link>
      </div>
      {/* <SearchBar /> */}
      <NavbarAuth />
    </header>
  );
};

export default Header;
