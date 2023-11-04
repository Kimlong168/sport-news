import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Layout from "../Layouts/Layout";
import WidgetGroup from "../components/WidgetGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsTrash } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";

const CreateAuthor = ({ setIsUpdated }) => {
  const [fullName, setfullName] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [bio, setBio] = useState("");
  const [position, setPosition] = useState("");
  const [links, setLinks] = useState([
    {
      title: "",
      url: "",
    },
  ]);

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

  const submitForm = () => {
    if (
      fullName === "" ||
      bio === "" ||
      position === "" ||
      links.length === 0 ||
      profilePicture === null
    ) {
      notify();
      // alert("please fill the the required information to create link tree");
    } else {
      // You can process the form data here (e.g., send it to a server)
      console.log({
        fullName,
        profilePicture,
        bio,
        position,
        links,
      });

      const fullNameNoSpaces = fullName.replace(/\s+/g, "");
      const timestamp = new Date().getTime();

      // Concatenate full name and timestamp to create the ID
      const generatedID = `${fullNameNoSpaces}_${timestamp}`;

      const imageRef = ref(storage, `authorImages/${generatedID}`);
      uploadBytes(imageRef, profilePicture).then(() => {
        // Get the download URL for the uploaded image
        getDownloadURL(imageRef)
          .then((downloadURL) => {
            console.log("Download URL:", downloadURL);
            //store author and image to firestore
            createAuthor(generatedID, downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
        console.log("image uploaded");
      });

      navigate(`/authors`);
    }
  };

  let navigate = useNavigate();
  const postCollectionRef = collection(db, "authors");

  const createAuthor = (generatedID, downloadURL) => {
    addDoc(postCollectionRef, {
      fullName: fullName,
      profilePicture: downloadURL,
      bio: bio,
      position: position,
      links: links,
      authorId: generatedID,
    });

    setIsUpdated((prev) => !prev);

    console.log("author added", fullName);
  };

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
      <div className="text-gray-900  border-gray-700 mt-6 rounded">
        <div className="text-center p-4 font-bold text-3xl text-blue-400 underline uppercase">
          Create Author
        </div>
        <br />
        <div className="bg-errorPage bg-no-repeat bg-cover bg-fixed bg-bottom  ">
          <div className="w-full flex flex-col  border border-white/50 rounded-3xl ">
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
              <button
                className="uppercase text-sm text-green-600 flex items-center gap-2"
                onClick={addLink}
              >
                Add Link
                <IoMdAddCircleOutline color="green" size="20" />
              </button>
            </h2>
            <div className="flex flex-col gap-1">
              {links.map((link, index) => (
                <div key={index} className="flex items-center gap-4 mb-3">
                  <input
                    className="border border-gray-700 p-2 rounded w-full outline-none "
                    type="text"
                    placeholder="Link title eg(Facebook,Tiktok,...)"
                    value={link.title}
                    onChange={(e) =>
                      handleLinkChange(index, "title", e.target.value)
                    }
                  />
                  <input
                    className="border border-gray-700 p-2 rounded w-full outline-none "
                    type="text"
                    placeholder="URL"
                    value={link.url}
                    onChange={(e) =>
                      handleLinkChange(index, "url", e.target.value)
                    }
                  />
                  {links.length > 1 && (
                    <button
                      className="grid place-items-center"
                      title="remove link"
                      onClick={() => removeLink(index)}
                    >
                      <BsTrash color="red" size="20" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              className="bg-gray-700 text-white font-bold p-2 mt-2 rounded"
              onClick={submitForm}
            >
              Create Author
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
        </div>
      </div>
    </Layout>
  );
};
CreateAuthor.propTypes = {
  setIsUpdated: PropTypes.func.isRequired,
};
export default CreateAuthor;
