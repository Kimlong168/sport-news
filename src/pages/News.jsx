import { Link } from "react-router-dom";
import Layout from "../Layouts/Layout";
import TableHead from "../components/TableHead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
const News = ({ deltePost, postList, authorList, categoryList }) => {
  const notify = (id) =>
    toast.error(
      <>
        <div className="flex items-center gap-3">
          <small className="text-xs uppercase">Are you sure to delete?</small>
          <button
            className="border text-xs text-white bg-red-600 px-1.5 py-1 rounded"
            onClick={() => deltePost(id, "posts")}
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
        color="red"
        title="News"
        border="border-red-600 text-red-600"
        link="/create_news"
      />

      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                <th className="px-4 py-3">No</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Tags</th>
                <th className="px-4 py-3">Author</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Image</th>
                <th className="px-4 py-3">View</th>
                <th className="px-4 py-3">Edit</th>
                <th className="px-4 py-3">Delete</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              {postList.length == 0 && (
                <>
                  <tr className=" text-center">
                    <td className="py-8 " colSpan={10}>
                      No Data
                    </td>
                  </tr>
                </>
              )}

              {postList.map((post, index) => (
                <>
                  <tr
                    key={post.id}
                    className="bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{post.title}</td>
                    <td className="px-4 py-3">
                      {post.tags ? post.tags : "No tags"}
                    </td>
                    <td className="px-4 py-3">
                      {authorList &&
                        authorList.map((data) => {
                          if (data.authorId == post.author.id) {
                            return data.fullName;
                          }
                        })}
                    </td>
                    <td className="px-4 py-3">
                      {categoryList &&
                        categoryList.map((data) => {
                          if (data.id == post.categoryId) {
                            return data.categoryName;
                          }
                        })}
                    </td>
                    <td className="px-4 py-3">{post.date}</td>
                    <td className="px-4 py-3">
                      {post.img ? (
                        <img
                          className="min-w-[70px] h-[50px] rounded-sm"
                          src={post.img}
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-center cursor-pointer">
                      <Link to={`/news_detail/${post.id}`}>
                        <div className="px-2 py-1.5 rounded bg-yellow-500 text-white cursor-pointer">
                          View
                        </div>
                      </Link>
                    </td>

                    <td className="px-4 py-3 text-sm text-center">
                      <Link to={`/update_news/${post.id}`}>
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
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Layout>
  );
};
News.propTypes = {
  deltePost: PropTypes.func.isRequired,
  postList: PropTypes.array.isRequired,
  authorList: PropTypes.array.isRequired,
  categoryList: PropTypes.array.isRequired,
};
export default News;
