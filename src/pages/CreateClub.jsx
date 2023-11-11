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
import { useEffect } from "react";

const CreateClub = ({ setIsUpdated, clubList, groupList }) => {
  const [clubName, setclubName] = useState("");
  const [shortName, setShortName] = useState("");
  const [logo, setLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [group, setGroup] = useState("");
  const [numLost, setNumLost] = useState(0);
  const [numWin, setNumWin] = useState(0);
  const [numDraw, setNumDraw] = useState(0);
  const [numGA, setNumGA] = useState(0);
  const [numGF, setNumGF] = useState(0);
  const [nextGame, setNextGame] = useState("");
  const [form, setForm] = useState([
    // {
    //   result: "",
    // },
  ]);

  useEffect(() => {
    setGroup(groupList[0]?.id);
  }, [groupList]);

  const clubs = clubList.filter(
    (club) => club.clubName.toLowerCase() != clubName.toLowerCase()
  );

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

  const submitForm = () => {
    if (
      clubName === "" ||
      shortName === "" ||
      logo === "" ||
      group === "" ||
      numLost === "" ||
      numWin === "" ||
      numDraw === "" ||
      numGA === "" ||
      numGF === ""
      // nextGame === ""
    ) {
      notify();
      // alert("please fill the the required information to create link tree");
    } else {
      // You can process the form data here (e.g., send it to a server)

      const clubNameNoSpaces = clubName.replace(/\s+/g, "");
      const timestamp = new Date().getTime();

      // Concatenate full name and timestamp to create the ID
      const generatedID = `${clubNameNoSpaces}_${timestamp}`;

      const imageRef = ref(storage, `clubImages/${generatedID}`);
      uploadBytes(imageRef, logo).then(() => {
        // Get the download URL for the uploaded image
        getDownloadURL(imageRef)
          .then((downloadURL) => {
            console.log("Download URL:", downloadURL);
            //store author and image to firestore
            createClub(generatedID, downloadURL);
          })
          .catch((error) => {
            console.error("Error getting download URL:", error);
          });
        console.log("image uploaded");
      });

      navigate(`/club`);
    }
  };

  let navigate = useNavigate();
  const postCollectionRef = collection(db, "clubs");

  const createClub = (generatedID, downloadURL) => {
    addDoc(postCollectionRef, {
      clubName: clubName,
      logo: downloadURL,
      shortName: shortName,
      description: description,
      group: group,
      point: parseInt(numWin) * 3 + parseInt(numDraw),
      numMatch: parseInt(numDraw) + parseInt(numLost) + parseInt(numWin),
      numLost: numLost,
      numWin: numWin,
      numDraw: numDraw,
      numGA: numGA,
      numGF: numGF,
      numGD: parseInt(numGF) - parseInt(numGA),
      nextGame: nextGame,
      form: form,
      clubId: generatedID,
    });

    setIsUpdated((prev) => !prev);

    console.log("club added", clubName);
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
        <div className="text-center p-4 font-bold text-3xl text-pink-500 underline uppercase">
          Create Club
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
                <label className="font-bold text-xl">Win:</label>
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
                <label className="font-bold text-xl">Lost:</label>
                <input
                  min={0}
                  placeholder="Number of match"
                  className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
                  type="number"
                  value={numLost}
                  onChange={(e) => setNumLost(e.target.value)}
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
                  <span className="lg:hidden">GA</span>:
                </label>
                <input
                  min={0}
                  placeholder="Number of GA"
                  className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
                  type="number"
                  value={numGA}
                  onChange={(e) => setNumGA(e.target.value)}
                />
              </div>

              <div>
                <label className="font-bold text-xl">
                  {" "}
                  <span className="hidden lg:inline-block">Goals For</span>
                  <span className="lg:hidden">GF</span>:
                </label>
                <input
                  min={0}
                  placeholder="Number of GF"
                  className="border border-gray-700 p-2 rounded w-full outline-none mb-5"
                  type="number"
                  value={numGF}
                  onChange={(e) => setNumGF(e.target.value)}
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
              {clubs.map((club) => (
                <option value={club.clubId} key={club.id}>
                  {club.clubName}
                </option>
              ))}
            </select>
            <h2 className="font-bold text-xl flex items-center justify-between mb-2">
              Form (Last 5 matches)
              <button
                className="uppercase text-sm text-green-600 flex items-center gap-2"
                onClick={() => {
                  addResult();
                }}
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
            <button
              className="bg-gray-700 text-white font-bold p-2 mt-2 rounded"
              onClick={submitForm}
            >
              Create Club
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
CreateClub.propTypes = {
  setIsUpdated: PropTypes.func.isRequired,
  clubList: PropTypes.array.isRequired,
  groupList: PropTypes.array.isRequired,
};
export default CreateClub;
