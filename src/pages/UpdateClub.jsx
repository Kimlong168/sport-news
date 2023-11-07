import { useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { useNavigate, useParams } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Layout from "../Layouts/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BsTrash } from "react-icons/bs";
import { IoMdAddCircleOutline } from "react-icons/io";
import PropTypes from "prop-types";
import { useEffect } from "react";
import Loading from "../components/Loading";

const UpdateClub = ({ setIsUpdated, clubList, groupList }) => {
  const { id: clubParam } = useParams();
  const [clubName, setclubName] = useState(null);
  const [shortName, setShortName] = useState("");
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("");
  const [numMatch, setNumMatch] = useState(0);
  const [numWin, setNumWin] = useState(0);
  const [numDraw, setNumDraw] = useState(0);
  const [numGA, setGA] = useState(0);
  const [numGF, setGF] = useState(0);
  const [nextGame, setNextGame] = useState("");
  const [clubId, setclubId] = useState("");
  const [form, setForm] = useState([]);
  const [clubs, setClubs] = useState([]);

  const addResult = () => {
    if (form.length > 4) {
      alert("You can only add 5 results");
    } else {
      setForm([...form, { result: "W" }]);
    }
  };
  const removeForm = (index) => {
    const updatedForm = form.filter((_, i) => i !== index);
    setForm(updatedForm);
  };

  const handleLinkChange = (index, field, value) => {
    const updatedForm = [...form];
    updatedForm[index][field] = value;
    setForm(updatedForm);
  };

  let navigate = useNavigate();

  // fetch data from firebase based on id
  useEffect(() => {
    const docRef = doc(db, "clubs", clubParam);

    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setclubName(data.clubName);
          setShortName(data.shortName);
          setGroup(data.group);
          setForm(data.form);
          setNextGame(data.nextGame);
          setNumMatch(data.numMatch);
          setNumWin(data.numWin);
          setNumDraw(data.numDraw);
          setGA(data.numGA);
          setGF(data.numGF);
          setclubId(data.clubId);
          const c = clubList.filter(
            (club) => club.clubName.toLowerCase() != data.clubName.toLowerCase()
          );
          setClubs(c);
          console.log("data", data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [clubParam, clubList]);

  async function updateClub(id) {
    const docRef = doc(db, "clubs", id);
    if (logo !== null) {
      // Create a reference to the image you want to delete
      const imageRef = ref(storage, `clubImages/${clubId}`);

      // Delete the old image
      deleteObject(imageRef)
        .then(() => {
          console.log("Image deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting image:", error);
        });

      // store new image
      uploadBytes(imageRef, logo).then(() => {
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
          clubName: clubName,
          shortName: shortName,
          description: description,
          group: group,
          numMatch: numMatch,
          numWin: numWin,
          numDraw: numDraw,
          numGA: numGA,
          numGF: numGF,
          nextGame: nextGame,
          form: form,
        },
        { merge: true }
      );
    }
    setIsUpdated((prev) => !prev);
    navigate("/club");
    console.log("club updated");
  }

  //if the profile picture is updated
  async function store(id, downloadURL) {
    const docRef = doc(db, "clubs", id);
    await setDoc(
      docRef,
      {
        clubName: clubName,
        shortName: shortName,
        logo: downloadURL,
        description: description,
        group: group,
        numMatch: numMatch,
        numWin: numWin,
        numDraw: numDraw,
        numGA: numGA,
        numGF: numGF,
        nextGame: nextGame,
        form: form,
      },
      { merge: true }
    );
    setIsUpdated((prev) => !prev);
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

  if (clubName === null) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout>
      <div className="text-gray-900  border-gray-700 mt-6 rounded">
        <div className="text-center p-4 font-bold text-3xl text-pink-500 underline uppercase">
          Update Club
        </div>
        <br />
        <div className="bg-errorPage bg-no-repeat bg-cover bg-fixed bg-bottom  ">
          <div className="w-full flex flex-col  border border-white/50 rounded-3xl ">
            <label className="font-bold text-xl">Club Name:</label>
            <input
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              type="text"
              value={clubName}
              onChange={(e) => setclubName(e.target.value)}
            />

            <label className="font-bold text-xl">Abbreviation:</label>
            <input
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              type="text"
              value={shortName}
              onChange={(e) => setShortName(e.target.value)}
            />

            <label className="font-bold text-xl">Logo Picture:</label>
            <input
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              type="file"
              onChange={(e) => setLogo(e.target.files[0])}
            />

            <label className="font-bold text-xl">Description:</label>
            <textarea
              placeholder="Write something about the author..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
            />

            <label className="font-bold text-xl">Group:</label>
            <select
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              name="group"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            >
              {groupList &&
                groupList.map((group) => (
                  <option value={group.id} key={group.id}>
                    {group.groupName}
                  </option>
                ))}
            </select>
            <div className="grid grid-cols-5 auto-rows-auto gap-3">
              <div>
                <label className="font-bold text-xl">Total:</label>
                <input
                  min={0}
                  placeholder="Number of match"
                  className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
                  type="number"
                  value={numMatch}
                  onChange={(e) => setNumMatch(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold text-xl">Victory:</label>
                <input
                  min={0}
                  placeholder=" Number of Victory game"
                  className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
                  type="number"
                  value={numWin}
                  onChange={(e) => setNumWin(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold text-xl">Draw</label>
                <input
                  min={0}
                  placeholder="Number of Draw game"
                  className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
                  type="number"
                  value={numDraw}
                  onChange={(e) => setNumDraw(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold text-xl">
                  <span className="hidden lg:inline-block">Goals Against</span>
                  <span className="md:hidden">GA</span>:
                </label>
                <input
                  min={0}
                  placeholder="Number of GA"
                  className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
                  type="number"
                  value={numGA}
                  onChange={(e) => setGA(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold text-xl">
                  <span className="hidden lg:inline-block">Goals For</span>
                  <span className="lg:hidden">GF</span>:
                </label>
                <input
                  placeholder="Number of GF"
                  className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
                  type="number"
                  value={numGF}
                  onChange={(e) => setGF(e.target.value)}
                />
              </div>
            </div>

            {/* select club */}
            <label className="font-bold text-xl">Next Game:</label>
            <select
              className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
              name="nextgame"
              value={nextGame}
              onChange={(e) => setNextGame(e.target.value)}
            >
              <option value="">No Next Match</option>
              {clubs &&
                clubs.map((club) => (
                  <option value={club.clubId} key={club.id}>
                    {club.clubName}
                  </option>
                ))}
            </select>
            <h2 className="font-bold text-xl flex items-center justify-between mb-2">
              Form
              <button
                className="uppercase text-sm text-green-600 flex items-center gap-2"
                onClick={addResult}
              >
                Add form
                <IoMdAddCircleOutline color="green" size="20" />
              </button>
            </h2>
            <div className="flex flex-col gap-1">
              {form.map((form, index) => (
                <div key={index} className="flex items-center gap-4 mb-3">
                  <select
                    className="border border-gray-700 p-2 rounded w-full outline-none "
                    name="formSelect"
                    value={form.result}
                    onChange={(e) =>
                      handleLinkChange(index, "result", e.target.value)
                    }
                  >
                    <option value="W">Win</option>
                    <option value="L">Lose</option>
                    <option value="D">Draw</option>
                  </select>

                  {form && (
                    <button
                      className="grid place-items-center"
                      title="remove from"
                      onClick={() => removeForm(index)}
                    >
                      <BsTrash color="red" size="20" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {clubName && shortName && group ? (
              <button
                className="bg-gray-700 w-full text-white font-bold p-2 mt-2 rounded"
                onClick={() => updateClub(clubParam)}
              >
                Update Club
              </button>
            ) : (
              <button
                className="bg-gray-700 w-full text-white font-bold p-2 mt-2 rounded"
                onClick={notify}
              >
                Update Club
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
UpdateClub.propTypes = {
  setIsUpdated: PropTypes.func.isRequired,
  clubList: PropTypes.array.isRequired,
  groupList: PropTypes.array.isRequired,
};
export default UpdateClub;
