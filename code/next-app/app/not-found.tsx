import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-screen items-center flex flex-col justify-center bg-indigo-300">
      <Link href="/">
        <h1 className="text-5xl text-indigo-700">Oops! Not Found</h1>
        <h3 className="text-indigo-950">Please go to main</h3>
      </Link>
    </div>
  );
};

export default NotFoundPage;
