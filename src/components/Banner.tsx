import * as React from "react";
import { Image } from "@yext/pages-components";

export interface BannerProps {
  name?: string;
  paragraph?: string;
  photoGallery?: any;
  mode?: string; // Add a prop for mode
}

const Banner = ({ name, photoGallery, mode }: BannerProps) => {
  let token;
  let welcomeMessage = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";

  if (mode === 'development') {
    // Local development code
    console.log("Local development");
    token = {
      name: "Local Dev User"
    };
    welcomeMessage = `Welcome, ${token.name}!`;
  } else {
    // Check for a token on the window
    token = window?.YEXT_TOKENS?.SITE_SEARCH?.token;
    if (token) {
      welcomeMessage = `Welcome, ${token.given_name}!`;
    }
  }

  return (
    <>
      {photoGallery ? (
        <div className="relative bg-gray-800 h-96">
          <Image image={photoGallery[0]} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-normal text-white sm:text-6xl">{name}</h1>
            <p className="mt-6 text-xl leading-8 text-gray-100 tracking-wide">
              {welcomeMessage}
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">{name}</h2>
            <p className="mt-6 text-xl leading-8 text-gray-300">
              {welcomeMessage}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Banner;
