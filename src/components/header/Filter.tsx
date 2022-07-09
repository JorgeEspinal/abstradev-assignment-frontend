import { Box, FormLabel, Input } from "@chakra-ui/react";
import { FC, Fragment } from "react";

const Filter: FC = () => {
  return (
    <Box>
      <FormLabel htmlFor="key">Key</FormLabel>
      <Input id="key" type="text" placeholder="Enter a key" />
      <FormLabel htmlFor="value">Value</FormLabel>
      <Input id="value" type="text" placeholder="Enter a value" />
    </Box>
  );
};

export default Filter;
