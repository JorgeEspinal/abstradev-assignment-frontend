import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { MdLibraryAdd } from "react-icons/md";
import { FC, Fragment, useEffect } from "react";
import TableData from "./Table";
import Header from "../header";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { getAllTransactionAction } from "../../features/transactionAsyncActions";
import { RootState } from "../../store/reducers";

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
      {/* <Flex minWidth="max-content" alignItems="center" gap="2">
        <Box p="2">
          <Heading as="h1" size="4xl" noOfLines={1}>
            Transactions
          </Heading>
        </Box>
        <Spacer />
        <Button leftIcon={<MdLibraryAdd />} colorScheme="teal" variant="solid">
          Transaction
        </Button>
      </Flex> */}
      <Header />

      <TableData transactions={transactions} />
    </Fragment>
  );
};

export default Dashboard;
