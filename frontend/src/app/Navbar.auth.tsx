import React from "react";

import NavbarUser from "./Navbar.user";

import { getSession } from "../utils/getSesssion";
import { asyncComponent } from "../utils/asyncComponent";

const NavbarAuth = asyncComponent(async () => {
  const session = await getSession();

  return (
    <>
      {session ? (
        <>
          <div className="flex justify-between items-center md:gap-4 gap-2">
            {/* <NotificationMenu /> */}
            <NavbarUser user={session} />
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center gap-3">
            <a href="/sign-in">
              <button className="font-semibold p-3 hover:bg-zinc-200 rounded-full active:bg-zinc-300 transition-all focus-within:border-zinc-300 border-2 border-transparent whitespace-nowrap">
                Sign In
              </button>
            </a>
            <a href="/register">
              <button className="bg-blue-600 font-semibold text-white p-3 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-all border-2 focus-within:border-blue-500">
                Register
              </button>
            </a>
          </div>
        </>
      )}
    </>
  );
});

export default NavbarAuth;
