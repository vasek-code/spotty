import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./HamburgerMenuBackground.module.scss";

export const HamburgerMenuBackground: React.FC<{
  clicked: boolean;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ clicked, opened, setOpened }) => {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (opened) {
      setClosed(false);
      return;
    }

    const timeout = setTimeout(() => {
      setClosed(true);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [opened]);

  if (!clicked) return null;

  return ReactDOM.createPortal(
    <div
      className={`w-full bg-black absolute top-16 md:top-20 ${
        clicked ? (opened ? styles.bgOpened : styles.bgClosed) : ""
      } ${closed ? "scale-0" : ""}`}
      style={{
        left: "0px",
        height: "100vh",
      }}
      onClick={() => {
        setOpened(false);
      }}
    />,
    document.getElementById("menu") as Element
  );
};
