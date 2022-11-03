import React from "react";
import { trpc } from "../../utils/trpc";
import { MapDetailCommentStars } from "../Map/MapDetail/MapDetailCommentStars";
import StarRatings from "react-star-ratings";
import Link from "next/link";

export const BestFindersFinder: React.FC<{
  id: string;
  totalVotes: number;
  totalStars: number;
  name: string;
  avatarUrl: string;
  totalPlaces: number;
  bestPlace: {
    id: string;
    title: string;
  };
}> = ({
  id,
  totalStars,
  totalVotes,
  name,
  avatarUrl,
  totalPlaces,
  bestPlace,
}) => {
  return (
    <div className="w-full flex flex-col shrink-0">
      <div className="w-full h-20 bg-zinc-100 rounded-lg border-2 flex justify-center gap-10 items-center px-4">
        <img
          src={avatarUrl}
          alt="profile img"
          style={{
            maxWidth: "60px",
          }}
        />
        <h2 className="font-semibold text-lg">{name}</h2>
        <StarRatings
          rating={totalStars / totalVotes}
          starDimension="25px"
          starSpacing="2px"
          starRatedColor="#f59e0b"
        />
        <h2 className="font-medium text-lg shrink-0">
          Total places: {totalPlaces}
        </h2>
        <Link href={`/map?markerId=${bestPlace.id}`}>
          <a className="font-semibold text-xl shrink-0 cursor-pointer hover:underline">
            {bestPlace.title}
          </a>
        </Link>
      </div>
    </div>
  );
};
