import React, { useContext } from "react";
import { markerCreateContext } from "../../../contexts/MarkerFormContext";

export const MapMarkerDescriptionArea = () => {
  const { description, setDescription } = useContext(markerCreateContext) as {
    description: "";
    setDescription: React.Dispatch<React.SetStateAction<string>>;
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <h2 className="text-xl font-semibold ">Description</h2>
      <textarea
        style={{
          minHeight: "150px",
        }}
        placeholder="Enter description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        className="w-full border-2 border-zinc-300 rounded-xl p-3 outline-none font-semibold focus-visible:border-zinc-400 transition-all pr-12"
      />
    </div>
  );
};
