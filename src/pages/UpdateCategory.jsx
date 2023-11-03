import { useEffect, useState } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import PropTypes from "prop-types";
const UpdateCategory = ({ setIsUpdated }) => {
  const { id: categoryParam } = useParams();

  const [categoryName, setCategoryName] = useState(null);
  const [description, setDescription] = useState("");

  let navigate = useNavigate();

  useEffect(() => {
    const docRef = doc(db, "categories", categoryParam);

    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          setCategoryName(data.categoryName);
          setDescription(data.description);
          console.log("data", data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [categoryParam]);

  async function updateCategory(id) {
    const docRef = doc(db, "categories", id);
    await setDoc(
      docRef,
      {
        categoryName: categoryName,
        description: description,
      },
      { merge: true }
    );
    setIsUpdated((prev) => !prev);
    navigate("/category");
    console.log("category updated");
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

  // loading
  if (categoryName === null) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-gray-900  border-gray-900 mt-6 rounded">
        <div className="text-center p-4 font-bold text-3xl text-yellow-400 underline uppercase">
          Update Category
        </div>
        <br />
        <section className="p-8 pt-0">
          <label className="font-bold text-xl">Category Name:</label>
          <input
            type="text"
            placeholder="Title eg(CPL, Laliga, EPL, AFC-Cup,...)"
            className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
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

          {categoryName ? (
            <button
              className="bg-gray-700 w-full  text-white font-bold p-2 mt-2 rounded"
              onClick={() => updateCategory(categoryParam)}
            >
              Update Category
            </button>
          ) : (
            <div>
              <button
                className="bg-gray-700 text-white font-bold p-2 mt-5 rounded w-full"
                onClick={notify}
              >
                Update Category
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
UpdateCategory.propTypes = {
  setIsUpdated: PropTypes.func.isRequired,
};
export default UpdateCategory;
