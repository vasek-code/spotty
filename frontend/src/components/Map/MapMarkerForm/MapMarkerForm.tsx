/* eslint-disable @next/next/no-img-element */
import React from "react";
import ReactDOM from "react-dom";
import { GrFormClose } from "react-icons/gr";
import styles from "./MapMarkerForm.module.scss";
import MapMarkerAddButton from "./MapMarkerAddButton";
import MapMarkerFormTitle from "./MapMarkerFormTitle";
import MapMarkerHashtagInputBody from "./MapMarkerHashtagInputBody";
import { MapMarkerDescriptionArea } from "./MapMarkerDescriptionArea";
import MapMarkerFormSubmit from "./MapMarkerFormSubmit";
import MapMarkerImageInput from "./MapMarkerImageInput";
import CloseMenuButton from "../../CloseMenuButton";

const MarkerCreateForm: React.FC<{
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  opened: boolean;
  clicked: boolean;
}> = ({ setOpened, opened, clicked }) => {
  if (!clicked) return null;

  return ReactDOM.createPortal(
    <>
      <style>
        {`
          /* width */
          ::-webkit-scrollbar {
            width: 10px;
            border-radius: 1rem;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            background: #fafafa;
            border-radius: 1rem;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #d9d9d9;
            border-radius: 10px;
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #cbcbcb;
          }
        `}
      </style>

      <div
        className={`flex absolute w-full h-full pt-16 md:pt-20 z-10 ${
          opened ? styles.opened : styles.closed
        }`}
        onContextMenu={(e) => {
          e.preventDefault();
        }}
      >
        <div className="w-full h-full p-20 flex">
          <div
            className="max-w-7xl w-full bg-zinc-50 mx-auto rounded-2xl p-3 shadow-2xl flex-col overflow-y-scroll"
            style={{
              minHeight: "700px",
            }}
          >
            <CloseMenuButton setOpened={setOpened} />
            <div className="flex w-full pt-10 px-10 flex-col gap-5">
              <h2 className="font-semibold text-3xl">Create marker</h2>
              <div className="w-full border-2"></div>
            </div>
            <div className="w-full flex gap-10 px-9 pt-5 md:flex-row flex-col-reverse">
              <div className="w-full flex flex-col gap-5">
                <MapMarkerImageInput />
                <div className="flex md:hidden pb-3">
                  <MapMarkerFormSubmit />
                </div>
              </div>
              <div className="w-full flex flex-col gap-5">
                <MapMarkerFormTitle />
                <MapMarkerDescriptionArea />
                <div className="w-full flex flex-col gap-3">
                  <h2 className="text-xl font-semibold ">Hashtags</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-2 w-full gap-3">
                    <MapMarkerHashtagInputBody />
                    <MapMarkerAddButton />
                  </div>
                </div>
                <div className="hidden md:flex">
                  <MapMarkerFormSubmit />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.querySelector("#__next") as Element
  );
};

export default MarkerCreateForm;
