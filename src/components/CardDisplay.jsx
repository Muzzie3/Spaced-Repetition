import React from "react";
import ConfidenceToTime from "./ConfidenceToTime";

class CardDisplay extends React.Component {
  state = { front: true };

  updateCard = (confidenceChange) => {
    // updates card confidence and next review time based on how well the user remembered it
    const newConfidence = Math.max(this.props.card.confidence + confidenceChange, 0);
    this.props.updateCard(
      this.props.card.id,
      this.props.card.front,
      this.props.card.back,
      newConfidence,
      (+new Date() + (1000 * ConfidenceToTime(newConfidence))) / 1000,
    );
  };

  flip = () => this.setState({ front: false });

  render = () => {
    const forceStudy = this.props.forceStudy && +new Date() / 1000 < this.props.card.time;
    return (
      <div>
        {+new Date() / 1000 < this.props.card.time && !forceStudy ? (
          <div>
            <div style={{ marginBottom: "40px" }}>No studying currently required</div>
            <button onClick={this.props.flipForceStudy}>Study anyway (not recommended)</button>
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
              onClick={() => this.updateCard(+!forceStudy)}
            >
              pretty well
            </button>
            <button className="Green-button" onClick={() => this.updateCard(2 * +!forceStudy)}>
              perfectly
            </button>
          </div>)}
        {forceStudy ? (
          <div>
            <br />
            <button onClick={this.props.flipForceStudy}>Back to normal studying routine</button>
          </div>
        ) : (<div />)
        }
      </div>
    );
  };
}

export default CardDisplay;
