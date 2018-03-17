import React from "react";
import CardEditor from "./CardEditor";

const DeckSelection = props => (
  <div className="Deck-selection">
    {props.decks.map(deck => (
      <div key={deck}>
        <button onClick={() => props.selectDeck(deck)}>{deck}</button>
      </div>
    ))}
    <CardEditor initialValue="New Deck" submit={props.createDeck} />
  </div>
);

export default DeckSelection;
