import { useState } from "react";
import DatePicker from "react-datepicker";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { Button, Dropdown } from "react-bootstrap";

const AbcComponent = function () {
  return <div>Hello World!</div>;
};

const LibraryApp = () => {
  const [startDate, setStartDate] = useState(new Date());

  console.log({ startDate });
  return (
    <div style={styles.main}>
      <AbcComponent />
      <h1>ComponentsApp</h1>

      <Button as="a" variant="primary">
        Button as link
      </Button>

      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date as Date)}
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
