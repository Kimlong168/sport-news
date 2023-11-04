import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import Layout from "../Layouts/Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WidgetGroup from "../components/WidgetGroup";
import PropTypes from "prop-types";
const CreateTodayMatch = ({ setIsUpdated }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [staduim, setStaduim] = useState("");
  const [liveOn, setLiveOn] = useState("");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const postCollectionRef = collection(db, "todayMatch");
  let navigate = useNavigate();

  const createNews = () => {
    addDoc(postCollectionRef, {
      date: formatDate(date),
      time: time,
      staduim: staduim,
      liveOn: liveOn,
      teamA: teamA,
      teamB: teamB,
    });
    setIsUpdated((prev) => !prev);
    navigate("/today_match");
    console.log("date", date);
    console.log("today match added");
  };

  function formatDate(inputDate) {
    const options = { year: "numeric", month: "short", day: "2-digit" };
    const formattedDate = new Date(inputDate).toLocaleDateString(
      "en-US",
      options
    );
    return formattedDate;
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
  return (
    <Layout>
      <WidgetGroup />
      <div className="text-gray-900  border-gray-900 mt-6 rounded ">
        <div className="text-center p-4 font-bold text-3xl text-purple-500 underline uppercase">
          Create Today Match
        </div>
        <br />
        <section className="pt-0">
          <div className="flex flex-col md:flex-row items-center justify-between md:gap-4">
            <div className="flex-1 w-full">
              <label className="font-bold mb-2 text-xl ">Date</label>
              <input
                type="date"
                className="border border-gray-700  uppercase p-2 rounded w-full outline-none mb-5 "
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div className="flex-1 w-full">
              <label className="font-bold mb-2 text-xl ">Time</label>
              <input
                type="time"
                placeholder="Time to kick off"
                className="border border-gray-700  uppercase p-2 rounded w-full outline-none mb-5 "
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex  flex-col md:flex-row items-center justify-between md:gap-4">
            <div className="flex-1 w-full">
              <label className="font-bold mb-2 text-xl ">Team A</label>
              <input
                type="text"
                className="border border-gray-700  uppercase p-2 rounded w-full outline-none mb-5"
                value={teamA}
                onChange={(e) => setTeamA(e.target.value)}
              />
            </div>

            <div className="flex-1 w-full">
              <label className="font-bold mb-2 text-xl ">Team B</label>
              <input
                type="text"
                className="border border-gray-700  uppercase p-2 rounded w-full outline-none mb-5"
                value={teamB}
                onChange={(e) => setTeamB(e.target.value)}
              />
            </div>
          </div>

          <label className="font-bold mb-2 text-xl ">Staduim</label>
          <input
            type="text"
            className="border border-gray-700  uppercase p-2 rounded w-full outline-none mb-5"
            value={staduim}
            onChange={(e) => setStaduim(e.target.value)}
          />
          <label className="font-bold mb-2 text-xl ">Live On</label>
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
              onClick={createNews}
            >
              Create Today Match
            </button>
          ) : (
            <div>
              <button
                className="bg-gray-700 text-white font-bold p-2 mt-5 rounded w-full"
                onClick={notify}
              >
                Create Today Match
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
CreateTodayMatch.propTypes = {
  setIsUpdated: PropTypes.func.isRequired,
};
export default CreateTodayMatch;
