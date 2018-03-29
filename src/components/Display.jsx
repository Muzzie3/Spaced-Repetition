import React from "react";
import { connect } from "react-redux";
import CardDisplay from "./CardDisplay";
import DeckDisplay from "./DeckDisplay";

const mapStateToProps = ({
  viewDeck,
  forceStudy,
}) => ({
  viewDeck,
  forceStudy,
});

const Display = (props) => {
  const updateCard = (id, front, back, confidence, time) => {
    fetch(
      `api/updateCard/${id}/${front}/${back}/${confidence}/${time}`,
      { credentials: "same-origin", method: "PUT" },
    ).then(() => {
      props.getCards();
    });
  };
  const deleteCard = (id) => {
    fetch(
      `api/deleteCard/${id}`,
      { credentials: "same-origin", method: "DELETE" },
    ).then(() => {
      props.getAll();
    });
  };
  return (
    <div className="Display">
      <div>
        <button style={{ marginBottom: "40px" }} onClick={props.back}>Back</button> <br />
        <button onClick={() =>
          props.dispatch({ type: "CHANGE_VIEW" })
        }
        >
          {props.viewDeck ? "Study" : "View Deck"}
        </button>
      </div>
      {props.viewDeck ? (
        <DeckDisplay
          cards={props.cards}
          createCard={props.createCard}
          updateCard={updateCard}
          deleteCard={deleteCard}
        />
      ) : (<CardDisplay
        card={props.cards[0]}
        updateCard={updateCard}
        forceStudy={props.forceStudy}
        flipForceStudy={() => props.dispatch({ type: "TOGGLE_FORCE_STUDY" })}
      />)
      }
    </div>
  );
};

export default connect(mapStateToProps)(Display);
