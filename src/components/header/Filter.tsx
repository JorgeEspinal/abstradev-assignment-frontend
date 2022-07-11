import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { FC, FormEvent, useRef, useState } from "react";
import { getByFilterTransactionAction } from "../../features/transactionAsyncActions";
import { useAppDispatch } from "../../store/configureStore";

const Filter: FC = () => {
  const [searchError, setSearchError] = useState("");
  const metadataInputRef = useRef<HTMLTextAreaElement>(null);
  const dispatch = useAppDispatch();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    try {
      let metadataEntered = metadataInputRef.current?.value;

      if (!metadataEntered) setSearchError("JSON format incorrect.");

      const data = JSON.parse(metadataEntered ? metadataEntered : "");

      dispatch(getByFilterTransactionAction(data));
    } catch (err: unknown) {
      let message = "";
      if (typeof err === "string") message = err;
      else if (err instanceof Error) message = err.message;

      setSearchError(message);
    }
  };

  return (
    <Box marginTop="2">
      <form onSubmit={onSubmit}>
        <FormControl isInvalid={searchError ? true : false}>
          <FormLabel htmlFor="metadata">Metadata</FormLabel>
          <Textarea
            ref={metadataInputRef}
            id="metadata"
            placeholder="Enter a JSON format valid."
          />
          <FormErrorMessage>{searchError}</FormErrorMessage>
        </FormControl>
        <Box display="flex" justifyContent="flex-end" marginTop="5">
          <Button colorScheme="green" type="submit">
            Search
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Filter;
