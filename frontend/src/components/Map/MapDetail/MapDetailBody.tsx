import React from "react";
import styles from "./MapDetail.module.scss";

export const MapDetailBody: React.FC<{
  children: React.ReactNode;
  opened: boolean;
}> = ({ children, opened }) => {
  return (
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
        id="map-detail"
        className={`absolute w-full h-screen z-10 pt-16 md:pt-20 ${
          opened ? styles.opened : styles.closed
        }`}
      >
        <div className="w-full h-full px-5 lg:px-20 pt-5 flex justify-center">
          <div className="max-w-7xl w-full h-full bg-zinc-50 shadow-2xl rounded-t-2xl">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
