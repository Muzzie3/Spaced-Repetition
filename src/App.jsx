import React from "react";
import DeckSelection from "./DeckSelection";
import Display from "./Display";

class App extends React.Component {
  constructor() {
    super();
    window.signIn = googleUser => this.signIn(googleUser);
    // Hook into global scope cause I can't get the google signin button to work any other way
  }

  state = {
    idToken: "",
    loading: false,
    decks: [],
    cards: [],
    // The rendering logic uses the length of this.state.cards
    // 0 means empty means a deck is not currently selected
  };

  deck = "";
  // Is typically currently selected deck, can sometimes be outdated
  // Used only in readCards() and createCard(), which can only be called while this value is correct

  readDecks = () => {
    this.setState({ loading: true, decks: [] });
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${window.location.origin}/api/getDecks/${this.state.idToken}`);
    xhr.send();
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.setState({
          loading: false,
          decks: JSON.parse(xhr.responseText).results.map(obj => obj.deck),
        });
      }
    });
  };

  // The read methods get the data from the server, then update state with that data
  // NOT PURE FUNCTIONS: rely on current state

  readCards = () => {
    /*
      this.state.cards is an array of card objects in the currently selected deck
      front = front text
      back = back text
      confidence = how confident the user is in remembering this card
      time = the next time the user should study this card
      time is stored as seconds from the UNIX epoch, but JS measures in milliseconds
      so there's a lot of conversions dealing with that
    */
    this.setState({ loading: true, cards: [] });
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${window.location.origin}/api/getCards/${this.deck}/${this.state.idToken}`);
    xhr.send();
    xhr.addEventListener("load", () => {
      if (xhr.status === 200) {
        this.setState({
          loading: false,
          cards: JSON.parse(xhr.responseText).results.sort((a, b) => a.time - b.time),
          // this.state.cards is always sorted by time
          // as for why, read Display.jsx
        });
      }
    });
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
    xhr.addEventListener("load", this.readDecks);
  };

  // The create methods request the server to create data (duh)
  // They also reread the data from the server and update local state with it

  createCard = (front, back) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${window.location.origin}/api/createCard/${this.deck}/${front}/${back}/${
        this.state.idToken
      }`,
    );
    xhr.send();
    xhr.addEventListener("load", this.readCards);
  };

  signIn = (googleUser) => {
    this.setState({ idToken: googleUser.getAuthResponse().id_token });
    this.readDecks();
  };

  render = () => (
    <div className="App">
      <header className="App-header">Spaced Repetition</header>
      {this.state.loading ? (
        "Loading..."
      ) : !this.state.idToken ? (
        <div className="g-signin2" data-theme="dark" data-onsuccess="signIn" />
        // Google signin button
      ) :
      this.state.cards.length ? (
        <Display
          back={() => this.setState({ cards: [] })}
          cards={this.state.cards}
          rereadAll={() => {
            this.readDecks();
            this.readCards();
          }}
          rereadCards={this.readCards}
          createCard={this.createCard}
        />
        // Display: once the user selects a deck, this is shown
        // Most of the meat of this web app is in here
      ) : (
        <DeckSelection
          decks={this.state.decks}
          createDeck={this.createDeck}
          selectDeck={(deck) => {
            this.deck = deck;
            this.readCards();
          }}
        />
        // Deck selection: user can view all decks, create new decks, or select a deck
      )}
    </div>
  );
}

export default App;
