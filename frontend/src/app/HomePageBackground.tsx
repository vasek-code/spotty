"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { HomePageMarker } from "./HomePageMarker";

export const HomePageBackground = () => {
  const [markers, setMarkers] = useState<number[]>([]);

  useEffect(() => {
    setMarkers([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    setInterval(() => {
      setMarkers((prevState) => [...prevState, prevState.length + 1]);
    }, 1000);
  }, []);

  useEffect(() => {
    const socket = io("http://localhost:4000");
  }, []);

  return (
    <div className="absolute w-full h-full">
      <img
        src="/images/background.png"
        className="w-full h-full object-cover"
        alt="background image"
      />
      {markers.map((marker) => {
        return <HomePageMarker key={marker} />;
      })}
    </div>
  );
};
