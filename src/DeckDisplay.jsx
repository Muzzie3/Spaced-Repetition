import React from "react";
import CardDisplay from "./CardDisplay";
import DeckExplorer from "./DeckExplorer";

class DeckDisplay extends React.Component {
  updateCard = (id, front, back, confidence, time) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "PATCH",
      `${window.location.origin}/api/updateCard/${id}/${front}/${back}/${confidence}/${time}`,
    );
    xhr.send();
    xhr.addEventListener("load", this.props.refresh);
  };

  deleteCard = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${window.location.origin}/api/deleteCard/${id}`);
    xhr.send();
    xhr.addEventListener("load", this.props.refresh);
  };

  render = () => (
    <div>
      <button onClick={this.props.back}>Back</button>
      <CardDisplay
        card={this.props.cards[0] || {}}
        updateCard={this.updateCard}
      />
      <DeckExplorer
        cards={this.props.cards}
        createCard={(front, back) => {
          this.props.createCard(front, back, this.props.deck);
          this.props.refresh();
        }}
        updateCard={this.updateCard}
        deleteCard={this.deleteCard}
      />
    </div>
  );
}

export default DeckDisplay;
