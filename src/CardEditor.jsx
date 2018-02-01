import React from "react";

class CardEditor extends React.Component {
  // CardEditor is a controlled component that is used to gather user text input
  // It looks like a normal card, but clicking it turns it into a form to input text
  state = { value: this.props.initialValue, editing: false };

  render = () =>
    (this.state.editing ? (
      <form
        onSubmit={(e) => {
          this.props.submit(this.state.value);
          e.preventDefault();
        }}
      >
        <input
          className="Card-editor"
          style={{ width: "100%" }}
          value={this.state.value}
          onChange={e => this.setState({ value: e.target.value })}
        />
        <input type="submit" style={{ display: "none" }} />
      </form>
    ) : (
      <button className="Card-editor" onClick={() => this.setState({ editing: true })}>
        {this.state.value}
      </button>
    ));
}

export default CardEditor;
