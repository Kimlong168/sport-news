import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Detail from "./pages/Detail";
import Login from "./pages/Login";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import LoginWithPhone from "./pages/LoginWithPhone";
import { db } from "./firebase-config";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
// import UpdatePost from "./pages/UpdateNews";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Author from "./pages/Author";
import Result from "./pages/Result";
import TodayMatch from "./pages/TodayMatch";
import CreateNews from "./pages/CreateNews";
import CreateAuthor from "./pages/CreateAuthor";
import CreateResult from "./pages/CreateResult";
import CreateTodayMatch from "./pages/CreateTodayMatch";
import UpdateNews from "./pages/UpdateNews";
import UpdateAuthor from "./pages/UpdateAuthor";
import UpdateResult from "./pages/UpdateResult";
import UpdateTodayMatch from "./pages/UpdateTodayMatch";


export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isUpdated, setIsUpdated] = useState(false);
  const [postList, setPostList] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [todayMatchList, setTodayMatchList] = useState([]);
  const [resultList, setResultList] = useState([]);
  const postCollectionRef = collection(db, "posts");
  const authorCollectionRef = collection(db, "authors");
  const resultCollectionRef = collection(db, "results");
  const todayMatchCollectionRef = collection(db, "todayMatch");

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
      const authors = await getDocs(authorCollectionRef);
      const posts = await getDocs(postCollectionRef);
      const results = await getDocs(resultCollectionRef);
      const matches = await getDocs(todayMatchCollectionRef);
      console.log("posts", posts);
      console.log("auhtors", authors);
      console.log("football_results", results);
      console.log("today_match", matches);
      setPostList(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setAuthorList(authors.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setResultList(results.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setTodayMatchList(
        matches.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    };
    getPosts();
    console.log("postList", postList);
  }, [isUpdated]);

  const deltePost = async (id, database = "posts") => {
    // let userConfirmed = confirm("Do you want to delete this news?");

    const postDoc = doc(db, database, id);
    await deleteDoc(postDoc);
    console.log("post deleted");
    setIsUpdated((prev) => !prev);
  };

  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
          <Route path="/loginWithPhone" element={<LoginWithPhone />} />
          <Route path="/detail/:id" element={<Detail postList={postList} />} />

          <Route path="/" element={<Dashboard />} />
          <Route
            path="/news"
            element={
              <News isAuth={isAuth} deltePost={deltePost} postList={postList} />
            }
          />
          <Route path="/news_detail/:id" element={<NewsDetail />} />
          <Route
            path="/create_news"
            element={
              <CreateNews setIsUpdated={setIsUpdated} authorList={authorList} />
            }
          />
          <Route
            path="/update_news/:post"
            element={
              <UpdateNews
                postList={postList}
                setIsUpdated={setIsUpdated}
                authorList={authorList}
              />
            }
          />

          <Route
            path="/authors"
            element={
              <Author
                isAuth={isAuth}
                deltePost={deltePost}
                authorList={authorList}
              />
            }
          />
          <Route
            path="/create_authors"
            element={<CreateAuthor setIsUpdated={setIsUpdated} />}
          />
          <Route
            path="/update_author/:id"
            element={
              <UpdateAuthor
                authorList={authorList}
                setIsUpdated={setIsUpdated}
              />
            }
          />

          <Route
            path="/result"
            element={
              <Result
                isAuth={isAuth}
                deltePost={deltePost}
                resultList={resultList}
              />
            }
          />
          <Route
            path="/create_result"
            element={<CreateResult setIsUpdated={setIsUpdated} />}
          />
          <Route
            path="/update_result/:id"
            element={
              <UpdateResult
                setIsUpdated={setIsUpdated}
                resultList={resultList}
              />
            }
          />
          <Route
            path="/today_match"
            element={
              <TodayMatch
                isAuth={isAuth}
                deltePost={deltePost}
                todayMatchList={todayMatchList}
              />
            }
          />
          <Route
            path="/create_today_match"
            element={<CreateTodayMatch setIsUpdated={setIsUpdated} />}
          />
          <Route
            path="/update_match/:id"
            element={
              <UpdateTodayMatch
                setIsUpdated={setIsUpdated}
                todayMatchList={todayMatchList}
              />
            }
          />
        </Routes>
      </Router>
  );
}
