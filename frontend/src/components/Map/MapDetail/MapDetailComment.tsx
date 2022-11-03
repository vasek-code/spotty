/* eslint-disable @next/next/no-img-element */
import React from "react";
import { CommentRecordType } from "../../../types/CommentRecordType";
import { trpc } from "../../../utils/trpc";
import { MapDetailCommentStars } from "./MapDetailCommentStars";

export const MapDetailComment: React.FC<{
  comment: CommentRecordType;
}> = ({ comment }) => {
  const creator = trpc.useQuery(["user.getOneById", { id: comment.creator }]);

  if (creator.isLoading) return null;

  return (
    <div className="w-full h-full border-2 bg-zinc-100 shadow-md rounded-lg p-5 max-w-2xl flex flex-col mx-auto">
      <div className="flex items-start">
        <img
          className="rounded-full shrink-0 w-11 h-11"
          src={
            creator.data?.avatarUrl === ""
              ? "/images/undraw_pic_profile.svg"
              : creator.data?.avatarUrl
          }
          alt="profile image"
        />

        <div className="ml-6">
          <MapDetailCommentStars stars={parseInt(comment.stars)} view />
          <div
            className="max-w-full overflow-y-scroll mt-5"
            style={{
              maxHeight: "84px",
            }}
          >
            <p className="leading-7 font-normal text-base">{comment.body}</p>
          </div>
          <p className="text-sm mt-5 font-bold">
            {creator.data?.name === ""
              ? creator.data.email.split("@")[0]
              : creator.data?.name}
          </p>
          <p className="text-sm mt-1 font-normal">
            {new Date(comment.created).toDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};
