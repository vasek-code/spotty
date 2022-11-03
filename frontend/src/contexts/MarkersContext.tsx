import React, { createContext, useEffect } from "react";
import { trpc } from "../utils/trpc";
import Pocketbase from "pocketbase";
import { env } from "../env/client.mjs";
import { MarkerRecordType } from "../types/MarkerRecordType";

export const markersContext = createContext<{
  markers: MarkerRecordType[] | undefined;
  refetch: () => void;
} | null>(null);

export const MarkersProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const markersQuery = trpc.useQuery(["marker.getAll"]);

  useEffect(() => {
    const client = new Pocketbase(env.NEXT_PUBLIC_POCKETBASE_URL);

    client.realtime.subscribe("markers", () => {
      markersQuery.refetch();
    });

    return () => {
      client.realtime.unsubscribe("markers");
    };
  }, [markersQuery]);

  return (
    <markersContext.Provider
      value={{ markers: markersQuery.data, refetch: markersQuery.refetch }}
    >
      {children}
    </markersContext.Provider>
  );
};
