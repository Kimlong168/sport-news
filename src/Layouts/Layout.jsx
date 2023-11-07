import { RxDashboard } from "react-icons/rx";
import { BiNews, BiFootball, BiCategoryAlt } from "react-icons/bi";
import { FiUsers } from "react-icons/fi";
import { PiBellRingingBold, PiClubBold } from "react-icons/pi";
import { TbTopologyFull } from "react-icons/tb";
// import { HiOutlineLogout } from "react-icons/hi";
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { auth } from "../firebase-config";
const Layout = (props) => {
  let displayName = "admin";

  onAuthStateChanged(auth, (user) => {
    if (user) {
      displayName = user.displayName;
    }
  });
  return (
    <div>
      <div className="min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased  text-white">
        <div className="fixed w-full flex items-center justify-between h-14 text-white z-10">
          <div className="flex items-center justify-start md:justify-center pl-3 w-14 md:w-64 h-14 bg-gray-800 border-none">
            <span className="hidden md:block">Hello {displayName}</span>
          </div>
          {/* logout */}
          <div className="flex justify-end items-center h-14 bg-gray-800  header-right w-full pr-5">
            {/* <button
              onClick={signUserOut}
              className="flex justify-center gap-2 items-center"
            >
              Logout <HiOutlineLogout />
            </button> */}
          </div>
        </div>

        <div className="fixed flex flex-col top-14 left-0 w-14 hover:w-64 md:w-64 bg-blue-900 dark:bg-gray-900 h-full text-white transition-all duration-300 border-none z-10 sidebar">
          <div className="overflow-y-auto overflow-x-hidden flex flex-col justify-between flex-grow">
            <ul className="flex flex-col py-4 space-y-1">
              <li className="px-5 hidden md:block">
                <div className="flex flex-row items-center h-8">
                  <div className="text-sm font-light tracking-wide text-gray-400 uppercase">
                    Main
                  </div>
                </div>
              </li>
              <li>
                <Link
                  to="/"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <RxDashboard />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Dashboard
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <BiNews />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    News
                  </span>
                  {/* <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-blue-500 bg-indigo-50 rounded-full">
                  
                  </span> */}
                </Link>
              </li>

              <li>
                <Link
                  to="/authors"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <FiUsers />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Authors
                  </span>
                  {/* <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                    1.2k
                  </span> */}
                </Link>
              </li>
              <li>
                <Link
                  to="/result"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <BiFootball />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Football Result
                  </span>
                  {/* <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                    1.2k
                  </span> */}
                </Link>
              </li>
              <li>
                <Link
                  to="/today_match"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <PiBellRingingBold />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Today Match
                  </span>
                  {/* <span className="hidden md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                    1.2k
                  </span> */}
                </Link>
              </li>
              <li>
                <Link
                  to="/category"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <BiCategoryAlt />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Category
                  </span>
                </Link>
              </li>

              <li>
                <Link
                  to="/club"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <PiClubBold />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Club
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  to="/group"
                  className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-blue-800 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6"
                >
                  <span className="inline-flex justify-center items-center ml-4">
                    <TbTopologyFull />
                  </span>
                  <span className="ml-2 text-sm tracking-wide truncate">
                    Group
                  </span>
                </Link>
              </li>
            </ul>
            <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">
              Copyright @2023
            </p>
          </div>
        </div>

        <div className="h-full ml-14 mt-14 mb-10 md:ml-64 p-2 md:p-4 lg:p-10 pt-5">
          {props.children}
        </div>
      </div>
    </div>
  );
};
Layout.propTypes = {
  children: PropTypes.node,
};
export default Layout;
