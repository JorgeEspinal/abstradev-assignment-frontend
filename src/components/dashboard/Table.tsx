import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useTabPanel,
} from "@chakra-ui/react";
import { FC, useMemo } from "react";
import { TransactionType } from "../../models/transaction-type";

import { useTable, useExpanded } from "react-table";

type Props = {
  transactions: TransactionType[];
};

const TableData: FC<Props> = ({ transactions }) => {
  const columns = useMemo(
    () => [
      {
        // Build our expander column
        id: "expander", // Make sure it has an ID
        Header: () => <span>Go</span>,
        Cell: () => (
          // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
          // to build the toggle for expanding a row
          <span>Down</span>
        ),
      },
      {
        Header: "Name",
        columns: [
          {
            Header: "First Name",
            accessor: "firstName",
          },
          {
            Header: "Last Name",
            accessor: "lastName",
          },
        ],
      },
      {
        Header: "Info",
        columns: [
          {
            Header: "Age",
            accessor: "age",
          },
          {
            Header: "Visits",
            accessor: "visits",
          },
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Profile Progress",
            accessor: "progress",
          },
        ],
      },
    ],
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: expanded,
  } = useTable(
    {
      columns: columns,
      data: transactions,
    },
    useExpanded
  );

  const tableRows = transactions.map((transaction) => (
    <Tr>
      <Td>{transaction.transactionId}</Td>
      <Td>millimetres (mm)</Td>
      <Td isNumeric>25.4</Td>
    </Tr>
  ));

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>Trasanction ID</Th>
            <Th>Key</Th>
            <Th>Value</Th>
          </Tr>
        </Thead>
        <Tbody>{tableRows}</Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableData;
