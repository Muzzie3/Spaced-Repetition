import React from "react";
import CardEditor from "./CardEditor";

const DeckDisplay = props => (
  <div>
    <button
      className="Green-button"
      onClick={props.createCard}
    >
      New Card
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
        <CardEditor
          initialValue={card.front}
          submit={value => props.updateCard(card.id, value, card.back, card.confidence, card.time)}
        />
        <CardEditor
          initialValue={card.back}
          submit={value => props.updateCard(card.id, card.front, value, card.confidence, card.time)}
        />
      </div>
    ))}
  </div>
);

export default DeckDisplay;
