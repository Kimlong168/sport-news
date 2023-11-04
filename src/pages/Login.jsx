import { auth } from "../firebase-config";
// import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import PropTypes from "prop-types";
import { useState } from "react";
const Login = ({ setIsAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // let navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email.trim(), password.trim())
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("login successfully:", user);
        alert("login successfully");
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        // navigate("/");
        window.location.href = "/";
      })
      .catch((error) => {
        setIsAuth(false);
        console.log(error.message);
        console.log(error.code);
        alert("login fail");
      });
  };

  return (
    <div>
      <div className="h-screen flex justify-center ">
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form
              className="bg-white rounded-md shadow-2xl p-5"
              onSubmit={(e) => handleLogin(e)}
            >
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Hello admin
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-8">
                Welcome Back
              </p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  className=" pl-2 w-full outline-none border-none cursor-text"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 w-full outline-none border-none cursor-text"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button
                type="submit"
                className="block w-full bg-indigo-600 mt-5 py-2 rounded-2xl hover:bg-indigo-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
              >
                Login
              </button>
              <div className="flex justify-between mt-4">
                <span className="text-sm ml-2 hover:text-blue-500 cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                  Forgot Password ?
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
Login.propTypes = {
  setIsAuth: PropTypes.func.isRequired,
};

export default Login;
