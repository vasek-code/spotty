"use client";

import React, { useEffect, useState } from "react";
import { Marker } from "../../../../backend/node_modules/@prisma/client";
import { fetchServer } from "../../utils/fetchServer";
import { getServerToken } from "../../utils/getServerToken";
import { MapMarker } from "./MapMarker";
import { notFound } from "next/navigation";
import { getClientToken } from "../../utils/getClientToken";

const getAllMarkers = async () => {
  const token = getClientToken();

  if (!token) {
    return [];
  }

  const res = await fetchServer("marker/all", "GET", token, undefined);

  if (res.ok) {
    const markers = (await res.json()) as Marker[];

    return markers;
  } else {
    return [];
  }
};

const MarkerList = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    (async () => {
      const markers = await getAllMarkers();

      console.log(markers);

      setMarkers(markers);
    })();
  }, []);

  return (
    <>
      {markers.map((marker) => {
        return <MapMarker key={marker.id} marker={marker} />;
      })}
    </>
  );
};

export default MarkerList;
