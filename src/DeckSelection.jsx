import React from "react";

const DeckSelection = props => (
  <div className="Deck-selection">
    {props.decks.map(deck => (
      <div key={deck}>
        <button onClick={() => props.getDeck(deck)}>{deck}</button>
      </div>
    ))}
    <button onClick={() => props.createDeck(window.prompt("Deck name?"))}>
      New deck
    </button>
  </div>
);

export default DeckSelection;
