import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useSnackbar } from "notistack";
import { FC, FormEvent, useRef, useState } from "react";
import { createTransactionAction } from "../../features/transactionAsyncActions";
import { transactionActions } from "../../features/transactionSlice";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";

const AddTransaction: FC = () => {
  const [typeFormat, setTypeFormat] = useState("set");
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const {
    isOpenModalAdd: isOpen,
    error,
    loading,
  } = useAppSelector((state) => state.transaction);
  const dataInputRef = useRef<HTMLTextAreaElement>(null);
  const metadataInputRef = useRef<HTMLTextAreaElement>(null);

  const onClose = () => {
    dispatch(transactionActions.toggleModalAdd());
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    try {
      let dataEntered = dataInputRef.current?.value;
      let metadataEntered = metadataInputRef.current?.value;

      if (!dataEntered || !metadataEntered)
        dispatch(transactionActions.setError("Format invalid!"));

      const data = {
        transactionData: JSON.parse(dataEntered ? dataEntered : ""),
        transactionMetadata: JSON.parse(metadataEntered ? metadataEntered : ""),
      };

      dispatch(createTransactionAction(data));

      if (!error && !loading) {
        enqueueSnackbar("Transaction add", {
          variant: "success",
        });
        dispatch(transactionActions.toggleModalAdd());
      }
    } catch (err: unknown) {
      let message = "";
      if (typeof err === "string") message = err;
      else if (err instanceof Error) message = err.message;
      dispatch(transactionActions.setError(message));
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={onSubmit}>
            <FormControl>
              <RadioGroup
                defaultValue={typeFormat}
                onChange={setTypeFormat}
                mb={6}
              >
                <Stack direction="row" spacing={5}>
                  <Radio value="set">Set JSON format</Radio>
                  <Radio value="create">Create JSON format</Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="data">Data</FormLabel>
              <Textarea
                ref={dataInputRef}
                placeholder="Enter JSON format."
                id="data"
                size="sm"
                resize="vertical"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="metadata">Metadata</FormLabel>
              <Textarea
                ref={metadataInputRef}
                placeholder="Enter JSON format."
                id="metadata"
                size="md"
                resize="vertical"
              />
            </FormControl>
            <Box marginTop="5" display="flex" justifyContent="flex-end">
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onClose}
                disabled={loading}
              >
                Close
              </Button>
              <Button colorScheme="green" type="submit" disabled={loading}>
                Add
              </Button>
            </Box>
          </form>
        </ModalBody>

        <ModalFooter>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTransaction;
