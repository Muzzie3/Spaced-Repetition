import React from "react";
import ReactDOM from "react-dom";
import App from "../App";
import CardDisplay from "../CardDisplay";
import CardEditor from "../CardEditor";
import DeckDisplay from "../DeckDisplay";
import DeckSelection from "../DeckSelection";
import Display from "../Display";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.render(<CardDisplay card={{}} />, div);
  ReactDOM.render(<CardEditor initialValue="" />, div);
  ReactDOM.render(<DeckDisplay cards={[]} />, div);
  ReactDOM.render(<DeckSelection decks={[]} />, div);
  ReactDOM.render(
    <Display
      cards={[
        {
          id: 0,
          front: "",
          back: "",
          time: 0,
          confidence: 0,
        },
        {
          id: 0,
          front: "",
          back: "",
          time: 0,
          confidence: 0,
        },
      ]}
    />,
    div,
  );
});
