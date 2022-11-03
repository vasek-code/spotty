import React from "react";
import { IconType } from "react-icons";

export const UserMenuButton: React.FC<{
  children: React.ReactNode;
  top?: boolean;
  bottom?: boolean;
  Icon: IconType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, bottom, top, Icon, onClick }) => {
  return (
    <button
      className={`h-10 w-full hover:bg-zinc-100 flex justify-between items-center px-2 font-semibold transition-all active:bg-zinc-200 ${
        bottom ? "rounded-b-md" : ""
      } ${top ? "rounded-t-md" : ""}`}
      onClick={onClick}
    >
      {children}
      <Icon size="21px" />
    </button>
  );
};
