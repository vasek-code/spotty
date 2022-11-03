import Link from "next/link";
import React from "react";
import { BsArrowLeftShort } from "react-icons/bs";

export const BackToMapButton = () => {
  return (
    <div className="flex items-center gap-2">
      <Link href="/map">
        <a className="w-11 h-11 p-2 rounded-full bg-blue-50 hover:bg-blue-100 active:bg-blue-200 transition-all">
          <BsArrowLeftShort className="w-full h-full" color="#386fe3" />
        </a>
      </Link>
      <h3 className="font-medium text-lg">Map</h3>
    </div>
  );
};
