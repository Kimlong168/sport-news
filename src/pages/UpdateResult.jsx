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
const UpdateResult = ({ setIsUpdated }) => {
  const { id: resultParam } = useParams();

  // const result = resultList.filter((post) => post.id === resultParam)[0];

  const [title, setTitle] = useState(null);
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [teamAGoal, setTeamAGoal] = useState('');
  const [teamBGoal, setTeamBGoal] = useState('');
  let navigate = useNavigate();

  useEffect(() => {
    const docRef = doc(db, "results", resultParam);

    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          setTitle(data.title);
          setTeamA(data.teamA);
          setTeamAGoal(data.teamAGoal);
          setTeamB(data.teamB);
          setTeamBGoal(data.teamBGoal);
          console.log("data", data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [resultParam]);

  async function updateResult(id) {
    const docRef = doc(db, "results", id);
    await setDoc(
      docRef,
      {
        title: title,
        teamA: teamA,
        teamB: teamB,
        teamAGoal: teamAGoal,
        teamBGoal: teamBGoal,
      },
      { merge: true }
    );
    setIsUpdated((prev) => !prev);
    navigate("/result");
    console.log("result updated");
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
  if (title === null) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="text-gray-900  border-gray-900 mt-6 rounded">
        <div className="text-center p-4 font-bold text-3xl text-green-400 underline uppercase">
          Update Football Result
        </div>
        <br />
        <section className="pt-0">
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
              onClick={() => updateResult(resultParam)}
            >
              Update Result
            </button>
          ) : (
            <div>
              <button
                className="bg-gray-700 text-white font-bold p-2 mt-5 rounded w-full"
                onClick={notify}
              >
                Update Result
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
UpdateResult.propTypes = {
  setIsUpdated: PropTypes.func.isRequired,
};
export default UpdateResult;
