import React, { useEffect, useState } from "react";

import ThemeApp from "./theme/with-global-state/theme-app";
import RickyMortyApp from "./rickmorty/app-fetch-rq";

const AppNav = () => {
  const [page, setPage] = useState("");

  useEffect(() => {
    const path = window.location.pathname;
    setPage(path);
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          setPage("/characters");

          window.location.href = "/characters";
        }}
      >
        Set to characters page{" "}
      </button>
      <button onClick={() => setPage("/theme")}>Set to theme page </button>
      <a href="/characters">Go to characters page</a>
      <a href="/theme">Go to theme page</a>
      {page == "/theme" && <ThemeApp />}
      {page == "/characters" && <RickyMortyApp />}
    </div>
  );
};

export default AppNav;
