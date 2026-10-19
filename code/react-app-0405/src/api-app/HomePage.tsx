import React from "react";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="text-black min-h-screen flex-1 flex-col flex w-full items-center justify-center">
      <div> Welcome to Router App</div>

      <div className="grid grid-cols-3 gap-x-2">
        <Link
          to="/use-effect"
          className="bg-amber-400 px-10 py-20 font-bold text-2xl"
        >
          Use Effect App
        </Link>

        <Link
          to="/characters"
          className="bg-amber-400 px-10 py-20 font-bold text-2xl"
        >
          Characters App
        </Link>

        <Link
          to="/counter"
          className="bg-amber-400 px-10 py-20 font-bold text-2xl"
        >
          State App
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
