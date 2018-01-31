import React from "react";
import ConfidenceTimeMap from "./ConfidenceTimeMap";

class CardDisplay extends React.Component {
  static forceStudy = false;

  state = {
    front: true,
    forceStudy: CardDisplay.forceStudy && +new Date() / 1000 < this.props.card.time,
  };

  updateCard = (confidenceChange) => {
    const newConfidence = Math.max(this.props.card.confidence + confidenceChange, 0);
    this.props.updateCard(
      this.props.card.id,
      this.props.card.front,
      this.props.card.back,
      newConfidence,
      (+new Date() + ConfidenceTimeMap(newConfidence)) / 1000,
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
          <div className="Card">{this.props.card.back}</div>
          <br /> I remember this... <br />
          <button
            className="Red-button"
            onClick={() => this.updateCard(-Infinity)}
          >
            not at all
          </button>
          <button
            className="Red-button"
            style={{ margin: "1%" }}
            onClick={() => this.updateCard(-2)}
          >
            poorly
          </button>
          <button className="Yellow-button" onClick={() => this.updateCard(-1)}>
            somewhat
          </button>
          <button
            className="Green-button"
            style={{ margin: "1%" }}
            onClick={() => this.updateCard(+!this.state.forceStudy)}
          >
            pretty well
          </button>
          <button className="Green-button" onClick={() => this.updateCard(2 * +!this.state.forceStudy)}>
            perfectly
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
