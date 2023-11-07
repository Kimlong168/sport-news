import { Link } from "react-router-dom";
import Layout from "../Layouts/Layout";
import TableHead from "../components/TableHead";
// import LinkIcon from "../components/LinkIcon";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { storage } from "../firebase-config";
import { deleteObject, ref } from "firebase/storage";
const club = ({ deltePost, clubList, groupList }) => {
  const notify = (id, clubId) =>
    toast.error(
      <>
        <div className="flex items-center gap-3">
          <small className="text-xs uppercase">Are you sure to delete?</small>
          <button
            className="border text-xs text-white bg-red-600 px-1.5 py-1 rounded"
            onClick={() => {
              deltePost(id, "clubs");
              deleteImageFromStorage(clubId);
            }}
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

  const deleteImageFromStorage = (id) => {
    // Create a reference to the image you want to delete
    const imageRef = ref(storage, `clubImages/${id}`);

    // Delete the old image
    deleteObject(imageRef)
      .then(() => {
        console.log("Image deleted successfully");
      })
      .catch((error) => {
        console.error("Error deleting image:", error);
      });
  };
  return (
    <Layout>
      <TableHead
        color="rgb(236,72,153)"
        title="club"
        border="border-pink-500 text-pink-500"
        link="/create_club"
      />

      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Club </th>
                <th className="px-4 py-3">Abbreviation </th>
                <th className="px-4 py-3">Logo</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Group</th>
                <th className="px-4 py-3">Played</th>
                <th className="px-4 py-3">Won</th>
                <th className="px-4 py-3">Drawn</th>
                <th className="px-4 py-3">Lost</th>
                <th className="px-4 py-3">GF</th>
                <th className="px-4 py-3">GA</th>
                <th className="px-4 py-3">GD</th>
                <th className="px-4 py-3">Point</th>
                <th className="px-4 py-3">Form</th>
                <th className="px-4 py-3">Next</th>
                <th className="px-4 py-3">Edit</th>
                <th className="px-4 py-3">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {clubList.length == 0 && (
                <>
                  <tr className=" text-center">
                    <td className="py-8 " colSpan={18}>
                      No Data
                    </td>
                  </tr>
                </>
              )}

              {clubList.map((post, index) => (
                <>
                  <tr
                    key={index}
                    className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{post.clubName}</td>
                    <td className="px-4 py-3">{post.shortName}</td>
                    <td className="px-4 py-3">
                      <div className="w-[40px] h-[40px]">
                        <img
                          className="w-full h-full cover rounded-full"
                          src={post.logo}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="line-clamp-1 break-all hover:line-clamp-none max-w-[300px] cursor-pointer transition-all transition-delay-300">
                        {post.description}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      {groupList &&
                        groupList.map((group) => {
                          if (group.id == post.group) {
                            return group.groupName;
                          }
                        })}
                    </td>
                    <td className="px-4 py-3">{post.numMatch}</td>
                    <td className="px-4 py-3">{post.numWin}</td>
                    <td className="px-4 py-3">{post.numDraw}</td>
                    <td className="px-4 py-3">{post.numWin - post.numDraw}</td>
                    <td className="px-4 py-3">{post.numGA}</td>
                    <td className="px-4 py-3">{post.numGF}</td>
                    <td className="px-4 py-3">{post.numGA - post.numGF}</td>
                    <td className="px-4 py-3">
                      {post.numWin * 3 + post.numDraw}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {post.form.map((form) => {
                          const bg =
                            form.result == "W"
                              ? "bg-green-600"
                              : form.result == "D"
                              ? "bg-yellow-600"
                              : "bg-red-600";
                          return (
                            <span
                              key={index}
                              className={`px-1.5 text-white rounded ${bg}`}
                            >
                              {form.result}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {clubList.map((club) => {
                        if (club.clubId == post.nextGame) {
                          return (
                            <div key={club.id} className="w-[40px] h-[40px]">
                              <img
                                className="w-full h-full cover rounded-full"
                                src={club.logo}
                              />
                            </div>
                          );
                        }
                      })}
                    </td>

                    <td className="px-4 py-3 text-sm text-center">
                      <Link to={`/update_club/${post.id}`}>
                        <div className="px-2 py-1.5 rounded bg-green-600 text-white">
                          Edit
                        </div>
                      </Link>
                    </td>

                    <td className="px-4 py-3 text-sm text-center cursor-pointer">
                      <div
                        onClick={() => notify(post.id, post.clubId)}
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
club.propTypes = {
  deltePost: PropTypes.func.isRequired,
  clubList: PropTypes.array.isRequired,
  groupList: PropTypes.array.isRequired,
};
export default club;
