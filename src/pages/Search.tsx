import { useState } from "react";
import {
  useGetAllCategoriesQuery,
  useSearchProductsQuery,
} from "../redux/api/productApi";
import SkeletonLoading from "../components/SkeletonLoading";
import ProductCard from "../components/ProductCard";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isErrorCategory, errorCategory } =
    useGetAllCategoriesQuery("");
  const {
    data: productsData,
    isLoading: loadingProducts,
    isErrorProduct,
    errorProduct,
  } = useSearchProductsQuery({ search, sort, maxPrice, category, page });

  console.log(productsData);

  if (isErrorCategory) {
    toast.error(errorCategory.message);
  }
  if (isErrorProduct) {
    toast.error(errorProduct.message);
  }
  const isPrevPage = page > 1;
  const isNextPage = page < 4;

  function addToCartHandler() {}

  return (
    <div className="product-search-page">
      <aside>
        <h2>Filters</h2>
        <div>
          <h4>Sort</h4>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">None</option>
            <option value="price">Price (Low to High)</option>
            <option value="-price">Price (High to Low)</option>
          </select>
        </div>

        <div>
          <h4>Max Price: {maxPrice || ""}</h4>
          <input
            type="range"
            min={100}
            max={100000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <h4>Category</h4>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">ALL</option>
            {!isLoading
              ? data?.data.map((el) => (
                  <option value={el} key={el}>
                    {el}
                  </option>
                ))
              : "loading..."}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {loadingProducts ? (
          <SkeletonLoading width="80%" />
        ) : (
          <div className="search-product-list">
            {productsData?.data.map((i) => (
              <ProductCard
                key={i._id}
                productId={i._id}
                name={i.name}
                price={i.price}
                stock={i.stock}
                handler={addToCartHandler}
                photo={i.photo}
              />
            ))}
          </div>
        )}

        {productsData && productsData.data.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevPage}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Prev
            </button>
            <span>
              {page} of {productsData.data.totalPage}
            </span>
            <button
              disabled={!isNextPage}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
