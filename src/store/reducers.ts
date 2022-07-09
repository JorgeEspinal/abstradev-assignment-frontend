import { combineReducers } from "@reduxjs/toolkit";
import transactionSlice from "../features/transactionSlice";

const injectReducers = {
  transaction: transactionSlice,
};

const rootReducer = combineReducers({
  ...injectReducers,
});

export type RootState = ReturnType<typeof rootReducer>;
export const createReducer = () => rootReducer;
