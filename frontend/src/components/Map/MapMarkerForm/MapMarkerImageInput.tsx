/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useContext, useRef, useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { GrAdd } from "react-icons/gr";
import {
  MarkerContextType,
  markerCreateContext,
} from "../../../contexts/MarkerFormContext";

const MapMarkerImageInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { setFormData } = useContext(markerCreateContext) as MarkerContextType;

  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [currentImage, setCurrentImage] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const formData = new FormData();

      for (const file of e.target.files as FileList) {
        formData.append("images", file);

        const fileReader = new FileReader();
        fileReader.onload = (event) => {
          setImagesUrl((prevState) => [
            ...prevState,
            event.target?.result as string,
          ]);
        };
        fileReader.readAsDataURL(file);
      }

      setFormData(formData);
    },
    [setFormData]
  );

  return (
    <div
      className={`flex flex-col ${
        imagesUrl.length === 0 ? "justify-center" : "justify-between"
      } items-center w-full rounded-2xl border-2 border-zinc-300 p-5`}
      style={{
        minHeight: "600px",
        maxHeight: "600px",
      }}
      ref={containerRef}
    >
      {imagesUrl.length === 0 ? (
        <img
          src="images/undraw_images_re.svg"
          alt="placeholder image"
          className="ml-5"
          style={{
            maxWidth: "300px",
          }}
        />
      ) : (
        <div className="overflow-hidden w-full h-full items-center justify-center grid">
          <div
            className="flex justify-center items-center w-full h-full"
            style={{
              width: "500px",
              gridArea: "1 / 1 / -1 / -1",
            }}
          >
            <img
              src={imagesUrl[currentImage]}
              alt="imported img"
              className="rounded-lg max-h-full"
              style={{
                maxHeight: (containerRef.current?.clientHeight as number) - 100,
              }}
            />
          </div>
          {imagesUrl.length === 1 ? (
            <></>
          ) : (
            <div
              className="w-full flex justify-between px-2"
              style={{
                gridArea: "1 / 1 / -1 / -1",
              }}
            >
              <button
                onClick={() => {
                  if (currentImage === 0) {
                    setCurrentImage(imagesUrl.length - 1);
                    return;
                  }

                  setCurrentImage((prevState) => prevState - 1);
                }}
                className="bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center hover:bg-zinc-200 active:bg-zinc-300 border-2 border-zinc-300 transition-all"
              >
                <BiArrowToLeft color="black" size={20} />
              </button>
              <button
                onClick={() => {
                  if (currentImage === imagesUrl.length - 1) {
                    setCurrentImage(0);
                    return;
                  }

                  setCurrentImage((prevState) => prevState + 1);
                }}
                className="bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center hover:bg-zinc-200 active:bg-zinc-300 border-2 border-zinc-300 transition-all"
              >
                <BiArrowToRight color="black" size={20} />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex w-full items-center justify-center gap-3 pt-5">
        <h2 className="font-semibold text-2xl">Select images</h2>

        <button
          onClick={() => {
            inputRef.current?.click();
          }}
          className="bg-zinc-100 rounded-full w-12 h-12 flex justify-center items-center hover:bg-zinc-200 active:bg-zinc-300 border-2 border-zinc-300 transition-all"
        >
          <GrAdd size={15} />
        </button>

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden absolute w-full h-full"
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default MapMarkerImageInput;
