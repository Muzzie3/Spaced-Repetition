import React from "react";

class CardDisplay extends React.Component {
  static forceStudy = false;

  state = {
    front: true,
    forceStudy: CardDisplay.forceStudy && +new Date() / 1000 < this.props.card.time,
  };

  updateCard = (confidence, time) => {
    this.props.updateCard(
      this.props.card.id,
      this.props.card.front,
      this.props.card.back,
      confidence,
      time,
    );
  };

  flip = () => this.setState({ front: false });

  flipForceStudy = () =>
    this.setState({ forceStudy: (CardDisplay.forceStudy = !CardDisplay.forceStudy) });

  render = () => (
    <div>
      <button onClick={this.props.toDeckExplorer}>View Deck</button>
      {+new Date() / 1000 < this.props.card.time && !this.state.forceStudy ? (
        <div>
          <div>No studying currently required</div>
          <button onClick={this.flipForceStudy}>Study anyway</button>
        </div>
      ) : this.state.front ? (
        <div>
          <div>{this.props.card.front}</div>
          <button onClick={this.flip}>Flip</button>
        </div>
      ) : (
        <div>
          <div>{this.props.card.back}</div> I remember this...
          <button
            onClick={() =>
              this.updateCard(
                this.props.card.confidence + +!this.state.forceStudy,
                Math.round((+new Date() +
                    10000 * (this.props.card.confidence + +!this.state.forceStudy) ** 4) /
                    1000),
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
          <button
            onClick={() => Math.round(this.updateCard(1, (+new Date() + 10000) / 1000))}
          >
            poorly
          </button>
        </div>
      )}
      {this.state.forceStudy ? (
        <button onClick={this.flipForceStudy}>Back to normal studying routine</button>
      ) : (
        <div />
      )}
    </div>
  );
}

export default CardDisplay;
