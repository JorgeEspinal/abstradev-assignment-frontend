import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TransactionType } from "../models/transaction-type";
import {
  transactionNamespace,
  TransactionStateType,
} from "./transactionActionTypes";

import {
  createTransactionAction,
  getAllTransactionAction,
  getByFilterTransactionAction,
  getByIdTransactionAction,
} from "./transactionAsyncActions";

const initialState: TransactionStateType = {
  transactions: [],
  loading: false,
  error: "",
};

export const transactionSlice = createSlice({
  name: transactionNamespace,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllTransactionAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      getAllTransactionAction.fulfilled,
      (state, action: PayloadAction<TransactionType[]>) => {
        state.loading = false;
        state.error = "";
        state.transactions = action.payload;
      }
    );
    builder.addCase(getAllTransactionAction.rejected, (state) => {
      state.loading = false;
      state.error = "Something wrong happened";
    });

    builder.addCase(getByIdTransactionAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      getByIdTransactionAction.fulfilled,
      (state, action: PayloadAction<TransactionType[]>) => {
        state.loading = false;
        state.error = "";
        state.transactions = action.payload;
      }
    );
    builder.addCase(getByIdTransactionAction.rejected, (state) => {
      state.loading = false;
      state.error = "Something wrong happened";
    });

    builder.addCase(getByFilterTransactionAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      getByFilterTransactionAction.fulfilled,
      (state, action: PayloadAction<TransactionType[]>) => {
        state.transactions = action.payload;
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(getByFilterTransactionAction.rejected, (state) => {
      state.loading = false;
      state.error = "Something wrong happened";
    });

    builder.addCase(createTransactionAction.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(
      createTransactionAction.fulfilled,
      (state, action: PayloadAction<TransactionType>) => {
        state.transactions.push(action.payload);
        state.loading = false;
        state.error = "";
      }
    );
    builder.addCase(createTransactionAction.rejected, (state) => {
      state.loading = false;
      state.error = "Something wrong happened";
    });
  },
});

export const transactionActions = transactionSlice.actions;
export default transactionSlice.reducer;
