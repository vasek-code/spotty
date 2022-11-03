import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

export const MapDetailCommentStars: React.FC<{
  stars: number;
  view?: boolean;
  setStars?: React.Dispatch<React.SetStateAction<number>>;
}> = ({ stars, view, setStars }) => {
  const [currentStar, setCurrentStar] = useState(stars ?? 1);

  return (
    <div className="flex">
      {currentStar > 0 ? (
        <AiFillStar
          color="#f59e0b"
          className={` ${view ? "" : "cursor-pointer"}`}
          size={26}
          onClick={() => {
            if (view) return;

            setCurrentStar(1);

            if (setStars) setStars(1);
          }}
        />
      ) : (
        <AiOutlineStar
          className={` ${view ? "" : "cursor-pointer"}`}
          size={26}
          onClick={() => {
            if (view) return;

            setCurrentStar(1);

            if (setStars) setStars(1);
          }}
        />
      )}

      {currentStar > 1 ? (
        <AiFillStar
          color="#f59e0b"
          className={` ${view ? "" : "cursor-pointer"}`}
          size={26}
          onClick={() => {
            if (view) return;

            setCurrentStar(2);

            if (setStars) setStars(2);
          }}
        />
      ) : (
        <AiOutlineStar
          className={` ${view ? "" : "cursor-pointer"}`}
          size={26}
          onClick={() => {
            if (view) return;

            setCurrentStar(2);

            if (setStars) setStars(2);
          }}
        />
      )}
      {currentStar > 2 ? (
        <AiFillStar
          color="#f59e0b"
          className={` ${view ? "" : "cursor-pointer"}`}
          size={26}
          onClick={() => {
            if (view) return;

            setCurrentStar(3);

            if (setStars) setStars(3);
          }}
        />
      ) : (
        <AiOutlineStar
          className={` ${view ? "" : "cursor-pointer"}`}
          size={26}
          onClick={() => {
            if (view) return;

            setCurrentStar(3);

            if (setStars) setStars(3);
          }}
        />
      )}
      {currentStar > 3 ? (
        <AiFillStar
          color="#f59e0b"
          className={` ${view ? "" : "cursor-pointer"}`}
          size={26}
          onClick={() => {
            if (view) return;

            setCurrentStar(4);

            if (setStars) setStars(4);
          }}
        />
      ) : (
        <AiOutlineStar
          className={` ${view ? "" : "cursor-pointer"}`}
          size={26}
          onClick={() => {
            if (view) return;

            setCurrentStar(4);

            if (setStars) setStars(4);
          }}
        />
      )}
      {currentStar > 4 ? (
        <AiFillStar
          color="#f59e0b"
          className={` ${view ? "" : "cursor-pointer"}`}
          size={26}
          onClick={() => {
            if (view) return;

            setCurrentStar(5);

            if (setStars) setStars(5);
          }}
        />
      ) : (
        <AiOutlineStar
          className={` ${view ? "" : "cursor-pointer"}`}
          size={26}
          onClick={() => {
            if (view) return;

            setCurrentStar(5);

            if (setStars) setStars(5);
          }}
        />
      )}
    </div>
  );
};
