import React from "react";
import ReactDOM from "react-dom";
import { HamburgerMenuBackground } from "../HamburgerMenuBackground/HamburgerMenuBackground";
import styles from "./HamburgerMenuBody.module.scss";

export const HamburgerMenuBody: React.FC<{
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  opened: boolean;
  clicked: boolean;
  children: React.ReactNode;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ opened, clicked, children, setOpened }) => {
  if (!clicked) return null;

  return ReactDOM.createPortal(
    <>
      <div
        className={`min-h-screen bg-zinc-100 absolute top-16 md:top-20 ${
          clicked ? (opened ? styles.opened : styles.closed) : ""
        }`}
        style={{
          width: "200px",
          left: "0px",
          transform: "translateX(-200px)",
        }}
      >
        {children}
        <HamburgerMenuBackground
          setOpened={setOpened}
          clicked={clicked}
          opened={opened}
        />
      </div>
    </>,
    document.getElementById("menu") as Element
  );
};
