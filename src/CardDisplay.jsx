import React from "react";

class CardDisplay extends React.Component {
  state = { x: null, y: null };
  render() {
    return (
      <button onClick={e => this.setState({ x: e.clientX, y: e.clientY })}>
        {`Button Number=${this.props.number} X=${this.state.x} Y=${this.state.y}`}
      </button>
    );
  }
}

export default CardDisplay;
