import { useParams } from "react-router-dom";

const Posts = () => {
  const { year, month } = useParams();
  return (
    <div>
      <h1>Posts</h1>
      Year: {year}, Month: {month}
    </div>
  );
};

export default Posts;
