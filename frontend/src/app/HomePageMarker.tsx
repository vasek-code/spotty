"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import randomNumber from "../utils/randomNumber";
import styles from "./HomePageMarker.module.scss";

// eslint-disable-next-line react/display-name
export const HomePageMarker = React.memo(
  () => {
    const [visible, setVisible] = useState(true);
    const { width, height } = useWindowSize();

    const position = useMemo(() => {
      return {
        x: randomNumber({ min: 1, max: width }),
        y: randomNumber({ min: 1, max: height }),
      };
    }, [height, width]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setVisible(false);
        setTimeout(() => {
          document.querySelectorAll("img[alt='marker']")[0]?.remove();
        }, 1000);
      }, randomNumber({ min: 3000, max: 7000 }));

      return () => {
        clearTimeout(timeout);
      };
    }, []);

    return (
      <img
        src="/images/place-marker.svg"
        alt="marker"
        className={`absolute ${styles.open} ${visible ? "" : styles.hidden}`}
        style={{
          top: position.y,
          left: position.x,
          width: "50px",
          height: "50px",
        }}
      />
    );
  },
  () => true
);
