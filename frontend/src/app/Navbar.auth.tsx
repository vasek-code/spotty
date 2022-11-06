"use client";

import React from "react";

import NavbarUser from "./Navbar.user";

import { getSession } from "../utils/getSesssion";
import { asyncComponent } from "../utils/asyncComponent";
import Link from "next/link";
import { NotificationMenu } from "../components/NotificationMenu/NotificationMenu";
import { useSession } from "../hooks/useSession";

const NavbarAuth = () => {
  const { data: user } = useSession();

  return (
    <>
      {user ? (
        <>
          <div className="flex justify-between items-center md:gap-4 gap-2">
            <NotificationMenu />
            <NavbarUser />
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center gap-3">
            <Link
              href="/sign-in"
              className="font-semibold p-3 hover:bg-zinc-200 rounded-full active:bg-zinc-300 transition-all focus-within:border-zinc-300 border-2 border-transparent whitespace-nowrap"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 font-semibold text-white p-3 rounded-full hover:bg-blue-700 active:bg-blue-800 transition-all border-2 focus-within:border-blue-500"
            >
              Register
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default NavbarAuth;
