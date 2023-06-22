import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StudentsPerPageProvider } from "./contexts/StudentsPerPageContext";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={client}>
    <StudentsPerPageProvider>
      <App />
    </StudentsPerPageProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
