import { auth } from "../firebase-config";
import Markdown from "markdown-to-jsx";
import { Link } from "react-router-dom";

const Home = ({ isAuth, deltePost, postList }) => {
  return (
    <div className=" flex flex-col gap-3 p-3 lg:p-8">
      {postList.length === 0 && (
        <div className="flex items-center justify-center min-h-screen">
          <div
            style={{ borderTopColor: "transparent" }}
            className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin"
          ></div>
          <p className="ml-2">Loading...</p>
        </div>
      )}
      {postList.map((post) => (
        <div key={post.id} className="border border-black p-5 rounded">
          <Link to={`/detail/${post.id}`}>
            <div className="max-w-[400px]">
              {post.img && (
                <img
                  className="object-fit w-full h-full"
                  src={post.img}
                  alt={post.title}
                />
              )}
            </div>
            <h1 className="font-bold text-3xl my-5">Title: {post.title}</h1>
            {/* <div className="max-h-[60vh] overflow-auto pr-5" id="markdown1">
              <Markdown>{post.content}</Markdown>
            </div> */}
            <p className="text-red-500">Likes: {post.likes}</p>
            <p className="text-blue-500 underline">
              Author: {post.author.name}
            </p>
          </Link>
          {isAuth && post.author.id === auth.currentUser.uid && (
            <div className="flex gap-4 mb-5">
              <button
                className="bg-red-600 px-3 py-2 rounded text-white font-semibold "
                onClick={() => deltePost(post.id)}
              >
                Delete
              </button>
              <Link to={`/updatepost/${post.id}`}>
                <button className="px-3 py-2 bg-blue-500 rounded text-white font-semibold">
                  Update
                </button>
              </Link>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Home;
