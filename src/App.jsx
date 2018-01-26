import React from "react";
import DeckSelection from "./DeckSelection";
import DeckDisplay from "./DeckDisplay";

class App extends React.Component {
  constructor() {
    super();
    window.signIn = googleUser => this.signIn(googleUser);
  }

  state = {
    idToken: null,
    decks: null,
    deck: null,
    cards: [],
  };

  getDecks = (idToken = this.state.idToken) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${window.location.origin}/api/getDecks/${idToken}`);
    xhr.send();
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.setState({ decks: JSON.parse(xhr.responseText).results.map(obj => obj.deck) });
      }
    });
    this.setState({ decks: [] });
  };

  getCards = (idToken = this.state.idToken, deck = this.state.deck) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${window.location.origin}/api/getCards/${idToken}/${deck}`);
    xhr.send();
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.setState({
          cards: JSON.parse(xhr.responseText).results.sort((a, b) => a.time - b.time),
        });
      }
    });
    this.setState({ deck, cards: [] });
  };

  createCard = (front, back, deck) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${window.location.origin}/api/createCard/${this.state.idToken}/${deck}/${front}/${back}`,
    );
    xhr.send();
    xhr.addEventListener("load", () => this.getDecks());
  };

  deleteDeck = (idToken = this.state.idToken, deck) => {
    const xhr = new XMLHttpRequest();
    xhr.open("DELETE", `${window.location.origin}/api/deleteDeck/${idToken}/${deck}`);
    xhr.send();
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.getDecks();
      }
    });
    this.setState({ decks: [] });
  };

  signIn = (googleUser) => {
    this.getDecks(googleUser.getAuthResponse().id_token);
    this.setState({ idToken: googleUser.getAuthResponse().id_token });
  };

  back = () => {
    this.setState({ deck: null, cards: [] });
    this.getDecks();
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
          ) : this.state.deck && this.state.cards.length ? (
            <DeckDisplay
              back={this.back}
              deck={this.state.deck}
              cards={this.state.cards}
              refresh={() => {
                this.getCards();
                this.getDecks();
              }}
              createCard={this.createCard}
            />
          ) : (
            <DeckSelection
              decks={this.state.decks}
              createDeck={deck => this.createCard("placeholder", "placeholder", deck)}
              getDeck={deck => this.getCards(this.state.idToken, deck)}
            />
          )}
        </div>
        <div />
      </div>
    </div>
  );
}

export default App;
