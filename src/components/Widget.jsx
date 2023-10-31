import { AiFillPlusCircle } from "react-icons/ai";
const Widget = ({ title, color, icon }) => {
  return (
    <div
      className={` h-[100px] rounded-r-md p-4 shadow-xl ${color}  text-white font-semibold text-2xl cursor-pointer border-l-[10px] border-gray-900 flex items-center justify-center gap-3 uppercase `}
    >
      <AiFillPlusCircle />
      <div className="flex items-center justify-end gap-2">
        <span className="hidden lg:block">{title}</span> {icon}
      </div>
    </div>
  );
};

export default Widget;
