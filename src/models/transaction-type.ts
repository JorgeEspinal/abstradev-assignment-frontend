import { JsonObjectExpressionStatement } from "typescript";

export type TransactionType = {
  transactionId: string;
  transactionData: JSON;
  transactionMetadata: JSON;
  timestamp: Date;
};
