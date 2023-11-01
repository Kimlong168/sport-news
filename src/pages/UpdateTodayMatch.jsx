import { useState } from "react";
import { setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Loading from "../components/Loading";
const UpdateTodayMatch = ({ setIsUpdated }) => {
  const { id: matchParam } = useParams();

  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [staduim, setStaduim] = useState("");
  const [liveOn, setLiveOn] = useState("");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  let navigate = useNavigate();

  useEffect(() => {
    const docRef = doc(db, "todayMatch", matchParam);

    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setTime(data.time);
          setDate(convertDateFormat(data.date));
          setStaduim(data.staduim);
          setLiveOn(data.liveOn);
          setTeamA(data.teamA);
          setTeamB(data.teamB);
          console.log("data", data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [matchParam]);

  async function updateTodayMatch(id) {
    const docRef = doc(db, "todayMatch", id);
    await setDoc(
      docRef,
      {
        date: formatDate(date),
        time: time,
        staduim: staduim,
        liveOn: liveOn,
        teamA: teamA,
        teamB: teamB,
      },
      { merge: true }
    );
    setIsUpdated((prev) => !prev);
    navigate("/today_match");
    console.log("todat match updated");
  }

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
  }

  function convertDateFormat(inputDate) {
    inputDate = inputDate.toUpperCase();
    const months = {
      JAN: "01",
      FEB: "02",
      MAR: "03",
      APR: "04",
      MAY: "05",
      JUN: "06",
      JUL: "07",
      AUG: "08",
      SEP: "09",
      OCT: "10",
      NOV: "11",
      DEC: "12",
    };

    const parts = inputDate.split(" ");

    if (parts.length === 3) {
      const month = months[parts[0].trim()];
      const day = parts[1].replace(",", "");
      const year = parts[2];

      return `${year}-${month}-${day}`;
    }

    // Return null for invalid input
    return null;
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
  if (!time) {
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
          Update Today Match
        </div>
        <br />
        <section className="p-8 pt-0">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <label className="font-bold mb-2 text-xl">Date</label>
              <input
                type="date"
                className="border border-gray-700   p-2 rounded w-full outline-none mb-5 "
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <label className="font-bold mb-2 text-xl">Time</label>
              <input
                type="time"
                placeholder="Time to kick off"
                className="border border-gray-700  uppercase p-2 rounded w-full outline-none mb-5 "
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex  flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1">
              <label className="font-bold mb-2 text-xl">Team A</label>
              <input
                type="text"
                className="border border-gray-700  uppercase p-2 rounded w-full outline-none mb-5"
                value={teamA}
                onChange={(e) => setTeamA(e.target.value)}
              />
            </div>

            <div className="flex-1">
              <label className="font-bold mb-2 text-xl">Team B</label>
              <input
                type="text"
                className="border border-gray-700  uppercase p-2 rounded w-full outline-none mb-5"
                value={teamB}
                onChange={(e) => setTeamB(e.target.value)}
              />
            </div>
          </div>

          <label className="font-bold mb-2 text-xl">Staduim</label>
          <input
            type="text"
            className="border border-gray-700  uppercase p-2 rounded w-full outline-none mb-5"
            value={staduim}
            onChange={(e) => setStaduim(e.target.value)}
          />
          <label className="font-bold mb-2 text-xl">Live On</label>
          <input
            type="text"
            placeholder="Optional"
            className="border border-gray-700  uppercase p-2 rounded w-full outline-none mb-5"
            value={liveOn}
            onChange={(e) => setLiveOn(e.target.value)}
          />

          {date && time && staduim && teamA && teamB ? (
            <button
              className="bg-gray-700 w-full text-white font-bold p-2 mt-2 rounded"
              onClick={() => updateTodayMatch(matchParam)}
            >
              Update Today Match
            </button>
          ) : (
            <div>
              <button
                className="bg-gray-700 text-white font-bold p-2 mt-5 rounded w-full"
                onClick={notify}
              >
                Update Today Match
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
UpdateTodayMatch.propTypes = {
  setIsUpdated: PropTypes.func.isRequired,
};
export default UpdateTodayMatch;
