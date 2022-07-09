import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "../../ColorModeSwitcher";
import { FaSearch } from "react-icons/fa";
import { GrFilter } from "react-icons/gr";
import { MdLibraryAdd } from "react-icons/md";
import { FC, useState } from "react";
import AdvanceSearch from "./AdvanceSearch";

const Header: FC = () => {
  const [advanceSearch, setAdvanceSearch] = useState(false);

  const showFilters = () => {
    setAdvanceSearch((prev) => !prev);
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
            <Input type="search" placeholder="Transaction ID" />
          </InputGroup>

          <IconButton
            aria-label="Advance search"
            icon={<GrFilter />}
            onClick={showFilters}
          />
        </Box>
        <Box>
          {/* <Button
            leftIcon={<MdLibraryAdd />}
            colorScheme="teal"
            variant="solid"
          >
            Transaction
          </Button> */}
          <IconButton aria-label="Add transaction" icon={<MdLibraryAdd />} />
          <ColorModeSwitcher justifySelf="flex-end" />
        </Box>
      </Box>

      {advanceSearch && <AdvanceSearch />}
    </header>
  );
};

export default Header;
