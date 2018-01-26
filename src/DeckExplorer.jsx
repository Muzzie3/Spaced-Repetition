import React from "react";

const DeckExplorer = props => (
  <div className="explorer">
    {props.cards.map(card => (
      <div key={card.id}>
        <div>
          {`Front: ${card.front} Back: ${card.back} Level: ${card.confidence} Time: ${new Date(card.time * 1000).toLocaleString()}`}
          <button onClick={() => props.deleteCard(card.id)}>Delete</button>
        </div>
      </div>
    ))}
    <button
      onClick={() =>
        props.createCard(window.prompt("Front"), window.prompt("Back"), props.cards[0].deck)
      }
    >
      Create
    </button>
  </div>
);

export default DeckExplorer;
