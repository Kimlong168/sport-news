import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import WidgetGroup from "../components/WidgetGroup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import PropTypes from "prop-types";

const CreateCategory = ({ setIsUpdated }) => {
  const [categoryName, setCategoryName] = useState(null);
  const [description, setDescription] = useState("");

  let navigate = useNavigate();
  const postCollectionRef = collection(db, "categories");

  const createCategory = () => {
    addDoc(postCollectionRef, {
      categoryName: categoryName,
      description: description,
    });
    console.log("category created!", categoryName);
    setIsUpdated((prev) => !prev);
    navigate("/category");
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
        <div className="text-center p-4 font-bold text-3xl text-yellow-400 underline uppercase">
          Create Category
        </div>
        <br />
        <div className="bg-errorPage bg-no-repeat bg-cover bg-fixed bg-bottom  ">
          <div className="w-full flex flex-col  border border-white/50 rounded-3xl ">
            <label className="font-bold text-xl">Category Name:</label>
            <input
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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

            {categoryName !== null ? (
              <button
                className="bg-gray-700 text-white font-bold p-2 mt-2 rounded"
                onClick={createCategory}
              >
                Create Category
              </button>
            ) : (
              <button
                className="bg-gray-700 text-white font-bold p-2 mt-2 rounded"
                onClick={notify}
              >
                Create Category
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
CreateCategory.propTypes = {
  setIsUpdated: PropTypes.func.isRequired,
};
export default CreateCategory;
