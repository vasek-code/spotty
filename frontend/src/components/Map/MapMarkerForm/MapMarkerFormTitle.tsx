import React, { useContext } from "react";
import {
  MarkerContextType,
  markerCreateContext,
} from "../../../contexts/MarkerFormContext";

const MapMarkerFormTitle = () => {
  const { title, setTitle } = useContext(
    markerCreateContext
  ) as MarkerContextType;

  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-xl font-semibold">Title</h2>
      <input
        className="w-full h-14 border-2 border-zinc-300 rounded-full px-5 outline-none font-semibold focus-visible:border-zinc-400 transition-all"
        placeholder="Enter title"
        onChange={(e) => {
          setTitle(e.target.value);
        }}
        value={title}
      />
    </div>
  );
};

export default MapMarkerFormTitle;
