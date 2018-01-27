import React from "react";
import CardDisplay from "./CardDisplay";
import DeckDisplay from "./DeckDisplay";

class Display extends React.Component {
  static studying = true;

  state = { studying: Display.studying };

  updateCard = (id, front, back, confidence, time) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "PATCH",
      `${window.location.origin}/api/updateCard/${id}/${front}/${back}/${confidence}/${time}`,
    );
    xhr.send();
    xhr.addEventListener("load", this.props.refreshCards);
  };

  deleteCard = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${window.location.origin}/api/deleteCard/${id}`);
    xhr.send();
    xhr.addEventListener("load", this.props.refresh);
  };

  flipView = () => this.setState({ studying: (Display.studying = !Display.studying) });

  render = () => (
    <div>
      <button onClick={this.props.back}>Back</button>
      {this.state.studying ? (
        <CardDisplay
          card={this.props.cards[0] || {}}
          updateCard={this.updateCard}
          toDeckExplorer={this.flipView}
        />
      ) : (
        <DeckDisplay
          cards={this.props.cards}
          createCard={this.props.createCard}
          updateCard={this.updateCard}
          deleteCard={this.deleteCard}
          toTraining={this.flipView}
        />
      )}
    </div>
  );
}

export default Display;
