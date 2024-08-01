import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CounterAppHook from "./hooks/CounterAppHook";
import reportWebVitals from "./reportWebVitals";
import RickMortyApp from "./rick-morty/App";

import CounterApp from "./basics/CounterApp";
import ListItemsWithDelete from "./basics/ListItems-with-delete";
import LibraryApp from "./basics/LibraryApp";
import ThemeAppContext from "./theme-app/ThemeApp";
import ComponentsApp from "./basics/ComponentsApp";
import TodoApp from "./basics/TodoApp";
import UseEffectApp from "./hooks/UseEffectApp";
import TimeNowApp from "./hooks/TimeNowApp";
import CountDownApp from "./hooks/CountDownApp";
import CounterAppSimple from "./basics/CounterApp-simple";
import ThemeAppWithoutContext from "./theme-app/without-context/ThemeAppWithoutContext";
import ThemeApp from "./theme-app/ThemeApp";
import InputFields from "./basics/InputFields";
import CounterAppHookSimple from "./hooks/CounterAppHook-demo";
import FetchApp from "./api/FetchApp";
import FetchAppSimple from "./api/FetchAppSimple";
import FetchAppAxios from "./api/FetchAppAxios";
import FetchAppRQ from "./api/FetchAppRQ";
import App from "./router-app/App";
import CounterAppBasics from "./basics/CounterAppBasics";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <CounterAppBasics />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
