import React, { useContext } from "react";
import {
  MarkerContextType,
  markerCreateContext,
} from "../../../contexts/MarkerFormContext";
import { MapMarkerHashtagInput } from "./MapMarkerHashtagInput";

const MapMarkerHashtagInputBody = () => {
  const { hashtags } = useContext(markerCreateContext) as MarkerContextType;

  return (
    <>
      {hashtags.map((value, index) => (
        <MapMarkerHashtagInput key={index} index={index} value={value} />
      ))}
    </>
  );
};

export default MapMarkerHashtagInputBody;
