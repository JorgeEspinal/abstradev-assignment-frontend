import { TransactionType } from "../models/transaction-type";

export type TransactionStateType = {
  transactions: TransactionType[];
  loading: boolean;
  error: string | null;
};

export const transactionNamespace = "transaction";

export const TransactionActionTypes = {
  GET_ALL_TRANSACTION: `${transactionNamespace}/GET_ALL_TRANSACTION`,
  GET_BY_ID_TRANSACTION: `${transactionNamespace}/GET_BY_ID_TRANSACTION`,
  GET_BY_FILTERS_TRANSACTION: `${transactionNamespace}/GET_BY_FILTERS_TRANSACTION`,
  CREATE_TRANSACTION: `${transactionNamespace}/CREATE_TRANSACTION`,
  UPDATE_TRANSACTION: `${transactionNamespace}/UPDATE_TRANSACTION`,
  DELETE_TRANSACTION: `${transactionNamespace}/DELETE_TRANSACTION`,
};
