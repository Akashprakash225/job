import React from "react";

export const ErrorPage = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-96 ">
      <h1>404 Page Not Found!</h1>
      <Link to={"/"}>Go To Home</Link>
    </div>
  );
};
