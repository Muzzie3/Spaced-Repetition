import React from "react";
import DeckSelection from "./DeckSelection";
import CardDisplay from "./CardDisplay";

class App extends React.Component {
  constructor() {
    super();
    window.signIn = googleUser => this.signIn(googleUser);
  }

  state = {
    idToken: false,
    decks: null,
    deck: null,
    cards: null,
    cardId: null,
  };

  getDecks = (token = this.state.idToken) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${window.location.origin}/api/getDecks/${token}`);
    xhr.send();
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.setState({ decks: JSON.parse(xhr.responseText).results });
      }
    });
    this.setState({ decks: [] });
  };

  signIn = (googleUser) => {
    this.getDecks(googleUser.getAuthResponse().id_token);
    this.setState({ idToken: googleUser.getAuthResponse().id_token });
  };

  cardCreator = (front = "placeholder", back = "placeholder", deck = "placeholder") => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${window.location.origin}/api/createCard/${this.state.idToken}/${deck}/${front}/${back}`,
    );
    xhr.send();
    xhr.addEventListener("load", () => this.getDecks());
  };

  render = () => (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Spaced Repetition</h1>
      </header>
      <div className="App-intro">
        <div />
        <div>
          {!this.state.idToken ? (
            <div className="g-signin2" data-theme="dark" data-onsuccess="signIn" />
          ) : !this.state.deck ? (
            <DeckSelection decks={this.state.decks} onClick={this.cardCreator} />
          ) : (
            <CardDisplay card={this.state.cards[this.state.cardId]} />
          )}
        </div>
        <div />
      </div>
    </div>
  );
}

export default App;
