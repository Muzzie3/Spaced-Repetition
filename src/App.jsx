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
    cards: null,
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
        this.setState({ cards: JSON.parse(xhr.responseText).results });
      }
    });
    this.setState({ deck, cards: [] });
  };

  createCard = (front = "placeholder", back = "placeholder", deck = "placeholder") => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${window.location.origin}/api/createCard/${this.state.idToken}/${deck}/${front}/${back}`,
    );
    xhr.send();
    xhr.addEventListener("load", () => this.getDecks());
  };

  signIn = (googleUser) => {
    this.getDecks(googleUser.getAuthResponse().id_token);
    this.setState({ idToken: googleUser.getAuthResponse().id_token });
  };

  back = () => this.setState({ deck: null, cards: null });

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
            <DeckSelection
              decks={this.state.decks}
              createDeck={deck => this.createCard("placeholder", "placeholder", deck)}
              getDeck={deck => this.getCards(this.state.idToken, deck)}
            />
          ) : (
            <DeckDisplay back={this.back} cards={this.state.cards} />
          )}
        </div>
        <div />
      </div>
    </div>
  );
}

export default App;
