import React, { Component, useState } from "react";

export default class AppClass extends Component {
  state = {
    user: { name: "test" },
  };
  render() {
    const state = useState();
    return (
      <div onClick={() => this.setState({ ...this.state, name: "sdasd" })}>
        App-class
      </div>
    );
  }
}
