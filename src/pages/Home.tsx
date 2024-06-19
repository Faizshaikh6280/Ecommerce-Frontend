import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useLatestProductsQuery } from "../redux/api/productApi";
import SkeletonLoading from "../components/SkeletonLoading";
import toast from "react-hot-toast";

function Home() {
  const { data, isLoading, isError, error } = useLatestProductsQuery("");
  console.log(isLoading);
  function addToCartHandler() {}

  if (isError) {
    return toast.error("Failed to fetch latest products!");
  }

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
        {isLoading ? (
          <SkeletonLoading width="100vw" />
        ) : (
          data?.data.map((el) => (
            <ProductCard
              key={el._id}
              productId={el._id}
              name={el.name}
              price={el.price}
              stock={el.stock}
              photo={el.photo}
              handler={addToCartHandler}
            />
          ))
        )}
      </main>
    </div>
  );
}

export default Home;
