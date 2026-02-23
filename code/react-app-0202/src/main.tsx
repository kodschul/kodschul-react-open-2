import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App-with-router";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
