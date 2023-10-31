import { useState } from "react";
import { useParams } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import ReactMde from "react-mde";
import Showdown from "showdown";
import Layout from "../Layouts/Layout";
const UpdateNews = ({ postList, setIsUpdated, authorList }) => {
  const { post: postParam } = useParams();
  const post = postList.filter((post) => post.id === postParam)[0];

  const [title, setTitle] = useState(post.title);
  const [img, setImg] = useState(post.img);
  const [tags, setTags] = useState(post.tags);
  const [content, setContent] = useState(post.content);
  const [authorName, setAuthorName] = useState(post.author.name);
  const [selectedTab, setSelectedTab] = useState("write");
  let navigate = useNavigate();

  //date
  const currentDate = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  async function updateNews(id) {
    const docRef = doc(db, "posts", id);
    await setDoc(
      docRef,
      {
        title: title,
        content: content,
        img: img,
        date: formattedDate,
        tags: tags.replace(/\s/g, ""),
        author: {
          id: id,
          name: authorName,
        },
      },
      { merge: true }
    );
    setIsUpdated((prev) => !prev);
    navigate("/news");
    console.log("post updated");
  }

  function updateNote(text) {
    setContent(text);
  }

  const converter = new Showdown.Converter({
    tables: true,
    simplifiedAutoLink: true,
    strikethrough: true,
    tasklists: true,
  });
  return (
    <Layout>
      <div className="text-gray-900  border-gray-900 mt-6 rounded">
        <div className="text-center p-4 font-bold text-3xl text-red-600 underline uppercase">
          Update News
        </div>
        <br />
        <section className="p-8 pt-0">
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
            {authorList.map((data) => (
              <>
                <option value={data.fullName}>{data.fullName}</option>
              </>
            ))}
          </select>
          <label className="font-bold mb-2 text-xl">Body</label>

          <div id="markdown" className="mb-5">
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
              className="bg-gray-700 w-full text-white font-bold p-2 mt-2 rounded"
              onClick={() => updateNews(postParam)}
            >
              Update News
            </button>
          ) : (
            <button
              className="bg-gray-700 w-full text-white font-bold p-2 mt-2 rounded"
              onClick={() => alert("Fill all required fields")}
            >
              Update News
            </button>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default UpdateNews;
