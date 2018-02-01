import React from "react";
import CardDisplay from "./CardDisplay";
import DeckDisplay from "./DeckDisplay";

class Display extends React.Component {
  static studying = true;
  // static variable used to preserve value between renders

  state = { studying: Display.studying };

  updateCard = (id, front, back, confidence, time) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "PATCH",
      `${window.location.origin}/api/updateCard/${id}/${front}/${back}/${confidence}/${time}`,
    );
    xhr.send();
    xhr.addEventListener("load", this.props.rereadCards);
  };

  // updateCard() and deleteCard() do what you expect, then reread the changed data from the server

  deleteCard = (id) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${window.location.origin}/api/deleteCard/${id}`);
    xhr.send();
    xhr.addEventListener("load", this.props.rereadAll);
  };

  flipView = () => this.setState({ studying: (Display.studying = !Display.studying) });

  render = () => (
    <div className="Display">
      <div>
        <button style={{ marginBottom: "40px" }} onClick={this.props.back}>Back</button> <br />
        <button onClick={() => this.setState({ studying: (Display.studying = !Display.studying) })}>
          {this.state.studying ? "View Deck" : "Study"}
        </button>
      </div>
      {this.state.studying ? (
        <CardDisplay card={this.props.cards[0]} updateCard={this.updateCard} />
        // CardDisplay displays the individual card that is being studied
        // This is why App.state.cards needs to always be sorted
        // I would slice() if it weren't for the memory use
      ) : (
        <DeckDisplay
          cards={this.props.cards}
          createCard={this.props.createCard}
          updateCard={this.updateCard}
          deleteCard={this.deleteCard}
        />
        // DeckDisplay displays the entire deck for user viewing and lets the user modify it
      )}
    </div>
  );
}

export default Display;
