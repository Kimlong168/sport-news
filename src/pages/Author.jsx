import { Link } from "react-router-dom";
import Layout from "../Layouts/Layout";
import TableHead from "../components/TableHead";
import LinkIcon from "../components/LinkIcon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
const Author = ({ deltePost, authorList }) => {
  const notify = (id) =>
    toast.error(
      <>
        <div className="flex items-center gap-3">
          <small className="text-xs uppercase">Are you sure to delete?</small>
          <button
            className="border text-xs text-white bg-red-600 px-1.5 py-1 rounded"
            onClick={() => deltePost(id, "authors")}
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
        color="rgb(59,130,246)"
        title="Author"
        border="border-blue-400 text-blue-400"
        link="/create_authors"
      />

      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Full Name</th>
                <th className="px-4 py-3">Position</th>
                <th className="px-4 py-3">Bio</th>
                <th className="px-4 py-3">Profile Image</th>
                <th className="px-4 py-3">Links</th>
                <th className="px-4 py-3">View</th>
                <th className="px-4 py-3">Edit</th>
                <th className="px-4 py-3">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {authorList.length == 0 && (
                <>
                  <tr className=" text-center">
                    <td className="py-8 " colSpan={9}>
                      No Data
                    </td>
                  </tr>
                </>
              )}

              {authorList.map((post, index) => (
                <>
                  <tr
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{post.fullName}</td>
                    <td className="px-4 py-3">{post.position}</td>
                    <td className="px-4 py-3">
                      <div className="line-clamp-1 max-w-[100px]">
                        {post.bio}
                      </div>{" "}
                    </td>
                    <td className="px-4 py-3">
                      <img
                        className="w-[40px] h-[40px] rounded-full"
                        src={post.profilePicture}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {post.links.map((link) => (
                          <span key={index}>
                            <LinkIcon url={link.link} title={link.title} />
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-center cursor-pointer">
                      <Link to={`/detail/${post.id}`}>
                        <div className="px-2 py-1.5 rounded bg-yellow-500 text-white cursor-pointer">
                          View
                        </div>
                      </Link>
                    </td>

                    <td className="px-4 py-3 text-sm text-center">
                      <Link to={`/update_author/${post.id}`}>
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
Author.propTypes = {
  deltePost: PropTypes.func.isRequired,
  authorList: PropTypes.array.isRequired,
};
export default Author;
