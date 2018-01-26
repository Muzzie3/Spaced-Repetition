import React from "react";

class CardDisplay extends React.Component {
  state = { front: true };

  updateCard = (confidence, time) => {
    this.setState({ front: true });
    this.props.updateCard(
      this.props.card.id,
      this.props.card.front,
      this.props.card.back,
      confidence,
      time,
    );
  };

  render = () => (
    <div>
      {this.state.front ? (
        <div>
          <div>{this.props.card.front}</div>
          <button onClick={() => this.setState({ front: false })}>Flip</button>
        </div>
      ) : (
        <div>
          <div>{this.props.card.back}</div> I remember this...
          <button
            onClick={() =>
              this.updateCard(
                this.props.card.confidence + 1,
                Math.round((+new Date() + 10000 * (this.props.card.confidence + 1) ** 4) / 1000),
              )
            }
          >
            well
          </button>
          <button
            onClick={() =>
              this.updateCard(
                this.props.card.confidence,
                Math.round((+new Date() + 10000 * this.props.card.confidence ** 4) / 1000),
              )
            }
          >
            somewhat
          </button>
          <button onClick={() => Math.round(this.props.updateCard(0, +new Date() / 1000))}>
            poorly
          </button>
        </div>
      )}
    </div>
  );
}

export default CardDisplay;
