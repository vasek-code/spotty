import React from "react";
import "../styles/globals.css";

import Navbar from "./Navbar";

interface layoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<layoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <div id="menu" className="z-20 absolute w-full" />
      </body>
    </html>
  );
};

export default Layout;
