import React from "react";
import { connect } from "react-redux";
import DeckSelection from "./DeckSelection";
import Display from "./Display";

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
      <header className="App-header">
        Spaced Repetition
        <a href="./guide.html" style={{ display: "block", color: "white", fontSize: "2rem" }}>Readme</a>
      </header>
      {props.loading ? (
        "Loading..."
      ) : !props.loggedIn ? (
        <div className="g-signin2" data-theme="dark" data-onsuccess="signIn" />
      ) : // Google signin button
          props.cards.length ? (
            <Display
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
