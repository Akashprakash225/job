import React from "react";
import Search from "../components/Search";

const Home = () => {
  return (
    <div className="">
      <main className="min-h-96">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl py-8 font-bold">
            Discover your perfect career today
          </h1>
        </div>
        <Search />
      </main>
    </div>
  );
};

export default Home;
