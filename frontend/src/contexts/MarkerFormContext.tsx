import Pocketbase from "pocketbase";
import React, { createContext, useCallback, useState } from "react";
import { trpc } from "../utils/trpc";
import { env } from "../env/client.mjs";
import { useSession } from "../hooks/useSession";
// import { useSession } from "../hooks/useSession";

export interface ImageType {
  lastModified: number;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
}

export interface MarkerContextType {
  hashtags: string[];
  setHashtags: React.Dispatch<React.SetStateAction<string[]>>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const markerCreateContext = createContext<MarkerContextType | null>(
  null
);

export const MarkerCreateProvider: React.FC<{
  children: React.ReactNode;
  lat: number;
  lng: number;
  closeForm: () => void;
}> = ({ children, lat, lng, closeForm }) => {
  const [hashtags, setHashtags] = useState<string[]>(["#"]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { data, loading } = useSession();

  const onSubmit = useCallback(async () => {
    // await markerCreateMutation.mutateAsync({
    //   hashtags,
    //   lat,
    //   lng,
    //   title,
    //   description,
    //   images: images.id,
    // });
  }, []);

  return (
    <markerCreateContext.Provider
      value={{
        hashtags: hashtags,
        setHashtags: setHashtags,
        title,
        setTitle,
        description,
        setDescription,
        onSubmit,
        setImages,
        images,
      }}
    >
      {children}
    </markerCreateContext.Provider>
  );
};
