import React from "react";

const DeckDisplay = props => (
  <div>
    <button onClick={props.toTraining}>Train</button>
    <div />
    <button
      onClick={() =>
        props.createCard(window.prompt("Front"), window.prompt("Back"))
      }
    >
      Create
    </button>
    {props.cards.map(card => (
      <div key={card.id}>
          {`Front: ${card.front} Back: ${card.back} Level: ${card.confidence} Time: ${new Date(card.time * 1000).toLocaleString()}`}
          <button onClick={() => props.deleteCard(card.id)}>Delete</button>
      </div>
    ))}
  </div>
);

export default DeckDisplay;
