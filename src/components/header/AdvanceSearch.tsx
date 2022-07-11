import { Box, FormControl, Heading } from "@chakra-ui/react";
import { FC } from "react";
import Filter from "./Filter";

const AdvanceSearch: FC = () => {
  return (
    <Box
      shadow="md"
      borderWidth="1px"
      padding="2"
      marginTop="5"
      marginBottom="10"
      marginLeft="1"
      marginRight="1"
    >
      <Heading as="h2" size="md">
        Advance search
      </Heading>
      <FormControl>
        <Filter />
      </FormControl>
    </Box>
  );
};

export default AdvanceSearch;
