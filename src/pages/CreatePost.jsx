import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import ReactMde from "react-mde";
import Showdown from "showdown";

const CreatePost = ({ setIsUpdated }) => {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [content, setContent] = useState("");
  const [authorName, setAuthorName] = useState(auth.currentUser.displayName);
  const [selectedTab, setSelectedTab] = useState("write");
  const postCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = () => {
    addDoc(postCollectionRef, {
      title: title,
      content: content,
      img: img,
      likes: 0,
      author: {
        id: auth.currentUser.uid,
        name: authorName,
      },
    });
    setIsUpdated((p) => !p);
    navigate("/");
    console.log("post added");
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

  return (
    <div>
      <div className="text-center p-8 font-bold text-2xl">Create Post</div>
      <br />
      <section className="p-8">
        <label className="font-bold mb-2 text-xl">Title</label>
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded w-full outline-none mb-5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="font-bold mb-2 text-xl">Cover Image</label>
        <input
          type="text"
          placeholder="image (optional)"
          className="border p-2 rounded w-full outline-none mb-5"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
        <label className="font-bold mb-2 text-xl">Author name</label>
        <input
          type="text"
          placeholder="author name (optional))"
          className="border p-2 rounded w-full outline-none mb-5"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />
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
            className="bg-black text-white font-bold p-2 mt-2 rounded"
            onClick={createPost}
          >
            Create Post
          </button>
        ) : (
          <button
            className="bg-black text-white font-bold p-2 mt-2 rounded"
            onClick={() => alert("Fill all required fields")}
          >
            Create Post
          </button>
        )}
      </section>
    </div>
  );
};

export default CreatePost;
