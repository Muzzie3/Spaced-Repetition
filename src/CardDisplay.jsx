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
      {+new Date() / 1000 < this.props.card.time && !this.state.forceStudy ? (
        <div>
          <div style={{ marginBottom: "40px" }}>No studying currently required</div>
          <button onClick={this.flipForceStudy}>Study anyway (not recommended)</button>
        </div>
      ) : this.state.front ? (
        <button className="Card" onClick={this.flip}>
          <div>{this.props.card.front}</div>
        </button>
      ) : (
        <div>
          <span className="Card">{this.props.card.back}</span>
          <br /> I remember this... <br />
          <button
            style={{ backgroundColor: "indianred" }}
            onClick={() => Math.round(this.updateCard(1, (+new Date() + 10000) / 1000))}
          >
            poorly
          </button>
          <button
            style={{ backgroundColor: "orange", margin: "1%" }}
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
            style={{ backgroundColor: "limegreen" }}
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
        </div>
      )}
      {this.state.forceStudy ? (
        <div>
          <br />
          <button onClick={this.flipForceStudy}>Back to normal studying routine</button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
}

export default CardDisplay;
