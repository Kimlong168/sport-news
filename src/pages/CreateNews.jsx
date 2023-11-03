import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import ReactMde from "react-mde";
import Showdown from "showdown";
import Layout from "../Layouts/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import WidgetGroup from "../components/WidgetGroup";
import Loading from "../components/Loading";

const CreateNews = ({ setIsUpdated, authorList, categoryList }) => {
  const author = authorList.map((data) => data.fullName)[0];
  const category = categoryList.map((data) => data.id)[0];
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState(author);
  const [categoryId, setCategoryId] = useState(category);
  const [selectedTab, setSelectedTab] = useState("write");
  const postCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  //date
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const createNews = () => {
    const authorId = authorList.filter((data) => data.fullName == authorName)[0]
      .authorId;
    addDoc(postCollectionRef, {
      title: title,
      description: description,
      content: content,
      img: img,
      date: formattedDate,
      tags: tags.replace(/\s/g, ""),
      categoryId: categoryId,
      author: {
        id: authorId,
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

  if (!authorList || !categoryList) {
    return (
      <>
        <Loading />
      </>
    );
  }
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
          <label className="font-bold mb-2 text-xl">Description</label>
          <input
            type="text"
            placeholder="Description"
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

          <label className="font-bold mb-2 text-xl">Category</label>
          <select
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5 cursor-pointer"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categoryList.map((data) => (
              <>
                <option value={data.id}>{data.categoryName}</option>
              </>
            ))}
          </select>

          <label className="font-bold mb-2 text-xl">Author name</label>
          <select
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5 cursor-pointer"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          >
            {authorList.map((data) => (
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
          {title && content && description && categoryId && img ? (
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
  categoryList: PropTypes.array.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
export default CreateNews;
