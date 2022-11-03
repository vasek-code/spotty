import React from "react";

export const MainContainer: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <main className="w-full h-screen pt-16 md:pt-20 absolute">{children}</main>
  );
};
