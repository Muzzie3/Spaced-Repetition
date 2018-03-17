import React from "react";
import { connect } from "react-redux";
import DeckSelection from "./DeckSelection";
import OldDisplay from "./Display";

/* class OldApp extends React.Component {
  constructor() {
    super();
    window.signIn = this.signIn;
    // Hook into global scope cause I can't get the google signin button to work any other way
  }

  state = {
    loggedIn: false,
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
    xhr.open("GET", `${window.location.origin}/api/getDecks`);
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
    / *
      this.state.cards is an array of card objects in the currently selected deck
      front = front text
      back = back text
      confidence = how confident the user is in remembering this card
      time = the next time the user should study this card
      time is stored as seconds from the UNIX epoch, but JS measures in milliseconds
      so there's a lot of conversions dealing with that
    * /
    this.setState({ loading: true, cards: [] });
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `${window.location.origin}/api/getCards/${this.deck}`);
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
      `${window.location.origin}/api/createCard/${deck}/Front/Back`,
    );
    xhr.send();
    xhr.addEventListener("load", this.readDecks);
  };

  // The create methods request the server to create data (duh)
  // They also reread the data from the server and update local state with it

  createCard = () => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${window.location.origin}/api/createCard/${this.deck}/Front/Back`,
    );
    xhr.send();
    xhr.addEventListener("load", this.readCards);
  };

  signIn = (googleUser) => {
    const xhr = new XMLHttpRequest();
    xhr.open(
      "POST",
      `${window.location.origin}/api/login/${googleUser.getAuthResponse().id_token}`,
    );
    xhr.send();
    xhr.addEventListener("load", this.readDecks);
    xhr.addEventListener("load", () => this.setState({ loggedIn: true }));
  };

  render = () => (
    <div className="App">
      <header className="App-header">Spaced Repetition</header>
      {this.state.loading ? (
        "Loading..."
      ) : !this.state.loggedIn ? (
        <div className="g-signin2" data-theme="dark" data-onsuccess="signIn" />
      ) : // Google signin button
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
          ) : (<DeckSelection
            decks={this.state.decks}
            createDeck={this.createDeck}
            selectDeck={(deck) => {
              this.deck = deck;
              this.readCards();
            }}
          />)
      }
    </div>
  );
}

export { OldApp }; */

const mapStateToProps = ({
  loggedIn,
  loading,
  decks,
  cards,
  currentDeck,
}) => ({
  loggedIn,
  loading,
  decks,
  cards,
  currentDeck,
});

const App = (props) => {
  const getDecks = () => {
    props.dispatch({ type: "LOADING" });
    fetch("api/getDecks", { credentials: "same-origin" })
      .then(resp => resp.json())
      .then((resp) => {
        props.dispatch({ type: "UPDATE_DECKS", payload: { decks: resp.results.map(obj => obj.deck) } });
        props.dispatch({ type: "READY" });
      });
  };
  const getCards = (deck = props.currentDeck) => {
    props.dispatch({ type: "LOADING" });
    props.dispatch({ type: "UPDATE_CARDS", payload: { cards: [] } });
    fetch(`api/getCards/${deck}`, { credentials: "same-origin" })
      .then(resp => resp.json())
      .then((resp) => {
        props.dispatch({ type: "UPDATE_CARDS", payload: { cards: resp.results.sort((a, b) => a.time - b.time) } });
        props.dispatch({ type: "READY" });
      });
  };
  const createCard = (deck = props.currentDeck) => {
    props.dispatch({ type: "LOADING" });
    fetch(`api/createCard/${deck}/Front/Back`, { credentials: "same-origin", method: "POST" })
      .then(getDecks)
      .then(getCards);
  };
  window.signIn = (googleUser) => {
    fetch(
      `api/login/${googleUser.getAuthResponse().id_token}`,
      { credentials: "same-origin", method: "POST" },
    ).then(() => {
      props.dispatch({ type: "LOGIN" });
      getDecks();
    });
  };
  return (
    <div className="App">
      <header className="App-header">Spaced Repetition</header>
      {props.loading ? (
        "Loading..."
      ) : !props.loggedIn ? (
        <div className="g-signin2" data-theme="dark" data-onsuccess="signIn" />
      ) : // Google signin button
          props.cards.length ? (
            <OldDisplay
              back={() => props.dispatch({ type: "UPDATE_CARDS", payload: { cards: [] } })}
              cards={props.cards}
              getAll={() => {
                getDecks();
                getCards();
              }}
              getCards={getCards}
              createCard={() => createCard()}
            />
          ) : (<DeckSelection
            decks={props.decks}
            createDeck={createCard}
            selectDeck={(newDeck) => {
              props.dispatch({ type: "SELECT_DECK", payload: { deckName: newDeck } });
              getCards(newDeck);
            }}
          />)
      }
    </div>);
};

export default connect(mapStateToProps)(App);
