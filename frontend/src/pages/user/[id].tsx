import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import React from "react";
import { MainContainer } from "../../components/MainContainer";
import { useSession } from "../../hooks/useSession";
import { BiArrowToLeft } from "react-icons/bi";
import { BsArrowLeftShort } from "react-icons/bs";
import { trpc } from "../../utils/trpc";
import { useRouter } from "next/router";
import Link from "next/link";
import { BackToMapButton } from "../../components/UserPage/BackToMapButton";
import Head from "next/head";
import { HiOutlinePencil } from "react-icons/hi";

const UserPage = ({ id }: { id: string }) => {
  const session = useSession();
  const user = trpc.useQuery([
    "user.getOneById",
    {
      id,
    },
  ]);
  const markers = trpc.useQuery([
    "marker.getAllByCreatorId",
    {
      id,
    },
  ]);

  console.log(markers.data);

  if (user.isLoading) return null;
  if (markers.isLoading) return null;

  return (
    <>
      <Head>
        <title>
          Spotty |{" "}
          {user.data?.name === ""
            ? user.data?.email.split("@")[0]
            : user.data?.name}
        </title>
      </Head>
      <MainContainer>
        <div className="w-full h-full flex p-4 bg-zinc-100 px-10 pt-7 gap-20">
          <div className="h-full flex flex-col flex-shrink-0">
            <BackToMapButton />
            <div className="flex justify-start flex-col gap-3 pt-6">
              <img
                src={
                  user.data?.avatarUrl === ""
                    ? "/images/undraw_pic_profile.svg"
                    : user.data?.avatarUrl
                }
                className="rounded-2xl border-2 border-zinc-200 w-full h-full"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                }}
                alt="profile picture"
                draggable={false}
              />
              <h2 className="text-3xl font-bold">
                {user.data?.name === ""
                  ? user.data?.email.split("@")[0]
                  : user.data?.name}
              </h2>
            </div>
            <div className="flex pt-5 items-center gap-3">
              <h2 className="font-bold text-xl">User details</h2>
              <button className="w-10 h-10 p-2 hover:bg-zinc-100 active:bg-zinc-200 transition-all rounded-full flex items-center justify-center">
                <HiOutlinePencil className="w-5 h-5 text-blue-600" />
              </button>
            </div>
            <div className="flex text-zinc-600 justify-start gap-8">
              <div className="flex flex-col gap-3 flex-shrink-0">
                <h2>Email</h2>
                <h2>Total places</h2>
                <h2>Member since</h2>
              </div>
              <div className="flex flex-col gap-3 flex-shrink-0">
                <a
                  href={`mailto:${user.data?.email}`}
                  className="text-blue-600"
                >
                  {user.data?.email}
                </a>
                <h2>Total places</h2>
                <h2>{user.data?.created.split(" ")[0]}</h2>
              </div>
            </div>
          </div>
          <div className="w-full h-full flex">
            <div className="bg-zinc-200 rounded-2xl w-full h-full flex flex-col p-5 gap-5 shadow-xl">
              <h2 className="text-2xl font-semibold">All Spots</h2>
              <div className="w-full h-full flex flex-col">
                {markers.data?.map((marker) => {
                  return (
                    <div className="w-full rounded-lg h-36 bg-zinc-100 shadow-md border-2 border-zinc-200">
                      {marker.id}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
};

export default UserPage;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  return {
    props: {
      id: query.id as string,
    },
  };
};
