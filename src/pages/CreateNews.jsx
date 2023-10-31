import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import ReactMde from "react-mde";
import Showdown from "showdown";
import Layout from "../Layouts/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from 'prop-types';
import WidgetGroup from "../components/WidgetGroup";
const CreateNews = ({ setIsUpdated, authorList }) => {

  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [tags, setTags] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState(authorList[0].fullName);
  const [selectedTab, setSelectedTab] = useState("write");
  const postCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  //date
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const createNews = () => {
    addDoc(postCollectionRef, {
      title: title,
      content: content,
      img: img,
      date: formattedDate,
      tags: tags.replace(/\s/g, ""),
      author: {
        id: auth.currentUser.uid,
        name: authorName,
      },
    });
    setIsUpdated((prev) => !prev);
    navigate("/news");
    console.log("news added");
  };

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });

  function updateNote(text) {
    setContent(text);
  }

  const notify = () =>
    toast.error("Fill all required fields!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  return (
    <Layout>
      <WidgetGroup />
      <div className="text-gray-900  border-gray-900 mt-6 rounded">
        <div className="text-center p-4 font-bold text-3xl text-red-600 underline uppercase">
          Create News
        </div>
        <br />
        <section className="p-8">
          <label className="font-bold mb-2 text-xl">Title</label>
          <input
            type="text"
            placeholder="Title"
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label className="font-bold mb-2 text-xl">Cover Image</label>
          <input
            type="text"
            placeholder="image (optional)"
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
          <label className="font-bold mb-2 text-xl">Tag</label>
          <input
            type="text"
            placeholder="Tag (optional) (eg: technology,study,..)"
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {/* <label className="font-bold mb-2 text-xl">Author name</label>
          <input
            type="text"
            placeholder="author name (optional))"
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          /> */}
          <label className="font-bold mb-2 text-xl">Author name</label>
          <select
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          >
            {authorList.map((data, index) => (
              <>
                <option value={data.fullName}>{data.fullName}</option>
              </>
            ))}
          </select>
          <label className="font-bold mb-2 text-xl">Body</label>

          <div id="markdown">
            <ReactMde
              value={content}
              onChange={updateNote}
              selectedTab={selectedTab}
              onTabChange={setSelectedTab}
              generateMarkdownPreview={(markdown) =>
                Promise.resolve(converter.makeHtml(markdown))
              }
              minEditorHeight={70}
              heightUnits="vh"
            />
          </div>
          {title && content ? (
            <button
              className="bg-gray-700 text-white font-bold p-2 mt-2 rounded w-full"
              onClick={createNews}
            >
              Create News
            </button>
          ) : (
            <div>
              <button
                className="bg-gray-700 text-white font-bold p-2 mt-5 rounded w-full"
                onClick={notify}
              >
                Create News
              </button>
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
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};
CreateNews.propTypes = {
  authorList: PropTypes.array.isRequired, 
  setIsUpdated: PropTypes.func.isRequired,
};
export default CreateNews;
