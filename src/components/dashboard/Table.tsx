import {
  Box,
  Center,
  Heading,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Skeleton,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, useState } from "react";
import {
  MdFirstPage,
  MdLastPage,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import { JSONTree } from "react-json-tree";

import { TransactionType } from "../../models/transaction-type";
import { useAppSelector } from "../../store/configureStore";

type Props = {
  transactions: TransactionType[];
};

const JSONTheme = {
  scheme: "custom",
  author: "custom",
  base00: "#FFFFFF", // Background
  base01: "#383830",
  base02: "#49483e",
  base03: "#75715e",
  base04: "#a59f85",
  base05: "#f8f8f2",
  base06: "#f5f4f1",
  base07: "#f9f8f5",
  base08: "#f92672",
  base09: "#fd971f",
  base0A: "#f4bf75",
  base0B: "#000000", //Value string/object
  base0C: "#a1efe4",
  base0D: "#000000", //Key label
  base0E: "#ae81ff",
  base0F: "#cc6633",
};

const TableData: FC<Props> = ({ transactions }) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const { loading } = useAppSelector((state) => state.transaction);
  const columns: ColumnDef<TransactionType>[] = [
    {
      accessorKey: "transactionId",
      header: "Transaction Id",
      footer: (info) => info.column.id,
    },
    {
      accessorKey: "transactionData",
      header: "Data",
      footer: (info) => info.column.id,
      cell: ({ getValue }) => (
        <JSONTree data={getValue()} invertTheme={false} theme={JSONTheme} />
      ),
    },
    {
      accessorKey: "transactionMetadata",
      header: "Metadata",
      footer: (info) => info.column.id,
      cell: ({ getValue }) => (
        <JSONTree data={getValue()} invertTheme={false} theme={JSONTheme} />
      ),
    },
    {
      accessorKey: "timestamp",
      header: "Timestamp",
      footer: (info) => info.column.id,
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    state: { expanded },
    onExpandedChange: setExpanded,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  const header = (
    <Thead>
      <Tr>
        <Th>Transaction Id</Th>
        <Th>Data</Th>
        <Th>MetaData</Th>
        <Th>Timestamp</Th>
      </Tr>
    </Thead>
  );

  const rows = table.getRowModel().rows.map((row) => (
    <Tr key={row.id}>
      {row.getVisibleCells().map((cell) => (
        <Td key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </Td>
      ))}
    </Tr>
  ));

  return (
    <Box shadow="md" borderWidth="1px" marginLeft="2" marginRight="2">
      <TableContainer>
        <Table size="md">
          {loading || transactions.length === 0 ? (
            header
          ) : (
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((_header) => (
                    <Th key={_header.id}>
                      {_header.isPlaceholder
                        ? null
                        : flexRender(
                            _header.column.columnDef.header,
                            _header.getContext()
                          )}
                    </Th>
                  ))}
                </Tr>
              ))}
            </Thead>
          )}

          <Tbody>{!loading && rows}</Tbody>
        </Table>

        {loading && (
          <Stack paddingLeft="2" paddingRight="2">
            <Skeleton height="40px" />
            <Skeleton height="40px" />
            <Skeleton height="40px" />
          </Stack>
        )}

        {!loading && transactions.length === 0 && (
          <Center padding="2">
            <Heading as="h3" size="2xl">
              Transactions not found
            </Heading>
          </Center>
        )}
      </TableContainer>
      <Box
        display="flex"
        padding="2"
        gap="1"
        alignItems="center"
        justifyContent="flex-end"
      >
        <Text fontSize="md">Page 1 to 10</Text>
        <Text fontSize="md">| Go to page:</Text>
        <Box>
          <NumberInput size="md" maxW={20} defaultValue={1} min={1} max={10}>
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </Box>
        <Box>
          <Select placeholder="Rows">
            <option value="option1">Show 10</option>
            <option value="option2">Show 20</option>
            <option value="option3">Show 30</option>
          </Select>
        </Box>
        <Box display="flex" gap="1">
          <IconButton aria-label="First page" icon={<MdFirstPage />} />
          <IconButton aria-label="Move page to left" icon={<MdChevronLeft />} />
          <IconButton
            aria-label="Move page to rigth"
            icon={<MdChevronRight />}
          />
          <IconButton aria-label="Last page" icon={<MdLastPage />} />
        </Box>
      </Box>
    </Box>
  );
};

export default TableData;
