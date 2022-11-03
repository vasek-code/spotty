import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import removeElementsByQuery from "../../utils/removeElementsByQuery";
import mapStyle from "../../assets/json/map-style.json";
import { MapMarker } from "./MapMarker";
import { useCurrentPosition } from "../../hooks/useCurrentPosition";
import { env } from "../../env/client.mjs";
import { markersContext } from "../../contexts/MarkersContext";
import MapMarkerForm from "./MapMarkerForm/MapMarkerForm";
import { MarkerCreateProvider } from "../../contexts/MarkerFormContext";
import addStylesUsingQuery from "../../utils/addStylesUsingQuery";

export const Map: React.FC = () => {
  const markers = useContext(markersContext);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const center = useCurrentPosition();

  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_API_KEY as string,
  });

  const onLoad = useCallback(
    (map: google.maps.Map) => {
      setInterval(() => {
        removeElementsByQuery([
          ".gm-control-active",
          ".gm-style-cc",
          "img[alt='Google']",
          "div[data-control-height='81']",
          "div[jstcache='82']",
          ".gm-svpc",
          "ul[role='menu']",
          ".gmnoprint",
        ]);
      }, 10);
    },
    [center]
  );

  const onUnmount = useCallback(() => {
    return;
  }, []);

  const [opened, setOpened] = useState(false);
  const [clicked, setClicked] = useState(false);

  const closeForm = useCallback(() => {
    setOpened(false);
  }, []);

  useEffect(() => {
    if (!opened) {
      setTimeout(() => {
        setClicked(false);
      }, 500);
    }
  }, [opened]);

  return isLoaded ? (
    <MarkerCreateProvider lat={lat} lng={lng} closeForm={closeForm}>
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "100vh",
          position: "absolute",
        }}
        zoom={9}
        center={center}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{ styles: mapStyle }}
        onRightClick={(e) => {
          setLat(e.latLng?.lat() as number);
          setLng(e.latLng?.lng() as number);
          setOpened(true);
          setClicked(true);
        }}
      >
        {clicked && (
          <MapMarkerForm
            setOpened={setOpened}
            opened={opened}
            clicked={clicked}
          />
        )}

        {markers &&
          markers.markers &&
          markers.markers.map((marker) => {
            return <MapMarker key={marker.id} marker={marker} />;
          })}
      </GoogleMap>
    </MarkerCreateProvider>
  ) : (
    <></>
  );
};
