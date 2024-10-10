import "core-js/stable/index.js";
import "regenerator-runtime/runtime.js";
import "./index.css";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";

import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <MantineProvider>
    <App />
  </MantineProvider>
);