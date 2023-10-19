import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import { useState, useEffect } from "react";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import LoginWithPhone from "./pages/LoginWithPhone";
import { db } from "./firebase-config";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import UpdatePost from "./pages/UpdatePost";

export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isUpdated, setIsUpdated] = useState(false);
  const [postList, setPostList] = useState([]);
  const postCollectionRef = collection(db, "posts");

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      console.log("Signed Out");
      setIsAuth(false);
      // window.location.href = "/login";
    });
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      console.log("data", data);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
    console.log("postList", postList);
  }, [isUpdated]);

  const deltePost = async (id) => {
    let userConfirmed = confirm("Do you want to delete this blog?");

    if (userConfirmed) {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
      console.log("post deleted");
      setIsUpdated(!isUpdated);
    } else {
      console.log("User cancelled the action.");
    }
  };

  return (
    <Router>
      <nav className="flex items-center justify-center gap-10 py-8 bg-black text-white font-bold">
        <NavLink exact to="/" activeClassName="active">
          Home
        </NavLink>

        {!isAuth ? (
          <NavLink exact to="/login" activeClassName="active">
            Login
          </NavLink>
        ) : (
          <>
            <NavLink exact to="/createpost" activeClassName="active">
              Create Postttt
            </NavLink>
            {/* <button onClick={signUserOut}>Logout</button> */}
            <NavLink exact to="/login" activeClassName="none">
              <button onClick={signUserOut}>Logout</button>
            </NavLink>
          </>
        )}
      </nav>
      <Routes>
        <Route
          path="/"
          element={
            <Home isAuth={isAuth} deltePost={deltePost} postList={postList} />
          }
        />
        <Route
          path="/createpost"
          element={<CreatePost setIsUpdated={setIsUpdated} />}
        />
        <Route
          path="/updatepost/:post"
          element={
            <UpdatePost postList={postList} setIsUpdated={setIsUpdated} />
          }
        />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/loginWithPhone" element={<LoginWithPhone />} />
        <Route path="/detail/:id" element={<Detail postList={postList} />} />
      </Routes>
    </Router>
  );
}
