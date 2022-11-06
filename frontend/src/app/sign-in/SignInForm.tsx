"use client";

import { useRouter } from "next/router";
import React, { useRef } from "react";

import { SignInInput } from "../../components/SignIn/SignInInput";
import { fetchServer } from "../../utils/fetchServer";
import { getClientToken } from "../../utils/getClientToken";

const SignInForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  return (
    <form
      className="max-w-xl w-full flex flex-col justify-center gap-3"
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current as HTMLFormElement);

        for (const [key, value] of formData.entries()) {
          console.log([key, value]);
          console.log(formData.get("password"));
        }

        const res = await fetchServer("auth/signin", "POST", "", {
          email: formData.get("email"),
          password: formData.get("password"),
        });

        if (res.ok) {
          const data = (await res.json()) as { access_token: string };

          localStorage.setItem("spotty_auth", data.access_token);

          document.cookie = `spotty_auth=${data.access_token}`;
        }
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
