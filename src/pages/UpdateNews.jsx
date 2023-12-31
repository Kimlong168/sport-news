import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import ReactMde from "react-mde";
import Showdown from "showdown";
import Layout from "../Layouts/Layout";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
const UpdateNews = ({ setIsUpdated, authorList, categoryList }) => {
  const { post: postParam } = useParams();

  const [title, setTitle] = useState(null);
  const [img, setImg] = useState("");
  const [tags, setTags] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [selectedTab, setSelectedTab] = useState("write");
  let navigate = useNavigate();

  useEffect(() => {
    const docRef = doc(db, "posts", postParam);

    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          setTitle(data.title);
          setDescription(data.description);
          setImg(data.img);
          setTags(data.tags);
          setContent(data.content);
          setCategoryId(data.categoryId);
          setAuthorName(data.author.name);
          console.log("data", data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [postParam]);

  //date

  async function updateNews(id) {
    const docRef = doc(db, "posts", id);
    const authorId = authorList.filter((data) => data.fullName == authorName)[0]
      .authorId;
    await setDoc(
      docRef,
      {
        title: title,
        description: description,
        content: content,
        img: img,
        categoryId: categoryId,
        tags: tags.replace(/\s/g, ""),
        author: {
          id: authorId,
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

  // loading
  if (title === null) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-gray-900  border-gray-900 mt-6 rounded">
        <div className="text-center p-4 font-bold text-3xl text-red-600 underline uppercase">
          Update News
        </div>
        <br />
        <section className="pt-0">
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
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categoryList.map((data) => (
              <>
                <option key={data.id} value={data.id}>
                  {data.categoryName}
                </option>
              </>
            ))}
          </select>

          <label className="font-bold mb-2 text-xl">Author name</label>
          <select
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
          >
            {authorList.map((data) => (
              <>
                <option key={data.id} value={data.fullName}>
                  {data.fullName}
                </option>
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
UpdateNews.propTypes = {
  authorList: PropTypes.array.isRequired,
  categoryList: PropTypes.array.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
export default UpdateNews;
