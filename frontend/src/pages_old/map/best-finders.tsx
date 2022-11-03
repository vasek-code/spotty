import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { BestFindersFinder } from "../../components/BestFinders/BestFindersFinder";
import CloseMenuButton from "../../components/CloseMenuButton";

import styles from "../../components/Map/MapDetail/MapDetail.module.scss";
import { MapDetailCommentStars } from "../../components/Map/MapDetail/MapDetailCommentStars";
import { trpc } from "../../utils/trpc";
import Pocketbase from "pocketbase";
import { CommentRecordType } from "../../types/CommentRecordType";
import { MarkerRecordType } from "../../types/MarkerRecordType";

const BestFindersPage: NextPage<{
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
  opened: boolean;
  clicked: boolean;
}> = ({ clicked, opened, setOpened }) => {
  const bestFinders = trpc.useQuery(["user.getBestFinders"], {
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  if (bestFinders.isLoading) return null;

  return (
    <>
      <style>
        {`
          /* width */
          ::-webkit-scrollbar {
            width: 10px;
            border-radius: 1rem;
          }

          /* Track */
          ::-webkit-scrollbar-track {
            background: #fafafa;
            border-radius: 1rem;
          }

          /* Handle */
          ::-webkit-scrollbar-thumb {
            background: #d9d9d9;
            border-radius: 10px;
          }

          /* Handle on hover */
          ::-webkit-scrollbar-thumb:hover {
            background: #cbcbcb;
          }
        `}
      </style>
      <div
        className={`absolute z-10 w-full h-full flex justify-center ${
          opened ? styles.opened : styles.closed
        }`}
      >
        <div className="max-w-7xl w-full pt-28 h-full">
          <div className="w-full h-full bg-zinc-50 rounded-t-2xl overflow-y-scroll">
            <div className="pt-3 pr-3">
              <CloseMenuButton setOpened={setOpened} />
            </div>
            <div className="w-full flex flex-col px-20 pt-5 items-center ">
              <h1 className="font-semibold text-3xl">Top finders</h1>
              <div className="w-full h-1 bg-zinc-200 mt-6"></div>
            </div>
            <div className="w-full flex flex-col px-20 pt-5 gap-4">
              <div className="w-full flex justify-center gap-12 font-medium text-lg">
                <h3>Avatar</h3>
                <h3>Profile Name</h3>
                <h3>Average Stars</h3>
                <h3>Total Places</h3>
                <h3>Best Place</h3>
              </div>
              {bestFinders.data &&
                bestFinders.data.map((finder) => {
                  return (
                    <BestFindersFinder
                      totalPlaces={finder.totalPlaces}
                      id={finder.id}
                      totalStars={finder.totalStars}
                      totalVotes={finder.totalVotes}
                      avatarUrl={finder.avatarUrl}
                      name={finder.name}
                      bestPlace={finder.bestPlace}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestFindersPage;
