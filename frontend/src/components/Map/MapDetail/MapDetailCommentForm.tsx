/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { trpc } from "../../../utils/trpc";
import { MapDetailCommentStars } from "./MapDetailCommentStars";

const MapDetailCommentForm: React.FC<{
  markerId: string;
  refetch: () => void;
}> = ({ markerId, refetch }) => {
  const commentCreateMutation = trpc.useMutation(["comment.create"]);

  const [text, setText] = useState("");
  const [stars, setStars] = useState(1);

  return (
    <div className="w-full h-full border-2 bg-zinc-100 shadow-md rounded-lg p-5 max-w-2xl flex flex-col mx-auto justify-center">
      <div className="flex w-full flex-col gap-3">
        <h3 className="font-semibold text-xl">Create comment</h3>
        <textarea
          className="rounded-lg h-20 bg-zinc-200 outline-none p-2 border-2 border-zinc-300 text-base"
          style={{
            resize: "none",
          }}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <div className="flex w-full justify-between items-center">
          <MapDetailCommentStars stars={1} setStars={setStars} />
          <button
            onClick={async () => {
              await commentCreateMutation.mutateAsync({
                body: text,
                markerId,
                stars,
              });

              refetch();
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-full border-2 border-zinc-300 hover:bg-blue-600 transition-all"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapDetailCommentForm;
