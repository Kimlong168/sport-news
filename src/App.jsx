import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Login";
// import { signOut } from "firebase/auth";
// import { auth } from "./firebase-config";

import { auth, db } from "./firebase-config";
import {
  getDocs,
  collection,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
// import UpdatePost from "./pages/UpdateNews";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Author from "./pages/Author";
import Result from "./pages/Result";
import TodayMatch from "./pages/TodayMatch";
import Category from "./pages/Category";
import CreateNews from "./pages/CreateNews";
import CreateAuthor from "./pages/CreateAuthor";
import CreateResult from "./pages/CreateResult";
import CreateTodayMatch from "./pages/CreateTodayMatch";
import CreateCategory from "./pages/CreateCategory";
import UpdateNews from "./pages/UpdateNews";
import UpdateAuthor from "./pages/UpdateAuthor";
import UpdateResult from "./pages/UpdateResult";
import UpdateTodayMatch from "./pages/UpdateTodayMatch";
import UpdateCategory from "./pages/UpdateCategory";
import { signOut } from "firebase/auth";
import Error404 from "./pages/Error404";
import CreateClub from "./pages/CreateClub";
import Club from "./pages/Club";
import UpdateClub from "./pages/UpdateClub";
import CreateGroup from "./pages/CreateGroup";
import Group from "./pages/Group";
import UpdateGroup from "./pages/UpdateGroup";
export default function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));
  const [isUpdated, setIsUpdated] = useState(false);
  const [postList, setPostList] = useState([]);
  const [authorList, setAuthorList] = useState([]);
  const [todayMatchList, setTodayMatchList] = useState([]);
  const [resultList, setResultList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [clubList, setClubList] = useState([]);
  const [groupList, setGroupList] = useState([]);

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      console.log("Signed Out");
      setIsAuth(false);
      window.location.href = "/login";
    });
  };

  useEffect(() => {
    const postCollectionRef = collection(db, "posts");
    const authorCollectionRef = collection(db, "authors");
    const resultCollectionRef = collection(db, "results");
    const todayMatchCollectionRef = collection(db, "todayMatch");
    const categoryCollectionRef = collection(db, "categories");
    const clubCollectionRef = collection(db, "clubs");
    const groupCollectionRef = collection(db, "groups");
    const getPosts = async () => {
      const authors = await getDocs(authorCollectionRef);
      const posts = await getDocs(postCollectionRef);
      const results = await getDocs(resultCollectionRef);
      const matches = await getDocs(todayMatchCollectionRef);
      const categories = await getDocs(categoryCollectionRef);
      const clubs = await getDocs(query(clubCollectionRef, orderBy("group")));
      const groups = await getDocs(groupCollectionRef);
      console.log("posts", posts);
      console.log("auhtors", authors);
      console.log("football_results", results);
      console.log("today_match", matches);
      console.log("categories", categories);
      console.log("clubs", clubs);
      console.log("groups", groups);
      setPostList(posts.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setAuthorList(authors.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setResultList(results.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setTodayMatchList(
        matches.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setCategoryList(
        categories.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setClubList(clubs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setGroupList(groups.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [isUpdated]);

  const deltePost = async (id, database = "posts") => {
    // let userConfirmed = confirm("Do you want to delete this news?");

    const postDoc = doc(db, database, id);
    await deleteDoc(postDoc);
    console.log("post deleted");
    setIsUpdated((prev) => !prev);
  };

  // // local storage
  // function setItemWithExpiry(key, value, expiryMinutes) {
  //   const now = new Date();
  //   const item = {
  //     value: value,
  //     expiry: now.getTime() + expiryMinutes * 60 * 1000, // Convert minutes to milliseconds
  //   };
  //   localStorage.setItem(key, JSON.stringify(item));
  // }

  // function getItemWithExpiry(key) {
  //   const itemString = localStorage.getItem(key);
  //   if (!itemString) {
  //     return null;
  //   }

  //   const item = JSON.parse(itemString);
  //   const now = new Date();

  //   if (now.getTime() > item.expiry) {
  //     // If the item has expired, remove it from localStorage
  //     localStorage.removeItem(key);
  //     return null;
  //   }

  //   return item.value;
  // }

  if (!isAuth) {
    return (
      <Router>
        <Routes>
          {/* authentication */}
          <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
          <Route
            path="/login"
            element={
              <Login
                setIsAuth={setIsAuth}
            
              />
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Router>
    );
  }

  return (
    <div>
      <Router>
        {/* logout  */}
        <button
          className="fixed top-4 right-4 z-50 text-white font-bold"
          onClick={signUserOut}
        >
          Logout
        </button>
        <Routes>
          {/* authentication */}
          {/* <Route path="/login" element={<Login setIsAuth={setIsAuth} />} /> */}
          <Route path="*" element={<Error404 />} />
          {/* home - dashboard */}
          <Route path="/" element={<Dashboard />} />

          {/* news */}
          <Route
            path="/news"
            element={
              <News
                isAuth={isAuth}
                deltePost={deltePost}
                postList={postList}
                authorList={authorList}
                categoryList={categoryList}
              />
            }
          />
          <Route
            path="/news_detail/:id"
            element={<NewsDetail categoryList={categoryList} />}
          />
          <Route
            path="/create_news"
            element={
              <CreateNews
                setIsUpdated={setIsUpdated}
                authorList={authorList}
                categoryList={categoryList}
              />
            }
          />
          <Route
            path="/update_news/:post"
            element={
              <UpdateNews
                setIsUpdated={setIsUpdated}
                authorList={authorList}
                categoryList={categoryList}
              />
            }
          />

          {/* author */}
          <Route
            path="/authors"
            element={<Author deltePost={deltePost} authorList={authorList} />}
          />
          <Route
            path="/create_authors"
            element={<CreateAuthor setIsUpdated={setIsUpdated} />}
          />
          <Route
            path="/update_author/:id"
            element={<UpdateAuthor setIsUpdated={setIsUpdated} />}
          />

          {/* football result */}
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
            element={<UpdateResult setIsUpdated={setIsUpdated} />}
          />

          {/* today match */}
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
            element={<UpdateTodayMatch setIsUpdated={setIsUpdated} />}
          />

          {/* category */}
          <Route
            path="/category"
            element={
              <Category deltePost={deltePost} categoryList={categoryList} />
            }
          />

          <Route
            path="/create_category"
            element={<CreateCategory setIsUpdated={setIsUpdated} />}
          />
          <Route
            path="/update_category/:id"
            element={<UpdateCategory setIsUpdated={setIsUpdated} />}
          />

          {/* club */}
          <Route
            path="/club"
            element={
              <Club
                deltePost={deltePost}
                clubList={clubList}
                groupList={groupList}
              />
            }
          />
          <Route
            path="/create_club"
            element={
              <CreateClub
                setIsUpdated={setIsUpdated}
                clubList={clubList}
                groupList={groupList}
              />
            }
          />
          <Route
            path="/update_club/:id"
            element={
              <UpdateClub
                setIsUpdated={setIsUpdated}
                clubList={clubList}
                groupList={groupList}
              />
            }
          />

          {/* group */}
          <Route
            path="/group"
            element={<Group deltePost={deltePost} groupList={groupList} />}
          />
          <Route
            path="/create_group"
            element={<CreateGroup setIsUpdated={setIsUpdated} />}
          />
          <Route
            path="/update_group/:id"
            element={<UpdateGroup setIsUpdated={setIsUpdated} />}
          />
        </Routes>
      </Router>
    </div>
  );
}
