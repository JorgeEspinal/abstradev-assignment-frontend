import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useTabPanel,
} from "@chakra-ui/react";
import {
  ColumnDef,
  ExpandedState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
import { FC, useMemo, useState } from "react";
import { TransactionType } from "../../models/transaction-type";
// import { Table, TableContainer } from "@mui/material";

type Props = {
  transactions: TransactionType[];
};

interface test {
  idx: string;
  name: string;
}

const TableData: FC<Props> = ({ transactions }) => {
  // const columns = [
  //   {
  //     Header: "Column 1",
  //     accessor: "transactionId", // accessor is the "key" in the data
  //   },
  //   {
  //     Header: "Column 2",
  //     accessor: "timestamp",
  //   },
  // ];

  //const tabel = useTable({ columns, data: transactions });
  const [transactionSelect, setTransactionSelect] = useState<string>("");
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const data: test[] = [
    {
      idx: "1212",
      name: "DDD",
    },
    {
      idx: "333",
      name: "XXX",
    },
  ];

  const myColumns: ColumnDef<test>[] = [
    { id: "actions", cell: (_props) => <div>Actions</div> },
    {
      accessorKey: "idx",
      //cell: (info) => info.getValue(),
      cell: (info) => info.getValue(),
      footer: (props) => props.column.id,
    },
  ];

  // const table = useReactTable({
  //   data: data,
  //   state: { expanded },
  //   columns: myColumns,
  // });

  const handleExpand = (id: string) => {};

  const tableRows = transactions.map((transaction) => (
    <Tr key={transaction.transactionId}>
      <Td onClick={() => handleExpand(transaction.transactionId)}>
        <IoIosArrowForward />
      </Td>
      <Td>{transaction.transactionId}</Td>
      <Td>{String(transaction.timestamp)}</Td>
    </Tr>
  ));

  return (
    <Box shadow="md" borderWidth="1px" marginLeft="1" marginRight="1">
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Trasanction ID</Th>
              <Th>Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>{tableRows}</Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TableData;
