import Markdown from "markdown-to-jsx";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
const Detail = ({ postList }) => {
  const { id } = useParams();
  return (
    <div id="detail" className="p-8">
      {postList.map((post) => {
        if (post.id === id) {
          return (
            <>
              <div>
                <img src={post.img} alt={post.title} />
              </div>
              <h1>{post.title}</h1>
              <Markdown>{post.content}</Markdown>
              <p>{post.author.name}</p>
            </>
          );
        }

        return null;
      })}
    </div>
  );
};

Detail.propTypes = {
  postList: PropTypes.array.isRequired,
};
export default Detail;
