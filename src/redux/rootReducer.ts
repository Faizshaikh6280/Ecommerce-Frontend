// reducers/index.js
import { combineReducers } from "@reduxjs/toolkit";
import { userSlice } from "./slices/userSlice"; // example slice
import { userApi } from "./api/userApi";
import { productApi } from "./api/productApi";

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
});

export default rootReducer;
