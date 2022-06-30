import React from "react";

function IntroPopup({ setOpenIntroPopup }) {
  return (
    <div className="intro_popup">
      <span
        style={{
          position: "absolute",
          right: "20px",
          top: "10px",
          fontSize: "25px",
        }}
        onClick={() => setOpenIntroPopup(false)}
      >
        X
      </span>
      <div className="popupText">
        Guess the WORDLE in six tries. Each guess must be a valid five-letter
        word. Hit the enter button to submit. After each guess, the color of the
        tiles will change to show how close your guess was to the word.
      </div>
    </div>
  );
}

export default IntroPopup;
