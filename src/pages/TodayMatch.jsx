import { Link } from "react-router-dom";
import Layout from "../Layouts/Layout";
import TableHead from "../components/TableHead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
const TodayMatch = ({ deltePost, todayMatchList }) => {
  const notify = (id) =>
    toast.error(
      <>
        <div className="flex items-center gap-3">
          <small className="text-xs uppercase">Are you sure to delete?</small>
          <button
            className="border text-xs text-white bg-red-600 px-1.5 py-1 rounded"
            onClick={() => deltePost(id, "todayMatch")}
          >
            Delete
          </button>
        </div>
      </>,
      {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      }
    );
  return (
    <Layout>
      <TableHead
        color="rgb(147,51,234)"
        title="Today Match"
        border="border-purple-500 text-purple-500"
        link="/create_today_match"
      />

      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Team A</th>
                <th className="px-4 py-3">Team B</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Staduim</th>
                <th className="px-4 py-3">Live On</th>

                <th className="px-4 py-3">Edit</th>
                <th className="px-4 py-3">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {todayMatchList.length == 0 && (
                <>
                  <tr className=" text-center">
                    <td className="py-8 " colSpan={9}>
                      No Data
                    </td>
                  </tr>
                </>
              )}
              {todayMatchList.map((post, index) => (
                <>
                  <tr className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400 uppercase">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{post.teamA}</td>
                    <td className="px-4 py-3">{post.teamB}</td>
                    <td className="px-4 py-3">{post.date}</td>
                    <td className="px-4 py-3">{post.time}</td>
                    <td className="px-4 py-3">{post.staduim}</td>
                    <td className="px-4 py-3">
                      {post.liveOn ? post.liveOn : "No Live"}
                    </td>

                    <td className="px-4 py-3 text-sm text-center">
                      <Link to={`/update_match/${post.id}`}>
                        <div className="px-2 py-1.5 rounded bg-green-600 text-white">
                          Edit
                        </div>
                      </Link>
                    </td>

                    <td className="px-4 py-3 text-sm text-center cursor-pointer">
                      <div
                        onClick={() => notify(post.id)}
                        className="px-2 py-1.5 rounded bg-red-600 text-white"
                      >
                        Delete
                      </div>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
        <div className="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"></div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Layout>
  );
};
TodayMatch.propTypes = {
  deltePost: PropTypes.func.isRequired,
  todayMatchList: PropTypes.array.isRequired,
};
export default TodayMatch;
