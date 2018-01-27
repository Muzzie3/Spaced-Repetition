import React from "react";
import DeckSelection from "./DeckSelection";
import Display from "./Display";

class App extends React.Component {
  constructor() {
    super();
    window.signIn = googleUser => this.signIn(googleUser);
  }

  state = {
    idToken: null,
    decks: null,
    cards: [],
  };

  deck = null;

  readDecks = (idToken = this.state.idToken) => {
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

  readCards = (deck = this.deck) => {
    this.deck = deck;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${window.location.origin}/api/getCards/${this.deck}/${this.state.idToken}`);
    xhr.send();
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.setState({
          cards: JSON.parse(xhr.responseText).results.sort((a, b) => a.time - b.time),
        });
      }
    });
    this.setState({ cards: [] });
  };

  createDeck = (deck) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${window.location.origin}/api/createCard/${deck}/placeholder/placeholder/${
        this.state.idToken
      }`,
    );
    xhr.send();
    xhr.addEventListener("load", () => this.readDecks());
  };

  createCard = (front, back) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${window.location.origin}/api/createCard/${this.deck}/${front}/${back}/${
        this.state.idToken
      }`,
    );
    xhr.send();
    xhr.addEventListener("load", () => this.readCards());
  };

  signIn = (googleUser) => {
    this.readDecks(googleUser.getAuthResponse().id_token);
    this.setState({ idToken: googleUser.getAuthResponse().id_token });
  };

  refresh = () => {
    this.readDecks();
    this.readCards();
  };

  render = () => (
    <div className="App">
      <header className="App-header">
        <h1 className="App-title">Spaced Repetition</h1>
      </header>
      <div className="App-intro">
        {!this.state.idToken ? (
          <div className="g-signin2" data-theme="dark" data-onsuccess="signIn" />
        ) : this.state.cards.length ? (
          <Display
            back={() => this.setState({ cards: [] })}
            cards={this.state.cards}
            refresh={this.refresh}
            refreshCards={() => this.readCards()}
            createCard={this.createCard}
          />
        ) : (
          <DeckSelection
            decks={this.state.decks}
            createDeck={this.createDeck}
            getDeck={this.readCards}
          />
        )}
      </div>
    </div>
  );
}

export default App;
