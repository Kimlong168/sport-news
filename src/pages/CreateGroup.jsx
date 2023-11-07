import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import WidgetGroup from "../components/WidgetGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PropTypes from "prop-types";

const CreateGroup = ({ setIsUpdated }) => {
  const [groupName, setgroupName] = useState(null);
  const [description, setDescription] = useState("");

  let navigate = useNavigate();
  const postCollectionRef = collection(db, "groups");

  const createGroup = () => {
    addDoc(postCollectionRef, {
      groupName: groupName,
      description: description,
    });
    console.log("group created!", groupName);
    setIsUpdated((prev) => !prev);
    navigate("/group");
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
        <div className="text-center p-4 font-bold text-3xl text-gray-400 underline uppercase">
          Create Group
        </div>
        <br />
        <div className="bg-errorPage bg-no-repeat bg-cover bg-fixed bg-bottom  ">
          <div className="w-full flex flex-col  border border-white/50 rounded-3xl ">
            <label className="font-bold text-xl">Group Name:</label>
            <input
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              type="text"
              value={groupName}
              onChange={(e) => setgroupName(e.target.value)}
            />
            <label className="font-bold text-xl">Description:</label>
            <textarea
              placeholder="Write something to describe this category or don't write any thing (optional)"
              rows={4}
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {groupName !== null ? (
              <button
                className="bg-gray-700 text-white font-bold p-2 mt-2 rounded"
                onClick={createGroup}
              >
                Create Group
              </button>
            ) : (
              <button
                className="bg-gray-700 text-white font-bold p-2 mt-2 rounded"
                onClick={notify}
              >
                Create Group
              </button>
            )}

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
CreateGroup.propTypes = {
  setIsUpdated: PropTypes.func.isRequired,
};
export default CreateGroup;
