import React from "react";
import styles from "./UserMenuBody.module.scss";

export const UserMenuBody: React.FC<{
  clicked: boolean;
  opened: boolean;
  children: React.ReactNode;
}> = ({ clicked, opened, children }) => {
  if (!clicked) return null;

  return (
    <div
      className={`absolute w-52 bg-zinc-50 top-16 right-1 md:right-8 rounded-lg m-1 transition-all shadow-lg border-8 border-zinc-50 ${
        clicked ? (opened ? styles.opened : styles.closed) : ""
      }`}
    >
      {children}
    </div>
  );
};
