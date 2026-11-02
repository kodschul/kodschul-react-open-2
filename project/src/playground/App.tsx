import React from "react";
import MainFloor from "./MainFloor";
import UserControlBar from "./UserControlBar";
import OfficeControlBar from "./OfficeControlBar";

const App = () => {
  return (
    <div className=" bg-gray-200 min-h-screen min-w-screen flex flex-row p-12 space-x-12 ">
      <div className="flex flex-3">
        <MainFloor />
      </div>

      <div className="flex flex-1 flex-col space-y-4">
        <UserControlBar />
        <OfficeControlBar />
      </div>
    </div>
  );
};

export default App;
