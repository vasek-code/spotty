/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { MapDetailBody } from "./MapDetailBody";
import { GrFormClose } from "react-icons/gr";
import { MarkerRecordType } from "../../../types/MarkerRecordType";
import { trpc } from "../../../utils/trpc";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { getImageUrl } from "../../../utils/getImageUrl";
import { AiOutlineStar } from "react-icons/ai";
import { MapDetailComment } from "./MapDetailComment";
import Link from "next/link";
import MapDetailCommentForm from "./MapDetailCommentForm";
import CloseMenuButton from "../../CloseMenuButton";
import { env } from "../../../env/client.mjs";
import Pocketbase from "pocketbase";
import { useRouter } from "next/router";

export const MapDetail: React.FC<{
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  opened: boolean;
  clicked: boolean;
  marker: MarkerRecordType;
}> = ({ setOpened, opened, clicked, marker }) => {
  const creator = trpc.useQuery(["user.getOneById", { id: marker.creator }]);
  const images = trpc.useQuery(["image.getOneById", { id: marker.images }]);
  const comments = trpc.useQuery([
    "comment.getAllPerMarkerId",
    { markerId: marker.id },
  ]);
  const router = useRouter();

  useEffect(() => {
    const client = new Pocketbase(env.NEXT_PUBLIC_POCKETBASE_URL);

    client.realtime.subscribe("comments", () => {
      comments.refetch();
    });

    return () => {
      client.realtime.unsubscribe("comments");
    };
  }, []);

  const [currentImage, setCurrentImage] = useState(0);

  if (creator.status === "loading") return null;

  if (images.status === "loading") return null;

  if (!clicked) return null;

  return ReactDOM.createPortal(
    <>
      <MapDetailBody opened={opened}>
        <div className="w-full h-full grid p-3 overflow-y-scroll">
          <CloseMenuButton
            setOpened={setOpened}
            onClick={() => {
              router.push("/map");
            }}
          />
          <div className="w-full flex flex-col pt-14">
            <div className="w-full flex px-10 flex-col">
              <div className="w-full mb-5 flex justify-between mx-7 items-center border-b-2 py-2">
                <Link href={`/user/${creator.data?.id}`}>
                  <a className="font-semibold text-2xl cursor-pointer">
                    <span className="text-zinc-500 font-light text-xl cursor-default">
                      Creator:{" "}
                    </span>
                    {creator.data?.name === ""
                      ? creator.data.email.split("@")[0]
                      : creator.data?.name}
                  </a>
                </Link>
                <img
                  src={
                    creator.data?.avatarUrl === ""
                      ? "/images/undraw_pic_profile.svg"
                      : creator.data?.avatarUrl
                  }
                  className="w-12 h-12 rounded-full border-2"
                  alt="profile img"
                />
              </div>
              <div className="w-full flex justify-between flex-col-reverse lg:flex-row h-full">
                <div className="h-full flex">
                  <div className="w-full flex mb-auto">
                    <div
                      className="overflow-hidden w-full h-full items-center justify-center"
                      style={{
                        display: "grid",
                      }}
                    >
                      <div
                        className="flex justify-center items-center"
                        style={{
                          width: "500px",
                          gridColumn: "1 / -1",
                          gridRow: "1 / -1",
                        }}
                      >
                        <img
                          src={
                            images.data &&
                            getImageUrl(
                              images.data?.["@collectionId"],
                              images.data?.id,
                              images.data?.images[currentImage] as string
                            )
                          }
                          alt="imported img"
                          className="rounded-lg w-full h-full max-w-full max-h-full"
                        />
                      </div>
                      {images.data?.images.length !== 1 ? (
                        <div
                          className="w-full flex justify-between px-2"
                          style={{
                            gridColumn: "1 / -1",
                            gridRow: "1 / -1",
                          }}
                        >
                          <button
                            onClick={() => {
                              if (currentImage === 0) {
                                setCurrentImage(
                                  (images.data?.images.length as number) - 1
                                );
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
                              if (
                                currentImage ===
                                (images.data?.images.length as number) - 1
                              ) {
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
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="h-full flex flex-col pb-7">
                  <div
                    className="w-full flex flex-col gap-5 rounded-lg border-2 bg-zinc-100 shadow-lg border-zinc-300 p-8"
                    style={{
                      maxWidth: "550px",
                    }}
                  >
                    <h2 className="font-bold text-4xl">{marker.title}</h2>
                    <h3 className="font-semibold text-lg break-words">
                      {marker.description}
                    </h3>
                    <div className="grid w-full grid-cols-2 gap-3">
                      {marker.hashtags.map((hashtag, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-end w-full h-12 relative"
                          >
                            <input
                              className="w-full h-full border-2 border-zinc-300 rounded-full px-5 outline-none font-semibold focus-visible:border-zinc-400 transition-all pr-12"
                              placeholder="#place"
                              value={hashtag}
                              disabled
                            />
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-full flex">
                      <AiOutlineStar size={26} />
                      <AiOutlineStar size={26} />
                      <AiOutlineStar size={26} />
                      <AiOutlineStar size={26} />
                      <AiOutlineStar size={26} />
                      <h3 className="ml-3 font-medium">Total votes: 1000</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex px-20 flex-col gap-10 mt-10 pb-5">
              <h2 className="font-semibold text-3xl">Comments</h2>
              <div className="w-full h-full grid lg:grid-cols-2 grid-cols-1 gap-5">
                <MapDetailCommentForm
                  markerId={marker.id}
                  refetch={comments.refetch}
                />
                {comments.data &&
                  comments.data.map((comment) => {
                    return (
                      <MapDetailComment key={comment.id} comment={comment} />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </MapDetailBody>
    </>,
    document.querySelector("body") as Element
  );
};
