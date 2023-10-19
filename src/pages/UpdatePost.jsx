import { useState } from "react";
import { useParams } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import ReactMde from "react-mde";
import Showdown from "showdown";

const UpdatePost = ({ postList, setIsUpdated }) => {
  const { post: postParam } = useParams();
  const post = postList.filter((post) => post.id === postParam)[0];
  
  const [title, setTitle] = useState(post.title);
  const [img, setImg] = useState(post.img || "");
  const [content, setContent] = useState(post.content);
  const [authorName, setAuthorName] = useState(post.author.name);
  const [selectedTab, setSelectedTab] = useState("write");
  let navigate = useNavigate();

  async function updateBlog(img, title, content, id) {
    const docRef = doc(db, "posts", id);
    await setDoc(
      docRef,
      {
        title: title,
        content: content,
        img: img,
        author: {
          id: auth.currentUser.uid,
          name: authorName,
        },
      },
      { merge: true }
    );
    setIsUpdated((p) => !p);
    navigate("/");
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
    <div>
      <div className="text-center p-8 font-bold text-2xl">Update Post</div>
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
            onClick={() => updateBlog(img, title, content, postParam)}
          >
            Update Blog
          </button>
        ) : (
          <button
            className="bg-black text-white font-bold p-2 mt-2 rounded"
            onClick={() => alert("Fill all required fields")}
          >
            Update Blog
          </button>
        )}
      </section>
    </div>
  );
};

export default UpdatePost;
