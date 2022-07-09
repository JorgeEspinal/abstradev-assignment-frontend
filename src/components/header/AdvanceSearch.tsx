import { Box, FormControl, FormLabel, Heading, Input } from "@chakra-ui/react";
import { FC } from "react";
import Filter from "./Filter";

const AdvanceSearch: FC = () => {
  return (
    <Box
      shadow="md"
      borderWidth="1px"
      padding="2"
      marginTop="2"
      marginBottom="2"
      marginLeft="7"
      marginRight="7"
    >
      <Heading as="h2" size="md">
        Advance search
      </Heading>
      <FormControl>
        {/* <FormLabel htmlFor="key">Key</FormLabel>
        <Input id="key" type="text" placeholder="Enter a key" />
        <FormLabel htmlFor="value">Value</FormLabel>
        <Input id="value" type="text" placeholder="Enter a value" /> */}
        <Filter />
      </FormControl>
    </Box>
  );
};

export default AdvanceSearch;
