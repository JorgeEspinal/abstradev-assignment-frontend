import { createAsyncThunk } from "@reduxjs/toolkit";
import api, { EndPoints } from "../api/axios";
import { TransactionType } from "../models/transaction-type";
import { TransactionActionTypes } from "./transactionActionTypes";

export const getAllTransactionAction = createAsyncThunk(
  TransactionActionTypes.GET_ALL_TRANSACTION,
  async () => {
    const response = await api.get(`${EndPoints.transactions}/get`);
    return response.data.transactions;
  }
);

export const getByIdTransactionAction = createAsyncThunk(
  TransactionActionTypes.GET_BY_ID_TRANSACTION,
  async (id: string) => {
    const response = await api.get<TransactionType[]>(
      `${EndPoints.transactions}/get/${id}`
    );
    return response.data;
  }
);

export const getByFilterTransactionAction = createAsyncThunk(
  TransactionActionTypes.GET_BY_FILTERS_TRANSACTION,
  async () => {
    const response = await api.get<TransactionType[]>(
      `${EndPoints.transactions}/filter`
    );
    return response.data;
  }
);

export const createTransactionAction = createAsyncThunk(
  TransactionActionTypes.CREATE_TRANSACTION,
  async (transaction: TransactionType) => {
    const response = await api.post(
      `${EndPoints.transactions}/create`,
      transaction
    );
    return response.data.dataSave;
  }
);
