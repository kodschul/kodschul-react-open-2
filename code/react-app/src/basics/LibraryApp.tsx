import { useState } from "react";
import DatePicker from "react-datepicker";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { Button } from "react-bootstrap";

const LibraryApp = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div style={styles.main}>
      <h1>ComponentsApp</h1>

      <Button as="a" variant="primary">
        Button as link
      </Button>

      <DatePicker
        selected={startDate}
        onChange={(date) => date && setStartDate(date)}
      />
    </div>
  );
};

const styles: any = {
  main: {
    height: "100vh",
    width: "100vqw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default LibraryApp;
