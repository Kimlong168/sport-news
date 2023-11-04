import { useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import Loading from "../components/Loading";
import Markdown from "react-markdown";
import PropTypes from "prop-types";

const NewsDetail = ({ categoryList }) => {
  const { id: newsParams } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    const docRef = doc(db, "posts", newsParams);

    const fetchData = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();

          setData(data);

          console.log("data", data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchData();
  }, [newsParams]);

  // loading
  if (!data) {
    return (
      <>
        <Layout>
          <Loading />
        </Layout>
      </>
    );
  }

  return (
    <Layout>
      <div className="text-gray-900 ">
        <div className="text-3xl text-center text-gray-800 font-bold mb-5 uppercase">
          {data.title}
        </div>
        <div className="mb-4">
          {data.img && <img className="mx-auto block" src={data.img} />}
        </div>

        <div className="text-center font-bold text-xl uppercase">
          Author: {data.author.name}
        </div>
        <div className="text-center uppercase font-medium">
          Category:{" "}
          {categoryList &&
            categoryList.map((category) => {
              if (category.id == data.categoryId) {
                return category.categoryName;
              }
            })}
        </div>
        <div className="text-center font-semibold text-blue-600">
          Date: {data.date}
        </div>
        <div className="text-center mb-5 uppercase bg-red-500 px-2 py-1 text-white font-semibold mt-2 rounded">
          {data.tags}
        </div>
        <Markdown>{data.content}</Markdown>
      </div>
    </Layout>
  );
};
NewsDetail.propTypes = {
  categoryList: PropTypes.array.isRequired,
};

export default NewsDetail;
