import "bootstrap/dist/css/bootstrap.min.css";
import { ReactNode, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

type GreetingProps = {
  name: string;
  /** what is your age? */
  age?: number;
};

const Greeting = (props: GreetingProps) => {
  return <h2> Hello {props.name} </h2>;
};

const Hello = (props) => {
  return <h2> {props.children} </h2>;
};

type CardProps = {
  children: React.ReactNode;
};

const Card = ({ children }: CardProps) => {
  return (
    <div style={{ background: "purple", padding: 10, borderRadius: 30 }}>
      {children}
    </div>
  );
};

type ButtonProps = {
  onPress: () => void;
  children: ReactNode;
};

const Button = (props: ButtonProps) => {
  const handleClick = () => {
    console.log("Button was clicked!");
    props.onPress();
  };
  return (
    <div
      onClick={handleClick}
      style={{
        cursor: "pointer",
        background: "green",
        padding: 10,
        borderRadius: 15,
      }}
    >
      {props.children}
    </div>
  );
};

const MyInput = (props) => {
  return (
    <input
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
};

type HiProps = {
  name: string;
  age?: number;
  children?: React.ReactNode;
};

const Hi = ({ name, children }: HiProps) => {
  return (
    <div style={{ backgroundColor: "blue", margin: 10 }}>
      Hi {name} {children}
    </div>
  );
};

const ComponentsApp = () => {
  const [value, setValue] = useState("");
  return (
    <div style={styles.main}>
      <h1>ComponentsApp</h1>

      <Hi name={"Franz"} />

      <Hi name={"Marie"} age={15} children={"Abc"} />

      <Button onPress={() => alert("Hi Wassup")}>
        <Hi name={"Ceaser"}>
          <div> This is a div</div>
        </Hi>
      </Button>

      <MyInput value={value} onChange={setValue} />

      <Card>
        <Greeting name="Alice" />
        <Greeting name="Bob" />
        {/* {Array.from(Array(10000).keys()).map((x) => (
          <Greeting name={x.toString()} />
        ))} */}
      </Card>

      <Button onPress={() => alert("Hi Wassup")}>
        <Hello>Hi Wassup!</Hello>
      </Button>

      <Button onPress={() => alert("clicked!")}>Click me</Button>
      {/* <Hello children={"Hi wassup!"} /> */}
    </div>
  );
};

const styles: any = {
  main: {
    minHeight: "100vh",
    width: "100vqw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default ComponentsApp;
