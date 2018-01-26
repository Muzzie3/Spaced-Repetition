import React from "react";

class DeckDisplay extends React.Component {
  state = { x: null, y: null };
  render() {
    return (
      <div>
        <button onClick={this.props.back}>Back</button>
        {this.props.cards.map(card => (
          <div key={card.id}>
            <button onClick={() => this.props.getDeck(card.front)}>{card.front}</button>
          </div>
        ))}
      </div>
    );
  }
}

export default DeckDisplay;
