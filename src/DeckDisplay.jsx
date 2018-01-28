import React from "react";

const DeckDisplay = props => (
  <div>
    <button
      className="Green-button"
      onClick={() => props.createCard(window.prompt("Front"), window.prompt("Back"))}
    >
      Create new card
    </button>
    <br />
    {props.cards.map(card => (
      <div className="Card-displayer" key={card.id}>
        <div>
          {`Level: ${card.confidence}`} <br />{" "}
          {`Time: ${new Date(card.time * 1000).toLocaleString()}`}
          <br />
          <button className="Red-button" onClick={() => props.deleteCard(card.id)}>
            Delete
          </button>
        </div>
        <button
          className="Card-editor"
          onClick={() =>
            props.updateCard(
              card.id,
              window.prompt("New Front?"),
              card.back,
              card.confidence,
              card.time,
            )
          }
        >
          {card.front}
        </button>
        <button
          className="Card-editor"
          onClick={() =>
            props.updateCard(
              card.id,
              card.front,
              window.prompt("New Back?"),
              card.confidence,
              card.time,
            )
          }
        >
          {card.back}
        </button>
      </div>
    ))}
  </div>
);

export default DeckDisplay;
