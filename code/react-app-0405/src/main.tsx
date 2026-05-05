import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./ComponentApp-one-by-one.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
