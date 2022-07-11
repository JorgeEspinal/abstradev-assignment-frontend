import { ChakraProvider, theme } from "@chakra-ui/react";
import { SnackbarProvider } from "notistack";

import Dashboard from "./components/dashboard";

export const App = () => (
  <SnackbarProvider>
    <ChakraProvider theme={theme}>
      <Dashboard />
    </ChakraProvider>
  </SnackbarProvider>
);
