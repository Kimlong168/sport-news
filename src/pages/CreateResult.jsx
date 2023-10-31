import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WidgetGroup from "../components/WidgetGroup";
const CreateResult = ({ setIsUpdated }) => {
  const [title, setTitle] = useState("");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [teamAGoal, setTeamAGoal] = useState(null);
  const [teamBGoal, setTeamBGoal] = useState(null);
  const postCollectionRef = collection(db, "results");
  let navigate = useNavigate();

  const createResult = () => {
    addDoc(postCollectionRef, {
      title: title,
      teamA: teamA,
      teamB: teamB,
      teamAGoal: teamAGoal,
      teamBGoal: teamBGoal,
    });

    setIsUpdated((prev) => !prev);

    navigate("/result");
    console.log("result added");
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
      <div className="text-gray-900  border-gray-900 mt-6 rounded">
        <div className="text-center p-4 font-bold text-3xl text-green-400 underline uppercase">
          Create Football Result
        </div>
        <br />
        <section className="p-8 pt-0">
          <input
            type="text"
            placeholder="Title eg(CPL, Laliga, EPL, AFC-Cup,...)"
            className="border border-gray-700 p-2 rounded w-full outline-none  text-center mb-5"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <div className="flex justify-center items-center  gap-1 mb-5">
              <input
                type="text"
                placeholder="Team A name"
                className="border border-gray-700 p-2 rounded w-full outline-none  text-center "
                value={teamA}
                onChange={(e) => setTeamA(e.target.value)}
              />
              <div className="flex items-center justify-center gap-2">
                <input
                  type="number"
                  placeholder="8"
                  min={0}
                  className="border border-gray-700 p-2 rounded w-full outline-none  text-center "
                  value={teamAGoal}
                  onChange={(e) => setTeamAGoal(e.target.value)}
                />
                <span className="font-bold">-</span>
                <input
                  type="number"
                  min={0}
                  placeholder="2"
                  className="border border-gray-700 p-2 rounded w-full outline-none  text-center "
                  value={teamBGoal}
                  onChange={(e) => setTeamBGoal(e.target.value)}
                />
              </div>
              <input
                type="text"
                placeholder="Team B name"
                className="border border-gray-700 p-2 rounded w-full outline-none  text-center "
                value={teamB}
                onChange={(e) => setTeamB(e.target.value)}
              />
            </div>
          </div>

          {title && teamA && teamB ? (
            <button
              className="bg-gray-700 w-full  text-white font-bold p-2 mt-2 rounded"
              onClick={createResult}
            >
              Create Result
            </button>
          ) : (
            // <button
            //   className="bg-gray-700 w-full text-white font-bold p-2 mt-2 rounded"
            //   onClick={() => alert("Fill all required fields")}
            // >
            //   Create Result
            // </button>
            <div>
              <button
                className="bg-gray-700 text-white font-bold p-2 mt-5 rounded w-full"
                onClick={notify}
              >
                Create News
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

export default CreateResult;
