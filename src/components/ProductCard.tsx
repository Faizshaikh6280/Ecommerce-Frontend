import { FaPlus } from "react-icons/fa";

type ProductProps = {
  productId: string;
  name: string;
  photo: string;
  price: string;
  stock: number;
  handler: () => void;
};

const server = "";

function ProductCard({
  productId,
  name,
  photo,
  price,
  stock,
  handler,
}: ProductProps) {
  return (
    <div className="product-card">
      <img src={photo} alt={name} />
      <p>{name}</p>
      <p>
        <strong>₹{price}</strong>
      </p>

      <div>
        <button onClick={handler}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
