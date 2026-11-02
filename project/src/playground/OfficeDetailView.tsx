import React from "react";

type OfficeDetailViewProps = {
  office: {
    title: string;
    number: string;
    work_desks: number;
  };

  onClose: () => void;
};

const OfficeDetailView = ({ office, onClose }: OfficeDetailViewProps) => {
  const officeDesks = Array.from(Array(office.work_desks).keys());

  return (
    <div className="px-10 py-10">
      <div className="text-teal-800 text-2xl font-medium">
        {office.number} / {office.title}
      </div>

      <div className="flex-wrap flex space-y-10 space-x-10 pt-10">
        {officeDesks.map((desk, index) => (
          <OfficeDesk name={"D0" + (index + 1)} />
        ))}
      </div>

      <div
        onClick={onClose}
        className={"mt-10 border-2 px-4 py-2 w-fit text-teal-800"}
      >
        Go back
      </div>
    </div>
  );
};

const OfficeDesk = ({ name }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-200 w-56 h-32 rounded-lg pt-4">
        <div className="bg-gray-100 w-18 h-12 rounded-lg mx-4 border-1 " />
      </div>

      <div className="mt-3">
        <div className="rounded-full border-1 border-teal-800 font-light text-[10px]  px-2 py-2 ">
          {name}
        </div>
        <div className="border-2 border-teal-800 w-full" />
      </div>
    </div>
  );
};

export default OfficeDetailView;
