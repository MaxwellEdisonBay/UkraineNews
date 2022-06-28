import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ContextProvider } from "./context/Context";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
