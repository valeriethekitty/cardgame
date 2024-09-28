import React, { StrictMode } from "react"; // taken from tic tac toe tutorial
import { createRoot } from "react-dom/client";
import "./styles.css";

import App from "./solitaire.js";

const root = createRoot(document.getElementById("root"));
root.render(
  // <StrictMode>
    <App />
  // </StrictMode>
);