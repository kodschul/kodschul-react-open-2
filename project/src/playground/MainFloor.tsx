import { useState } from "react";
import OfficeBlockListItem from "./OfficeBlockListItem";
import OfficeDetailView from "./OfficeDetailView";

const MainFloor = () => {
  const [offices, setOffices] = useState([
    {
      id: 1,
      number: "III/1",
      title: "Büro",
      status: "occupied",
      work_desks: 4,
      type: "work",
    },
    {
      id: 2,
      number: "III/2",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 3,
      number: "III/3",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 4,
      number: "III/4",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 5,
      number: "III/4a",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 6,
      number: "III/5",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 7,
      number: "III/6",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 8,
      number: "III/7",
      title: "N.N.",
      status: "vacant",
      work_desks: 1,
      type: "work",
    },
    {
      id: 9,
      number: "III/8",
      title: "Pause",
      status: "available",
      work_desks: 0,
      type: "work",
    },
    {
      id: 10,
      number: "III/9",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 11,
      number: "III/10",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 12,
      number: "III/11",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 13,
      number: "III/12",
      title: "Konferenz",
      status: "available",
      work_desks: 0,
      type: "conference",
    },
    {
      id: 14,
      number: "III/13",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 15,
      number: "III/14",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 16,
      number: "III/15",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 17,
      number: "III/16",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 18,
      number: "III/17",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 19,
      number: "III/18",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
    {
      id: 20,
      number: "III/19",
      title: "Büro",
      status: "occupied",
      work_desks: 1,
      type: "work",
    },
  ]);

  const [currentOffice, setCurrentOffice] = useState<any | undefined>(
    offices[0]
  );

  return (
    <div className="bg-white w-full ">
      {currentOffice && (
        <OfficeDetailView
          office={currentOffice}
          onClose={() => setCurrentOffice(undefined)}
        />
      )}

      {!currentOffice && (
        <div className="p-10 flex-wrap flex space-x-10 space-y-4 ">
          {offices.map((office) => (
            <OfficeBlockListItem
              title={office.number}
              subtitle={office.title}
              openOffice={() => setCurrentOffice(office)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainFloor;
