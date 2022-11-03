import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";

export const HamburgerMenuButton: React.FC<{
  Icon: IconType;
  link: string;
  children: string;
}> = ({ Icon, link, children }) => {
  return (
    <Link href={link}>
      <div className="w-full h-16 border-b-2 flex items-center justify-between px-5 hover:bg-zinc-200 cursor-pointer transition-all active:bg-zinc-300">
        <h1 className="font-bold text-base">{children}</h1>
        <Icon size={30} />
      </div>
    </Link>
  );
};
