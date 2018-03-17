import { combineReducers } from "redux";
import loggedIn from "./Login";
import viewDeck from "./View";
import loading from "./Loading";
import cards from "./Cards";
import decks from "./Decks";
import forceStudy from "./ForceStudy";
import currentDeck from "./CurrentDeck";

export default combineReducers({
  loggedIn,
  viewDeck,
  loading,
  cards,
  decks,
  forceStudy,
  currentDeck,
});

