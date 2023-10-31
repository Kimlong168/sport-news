import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import WidgetGroup from "../components/WidgetGroup";
import { useParams } from "react-router-dom";

const UpdateAuthor = ({ authorList, setIsUpdated }) => {
  const { id: authorParam } = useParams();
  const author = authorList.filter((post) => post.id === authorParam)[0];

  const [fullName, setfullName] = useState(author.fullName);
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState(author.bio);
  const [position, setPosition] = useState(author.position);
  const [links, setLinks] = useState(author.links);

  const authorId = author.authorId;
  const addLink = () => {
    setLinks([...links, { title: "", url: "" }]);
  };

  const removeLink = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    setLinks(updatedLinks);
  };

  let navigate = useNavigate();

  async function updateAuthor(id) {
    const docRef = doc(db, "authors", id);
    if (profilePicture !== null) {
      // Create a reference to the image you want to delete
      const imageRef = ref(storage, `authorImages/${authorId}`);

      // Delete the old image
      deleteObject(imageRef)
        .then(() => {
          console.log("Image deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
        });

      // store new image
      uploadBytes(imageRef, profilePicture).then(() => {
        // Get the download URL for the uploaded image
        getDownloadURL(imageRef)
          .then((downloadURL) => {
            console.log("Download URL:", downloadURL);

            //store all data and the imageURL to firestore
            store(id, downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
        console.log("image uploaded");
      });
    } else {
      // if the profile picture is not updated
      await setDoc(
        docRef,
        {
          fullName: fullName,
          bio: bio,
          position: position,
          links: links,
        },
        { merge: true }
      );
    }
    setIsUpdated((prev) => !prev);
    navigate("/authors");
    console.log("author updated");
  }

  //if the profile picture is updated
  async function store(id, downloadURL) {
    const docRef = doc(db, "authors", id);
    await setDoc(
      docRef,
      {
        fullName: fullName,
        profilePicture: downloadURL,
        bio: bio,
        position: position,
        links: links,
      },
      { merge: true }
    );
    setIsUpdated((prev) => !prev);
  }

  return (
    <Layout>
      <div className="text-gray-900  border-gray-700 mt-6 rounded">
        <div className="text-center p-4 font-bold text-3xl text-blue-400 underline uppercase">
          Update Author
        </div>

        <div className="bg-errorPage bg-no-repeat bg-cover bg-fixed bg-bottom  ">
          <div className="w-full flex flex-col  border border-white/50 rounded-3xl p-8">
            <label className="font-bold text-xl">Full Name:</label>
            <input
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              type="text"
              value={fullName}
              onChange={(e) => setfullName(e.target.value)}
            />
            <label className="font-bold text-xl">Position:</label>
            <input
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              type="text"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />

            <label className="font-bold text-xl">Profile Picture:</label>
            <input
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              type="file"
              onChange={(e) => setProfilePicture(e.target.files[0])}
            />

            <label className="font-bold text-xl">Bio:</label>
            <textarea
              placeholder="Write something about the author..."
              rows={5}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
            />

            <h2 className="font-bold text-xl flex items-center justify-between mb-2">
              Social Media
              <button onClick={addLink}>➕</button>
            </h2>
            <div className="flex flex-col gap-1">
              {links.map((link, index) => (
                <div key={index} className="flex gap-4">
                  <input
                    className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
                    type="text"
                    placeholder="Link title eg(Facebook,Tiktok,...)"
                    value={link.title}
                    onChange={(e) =>
                      handleLinkChange(index, "title", e.target.value)
                    }
                  />
                  <input
                    className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
                    type="text"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) =>
                      handleLinkChange(index, "url", e.target.value)
                    }
                  />
                  {links.length > 1 && (
                    <button
                      className="text-gradient"
                      title="remove link"
                      onClick={() => removeLink(index)}
                    >
                      ✖️
                    </button>
                  )}
                </div>
              ))}
            </div>
            {fullName && position && links && bio ? (
              <button
                className="bg-gray-700 w-full text-white font-bold p-2 mt-2 rounded"
                onClick={() => updateAuthor(authorParam)}
              >
                Update Author
              </button>
            ) : (
              <button
                className="bg-gray-700 w-full text-white font-bold p-2 mt-2 rounded"
                onClick={() => alert("Fill all required fields")}
              >
                Update Author
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateAuthor;
