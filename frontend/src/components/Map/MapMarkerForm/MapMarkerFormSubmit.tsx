import React, { useContext } from "react";
import { markerCreateContext } from "../../../contexts/MarkerFormContext";

const MapMarkerFormSubmit = () => {
  const { onSubmit } = useContext(markerCreateContext) as {
    onSubmit: () => void;
  };

  return (
    <button
      onClick={onSubmit}
      className="w-40 rounded-full ml-auto bg-zinc-200 py-3 text-lg hover:bg-zinc-300 active:bg-zinc-400 transition-all font-semibold"
    >
      Save
    </button>
  );
};

export default MapMarkerFormSubmit;
