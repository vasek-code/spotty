import Pocketbase from "pocketbase";
import React, { createContext, useCallback, useState } from "react";
import { trpc } from "../utils/trpc";
import { env } from "../env/client.mjs";
import { useSession } from "../hooks/useSession";

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
  formData: FormData | null;
  setFormData: React.Dispatch<React.SetStateAction<FormData | null>>;
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
  const [formData, setFormData] = useState<FormData | null>(null);
  const { data, loading } = useSession();
  const markerCreateMutation = trpc.useMutation(["marker.create"], {
    onSuccess: () => {
      closeForm();
      setTitle("");
      setHashtags(["#"]);
      setDescription("");
      setFormData(new FormData());
    },
  });

  const onSubmit = useCallback(async () => {
    if (loading) return;

    const client = new Pocketbase(env.NEXT_PUBLIC_POCKETBASE_URL);

    formData?.append("owner", data?.id as string);

    const images = await client.records.create("images", formData as FormData);

    await markerCreateMutation.mutateAsync({
      hashtags,
      lat,
      lng,
      title,
      description,
      images: images.id,
    });
  }, [
    data?.id,
    description,
    formData,
    hashtags,
    lat,
    lng,
    loading,
    markerCreateMutation,
    title,
  ]);

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
        formData,
        setFormData,
      }}
    >
      {children}
    </markerCreateContext.Provider>
  );
};
