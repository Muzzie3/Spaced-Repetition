import React from "react";
import PositionButton from "./exampleComponent";

const App = () => (
  <div className="App">
    <header className="App-header">
      <h1 className="App-title">A React.js program</h1>
    </header>
    <div className="App-intro">
      <div>
        <PositionButton number="1" />
      </div>
      <div>
        To get started, edit <code>src/App.js</code> and save to reload.
      </div>
      <div>
        <PositionButton number="2" />
      </div>
    </div>
  </div>
);

export default App;
