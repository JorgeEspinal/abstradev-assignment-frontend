import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
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
  const [isCreating, setIsCreating] = useState(false);
  const [errorForm, setErrorForm] = useState<{
    message: string;
    input: "data" | "metadata" | unknown;
    type: "form" | "server" | unknown;
  }>({ message: "", input: undefined, type: undefined });

  const onClose = () => {
    dispatch(transactionActions.toggleModalAdd());
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setIsCreating(true);

    try {
      let dataEntered = dataInputRef.current?.value;
      let metadataEntered = metadataInputRef.current?.value;

      if (!dataEntered) {
        setErrorForm((prev) => ({
          ...prev,
          message: "Invalid JSON format",
          type: "form",
          input: "data",
        }));
        setIsCreating(false);
        return;
      }

      if (!metadataEntered) {
        setErrorForm((prev) => ({
          ...prev,
          message: "Invalid JSON format",
          type: "form",
          input: "metadata",
        }));
        setIsCreating(false);
        return;
      }

      const data = {
        transactionData: JSON.parse(dataEntered ? dataEntered : ""),
        transactionMetadata: JSON.parse(metadataEntered ? metadataEntered : ""),
      };

      dispatch(createTransactionAction(data));

      if (!error && !loading) {
        enqueueSnackbar("Transaction add", {
          variant: "success",
        });
        setIsCreating(false);
        dispatch(transactionActions.toggleModalAdd());
      } else
        setErrorForm((prev) => ({
          ...prev,
          type: "server",
          message: "Unable to create transaction, API error",
          input: undefined,
        }));
    } catch (err: unknown) {
      let message = "";
      if (typeof err === "string") message = err;
      else if (err instanceof Error) message = err.message;
      setIsCreating(false);

      setErrorForm((prev) => ({
        ...prev,
        message: message,
        type: "form",
        input: undefined,
      }));
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
                  <Radio value="create" disabled>
                    Create JSON format
                  </Radio>
                </Stack>
              </RadioGroup>
            </FormControl>
            <FormControl
              isInvalid={
                errorForm.message &&
                errorForm.type === "form" &&
                errorForm.input === "data"
                  ? true
                  : false
              }
            >
              <FormLabel htmlFor="data">Data</FormLabel>
              <Textarea
                ref={dataInputRef}
                placeholder="Enter JSON format."
                id="data"
                size="sm"
                resize="vertical"
              />
              {errorForm.message && errorForm.input === "data" && (
                <FormErrorMessage>{errorForm.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl
              isInvalid={
                errorForm.message &&
                errorForm.type === "form" &&
                errorForm.input === "metadata"
                  ? true
                  : false
              }
            >
              <FormLabel htmlFor="metadata">Metadata</FormLabel>
              <Textarea
                ref={metadataInputRef}
                placeholder="Enter JSON format."
                id="metadata"
                size="md"
                resize="vertical"
              />
              {errorForm.message && errorForm.input === "metadata" && (
                <FormErrorMessage>{errorForm.message}</FormErrorMessage>
              )}
            </FormControl>
            <Box marginTop="5" display="flex" justifyContent="flex-end">
              <Button
                colorScheme="blue"
                mr={3}
                onClick={onClose}
                disabled={isCreating}
              >
                Close
              </Button>
              <Button colorScheme="green" type="submit" disabled={isCreating}>
                Add
              </Button>
            </Box>
          </form>
        </ModalBody>

        <ModalFooter>
          {errorForm.message && !errorForm.input && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorForm.message}</AlertDescription>
            </Alert>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTransaction;
