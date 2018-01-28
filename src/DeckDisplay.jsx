import React from "react";

const DeckDisplay = props => (
  <div>
    <button
      className="Card-editor"
      onClick={() => props.createCard(window.prompt("Front"), window.prompt("Back"))}
    >
      Create new card
    </button>
    {props.cards.map(card => (
      <div key={card.id} style={{ border: "2px solid black", margin: "5px" }}>
        <div>
          {`Level: ${card.confidence}`} <br />{" "}
          {`Time: ${new Date(card.time * 1000).toLocaleString()}`}
          <div>
            <button style={{ backgroundColor: "indianred" }} onClick={() => props.deleteCard(card.id)}>Delete</button>
          </div>
        </div>
        <button className="Card-editor" style={{ marginBottom: "5px" }}>
          {card.front}
        </button>
        <button className="Card-editor">{card.back}</button>
      </div>
    ))}
  </div>
);

export default DeckDisplay;
