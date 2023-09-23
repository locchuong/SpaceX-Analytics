import React from "react";

import { Routes } from "@generouted/react-router";
import ReactDOM from "react-dom/client";

import "~/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
);
