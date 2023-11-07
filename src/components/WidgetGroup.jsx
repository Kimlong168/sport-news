import Widget from "../components/Widget";
import { BiNews, BiFootball, BiCategoryAlt } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { PiBellRingingBold } from "react-icons/pi";
import { PiClubBold } from "react-icons/pi";
import { TbTopologyFull } from "react-icons/tb";
import { Link } from "react-router-dom";

const WidgetGroup = () => {
  return (
    <div className="grid auto-rows-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
      <Link to="/create_news">
        <Widget title="News" color="bg-red-600" icon={<BiNews />} />
      </Link>
      <Link to="/create_authors">
        <Widget title="Authors" color="bg-blue-500" icon={<FiUsers />} />
      </Link>

      <Link to="/create_result">
        <Widget title="Result" color="bg-green-500" icon={<BiFootball />} />
      </Link>
      <Link to="/create_today_match">
        <Widget
          title="Today Match"
          color="bg-purple-600"
          icon={<PiBellRingingBold />}
        />
      </Link>
      <Link to="/create_category">
        <Widget
          title="Category"
          color="bg-yellow-400"
          icon={<BiCategoryAlt />}
        />
      </Link>
      <Link to="/create_club">
        <Widget title="Club" color="bg-pink-500" icon={<PiClubBold />} />
      </Link>

      <Link to="/create_group">
        <Widget title="Group" color="bg-gray-400" icon={<TbTopologyFull />} />
      </Link>
    </div>
  );
};

export default WidgetGroup;
