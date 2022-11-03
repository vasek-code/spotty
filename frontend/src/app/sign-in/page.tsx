import React from "react";

import { MainContainer } from "../../components/MainContainer";
import SignInForm from "./SignInForm";

const SignInPage = () => {
  return (
    <MainContainer>
      <div className="w-full h-full px-5 flex bg-zinc-50 flex-col lg:flex-row">
        <div className="w-full h-full flex  justify-center items-center">
          <SignInForm />
        </div>
        <div className="flex justify-center items-center w-full p-10">
          <img
            src="/images/undraw-map.svg"
            alt="map image"
            className="w-96"
            draggable={false}
          />
        </div>
      </div>
    </MainContainer>
  );
};

export default SignInPage;
