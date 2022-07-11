import {
  Box,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { FaSearch } from "react-icons/fa";
import { GrFilter } from "react-icons/gr";
import { MdLibraryAdd } from "react-icons/md";
import { FC, KeyboardEvent, useRef, useState } from "react";
import AdvanceSearch from "./AdvanceSearch";
import { transactionActions } from "../../features/transactionSlice";
import { useAppDispatch } from "../../store/configureStore";
import {
  getAllTransactionAction,
  getByIdTransactionAction,
} from "../../features/transactionAsyncActions";

const Header: FC = () => {
  const [advanceSearch, setAdvanceSearch] = useState(false);
  const idInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const showFilters = () => {
    setAdvanceSearch((prev) => !prev);
  };

  const onOpenModalAdd = () => {
    dispatch(transactionActions.toggleModalAdd());
  };

  const handleSearchById = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.code === "Enter") {
      let idEntered = idInputRef.current?.value;
      idEntered = idEntered?.trim();

      if (idEntered) dispatch(getByIdTransactionAction(idEntered));
    }
  };

  const handleReset = () => {
    if (idInputRef.current?.value.length === 0)
      dispatch(getAllTransactionAction());
  };

  return (
    <header>
      <Box
        display="flex"
        padding="2"
        margin="1"
        alignItems="center"
        justifyContent="space-between"
        shadow="md"
        borderWidth="1px"
        marginTop="2"
        gap="5"
      >
        <Box>
          <Heading as="h1" size="lg">
            Transactions
          </Heading>
        </Box>
        <Box display="flex" gap="1" flex="1 1">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<FaSearch color="gray.300" />}
            />
            <Input
              ref={idInputRef}
              type="search"
              aria-label="Search transaction by id"
              placeholder="Transaction ID"
              onKeyDown={handleSearchById}
              onChange={handleReset}
            />
          </InputGroup>

          <IconButton
            aria-label="Advance search"
            icon={<GrFilter />}
            onClick={showFilters}
          />
        </Box>
        <Box>
          <IconButton
            aria-label="Add transaction"
            icon={<MdLibraryAdd />}
            onClick={onOpenModalAdd}
          />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Box>
      </Box>

      {advanceSearch && <AdvanceSearch />}
    </header>
  );
};

export default Header;
