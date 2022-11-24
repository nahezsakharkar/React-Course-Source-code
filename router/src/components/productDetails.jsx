import { useNavigate, useParams } from "react-router-dom";

function ProductDetails() {
  let { id } = useParams();
  const navigate = useNavigate();

  const saveProduct = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Product Details - {id}</h1>
      <button onClick={saveProduct}>Save</button>
    </div>
  );
}

export default ProductDetails;
