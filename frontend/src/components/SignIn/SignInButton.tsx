import React from "react";

export const SignInButton: React.FC<{
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-center items-center p-2 h-10 gap-2 font-semibold border-2 rounded-md bg-zinc-100 hover:bg-zinc-200 active:bg-zinc-300 transition-all"
    >
      {children}
    </button>
  );
};
