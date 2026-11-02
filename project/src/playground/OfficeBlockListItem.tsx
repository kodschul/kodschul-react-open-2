type OfficeBlockListItemProps = {
  title: string;
  subtitle: string;
  openOffice: () => void;
};

const OfficeBlockListItem = ({
  title,
  subtitle,
  openOffice,
}: OfficeBlockListItemProps) => {
  return (
    <div
      onClick={openOffice}
      className=" border-1 cursor-pointer hover:bg-[#0c6f6e30] border-teal-800 min-w-36 min-h-24 flex flex-col items-center pt-4 "
    >
      <div className="text-teal-800 font-medium">{title}</div>
      <div className=" text-gray-600  text-sm">{subtitle}</div>
    </div>
  );
};

export default OfficeBlockListItem;
