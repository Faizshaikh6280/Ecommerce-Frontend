import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_SERVER}/api/v1/product`,
  }),
  endpoints: (builder) => ({
    latestProducts: builder.query({
      query: () => "/latest-product",
    }),
    allAdminsProduct: builder.query({
      query: () => "/admin-prodycucts",
    }),
    searchProducts: builder.query({
      query: ({ search, page, category, sort, maxPrice }) => {
        let baseQuery = `/all?search=${search}&page=${page}`;
        if (category) baseQuery += `&category=${category}`;
        if (maxPrice) baseQuery += `&price[lte]=${maxPrice}`;
        if (sort) baseQuery += `&sort=${sort}`;
        return baseQuery;
      },
    }),
    getAllCategories: builder.query({
      query: () => "/all-categories",
    }),
  }),
});

export const {
  useLatestProductsQuery,
  useAllAdminsProductQuery,
  useSearchProductsQuery,
  useGetAllCategoriesQuery,
} = productApi;
