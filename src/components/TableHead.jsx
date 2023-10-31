import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
const TableHead = ({ color, title, border, link }) => {
  return (
    <div
      className={`w-full pb-1 border-b-2 ${border} flex items-center justify-between gap-3 mb-3`}
    >
      <small className="text-3xl uppercase font-semibold">
        {title}
      </small>

      <div>
        <Link to={link}>
          <AiOutlinePlusCircle color={color} size={32} />
        </Link>
      </div>
    </div>
  );
};

export default TableHead;
