"use client";

import React, { useRef } from "react";

import { SignInInput } from "../../components/SignIn/SignInInput";
import { env } from "../../env/client.mjs";
import Pocketbase from "pocketbase";

const SignInForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      className="max-w-xl w-full flex flex-col justify-center gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        const client = new Pocketbase(env.NEXT_PUBLIC_POCKETBASE_URL);
        const formData = new FormData(formRef.current as HTMLFormElement);
        
      }}
      ref={formRef}
    >
      <h1 className="font-bold text-4xl mb-5">Sign In with email</h1>
      <SignInInput placeholder="Email" type="email" id="email" name="email" />
      <SignInInput
        placeholder="Password"
        type="password"
        id="password"
        name="password"
      />
      <button
        className="w-full h-12 bg-zinc-100 rounded-lg hover:bg-zinc-200 font-semibold transition-all"
        type="submit"
      >
        Submit
      </button>
      <h2 className="font-bold text-2xl text-zinc-600 my-5">
        or with another service
      </h2>
      <div className="w-full flex gap-3">
        {/* <SignInButton
          onClick={() => {
            authMethods.data?.authProviders.forEach((method, index) => {
              if (method.name === "google") {
                setCookie("provider", authMethods.data.authProviders[index], {
                  domain: "spot-map.ddns.net",
                });

                router.push(
                  method.authUrl + `${env.NEXT_PUBLIC_URL}/api/auth/redirect`
                );
              }
            });
          }}
        >
          <FcGoogle size={25} />
          Google
        </SignInButton> */}
        {/* <SignInButton
          onClick={() => {
            authMethods.data?.authProviders.forEach((method, index) => {
              if (method.name === "facebook") {
                setCookie("provider", authMethods.data.authProviders[index], {
                  domain: "spot-map.ddns.net",
                });

                router.push(
                  method.authUrl + `${env.NEXT_PUBLIC_URL}/api/auth/redirect`
                );
              }
            });
          }}
        >
          <BsFacebook size={25} />
          Facebook
        </SignInButton> */}
      </div>
    </form>
  );
};

export default SignInForm;
