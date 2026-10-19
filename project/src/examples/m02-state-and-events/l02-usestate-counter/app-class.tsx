import { Component } from "react";

// Nur zur Wiedererkennung: So sah derselbe Counter in älteren Projekten mit Klassenkomponenten aus.
// Neue Projekte nutzen Funktionskomponenten mit Hooks (siehe index.tsx).
type State = { count: number };

class App extends Component<object, State> {
  state: State = { count: 100 };

  handleCountUp = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <main style={{ padding: 32, minHeight: "100vh", backgroundColor: "darkblue", color: "white" }}>
        <h1>Counter App (Klassenkomponente)</h1>
        <div style={{ fontSize: 40, fontWeight: "bold" }}>{this.state.count}</div>
        <button onClick={this.handleCountUp}>+</button>
      </main>
    );
  }
}

export default App;
