import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import MapPage from "../pages/map";
import BestFindersPage from "../pages/map/best-finders";

export const MapWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [opened, setOpened] = useState(true);
  const [clicked, setClicked] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (!opened) {
      setTimeout(() => {
        router.push("/map");

        setTimeout(() => {
          setOpened(true);
        }, 300);
      }, 500);
    }
  }, [opened]);

  return (
    <>
      {router.pathname === "/map/best-finders" && (
        <>
          {clicked && (
            <BestFindersPage
              setOpened={setOpened}
              opened={opened}
              clicked={clicked}
            />
          )}
        </>
      )}
      <MapPage />
    </>
  );
};
