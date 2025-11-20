import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";

import * as Mantine from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import "@mantine/core/styles.css";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Mantine.MantineProvider>
      <QueryClientProvider client={queryClient}>
        <ModalsProvider>
          <App />
        </ModalsProvider>
      </QueryClientProvider>
    </Mantine.MantineProvider>
  </StrictMode>
);
