import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Home() {
  function addToCartHandler() {}

  return (
    <div className="home">
      <section></section>
      <h1>
        Latest Products More
        <Link to="/search" className="findmore">
          More
        </Link>
      </h1>
      <main>
        <ProductCard
          productId="kuchbhi"
          name="Macbook"
          price="96000"
          stock={20}
          photo="https://eu.tech21.com/cdn/shop/products/092b9032-1142-4fbb-9b12-1968405186b2.jpg?v=1688676661&width=1600"
          handler={addToCartHandler}
        />
      </main>
    </div>
  );
}

export default Home;
