import React from "react";

const WORD_LENGTH = 5;

function Lines({ guess, isFinal, solution }) {
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];
    let className = "tiles";
    if (isFinal) {
      if (char === solution[i]) {
        className += " correct";
      } else if (solution.includes(char)) {
        className += " close";
      } else {
        className += " incorrect";
      }
    }
    tiles.push(<div className={className}>{char}</div>);
  }

  return <div className="lines">{tiles}</div>;
}

export default Lines;
