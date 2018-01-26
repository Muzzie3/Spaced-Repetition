import React from "react";

class DeckSelection extends React.Component {
  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.props.onClick("placeholder", "placeholder", window.prompt("What to add?"))
          }
        >
          Add deck
        </button>
        <ul>{this.props.decks.map(v => <li>{v.deck}</li>)}</ul>
      </div>
    );
  }
}

export default DeckSelection;
