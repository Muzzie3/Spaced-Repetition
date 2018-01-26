import React from "react";

const DeckSelection = props => (
  <div>
    <button onClick={() => props.createDeck(window.prompt("Deck name?"))}>Add deck</button>
    {props.decks.map(deck => (
      <div key={deck}>
        <button onClick={() => props.getDeck(deck)}>{deck}</button>
      </div>
    ))}
  </div>
);

export default DeckSelection;
