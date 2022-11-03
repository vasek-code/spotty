import { useEffect, useState } from "react";
import getCurrentPosition from "../utils/getCurrentPosition";

export const useCurrentPosition = () => {
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    getCurrentPosition().then((pos) => setPosition(pos));
  }, []);

  return position;
};
