import { FC, Fragment, useEffect } from "react";
import TableData from "./Table";
import Header from "../header";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { getAllTransactionAction } from "../../features/transactionAsyncActions";
import { RootState } from "../../store/reducers";
import AddTransaction from "../AddTransaction";

const Dashboard: FC = () => {
  const transactions = useAppSelector(
    (state: RootState) => state.transaction.transactions
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllTransactionAction());
  }, [dispatch]);

  return (
    <Fragment>
      <Header />
      <AddTransaction />
      <TableData transactions={transactions} />
    </Fragment>
  );
};

export default Dashboard;
