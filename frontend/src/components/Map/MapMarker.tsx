import { Marker } from "@react-google-maps/api";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MarkerRecordType } from "../../types/MarkerRecordType";
import { MapDetail } from "./MapDetail/MapDetail";

export const MapMarker: React.FC<{
  marker: MarkerRecordType;
}> = ({ marker }) => {
  const router = useRouter();

  const [opened, setOpened] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (router.query.markerId === marker.id) {
        setOpened(true);
        setClicked(true);
      }
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [router, marker, opened]);

  useEffect(() => {
    if (!opened) {
      setTimeout(() => {
        setClicked(false);
      }, 500);
    }
  }, [opened]);

  return (
    <>
      <Marker
        position={{
          lat: marker.lat,
          lng: marker.lng,
        }}
        icon={{
          url: "/images/place-marker.svg",
          scaledSize: new window.google.maps.Size(50, 50),
        }}
        animation={google.maps.Animation.DROP}
        onClick={() => {
          setOpened(!opened);
          setClicked(true);
          router.push(`/map?markerId=${marker.id}`);
        }}
      />
      {marker && clicked && (
        <MapDetail
          setOpened={setOpened}
          opened={opened}
          clicked={clicked}
          marker={marker}
        />
      )}
    </>
  );
};
