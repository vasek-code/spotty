import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { MainContainer } from "../../components/MainContainer";
import { Map } from "../../components/Map/Map";

const MapPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Spotty | Map</title>
      </Head>
      <MainContainer>
        <Map />
      </MainContainer>
    </>
  );
};

export default MapPage;
