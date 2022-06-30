import { useEffect, useState } from "react";
import "./App.css";
import IntroPopup from "./components/IntroPopup";
import Lines from "./components/Lines";
import getWords from "./data/words";

function App() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState(Array(6).fill(null));
  const [currentGuess, setCurrentGuess] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const [introPopup, setOpenIntroPopup] = useState(true);

  useEffect(() => {
    const words = getWords();
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setSolution(randomWord.toLowerCase());
  }, []);

  useEffect(() => {
    if (!introPopup) {
      const handleType = (e) => {
        if (isGameOver) return;

        if (e.key === "Enter") {
          // const isPresent = words.some(
          //   (item) => item === currentGuess.toUpperCase()
          // );
          // if (!isPresent) {
          //   return;
          // }

          const isCorrect = solution === currentGuess;
          if (currentGuess.length !== 5) {
            return;
          }
          const newGuesses = [...guesses];
          newGuesses[guesses.findIndex((val) => val === null)] = currentGuess;
          setGuesses(newGuesses);
          setCurrentGuess("");

          if (isCorrect) setIsGameOver(true);
        }
        if (e.key === "Backspace") {
          setCurrentGuess(currentGuess.slice(0, -1));
          return;
        }
        if (currentGuess.length >= 5) {
          return;
        }
        const isLetter = e.key.match(/^[a-zA-Z]{1}$/) != null;
        if (isLetter) {
          setCurrentGuess((oldGuess) => oldGuess + e.key.toLowerCase());
        }
      };

      window.addEventListener("keydown", handleType);

      return () => window.removeEventListener("keydown", handleType);
    }
  }, [currentGuess, guesses, isGameOver, solution, introPopup]);

  return (
    <>
      {introPopup && <IntroPopup setOpenIntroPopup={setOpenIntroPopup} />}
      <div className="board">
        {guesses.map((guess, i) => {
          const isCurrentGuess = i === guesses.findIndex((val) => val === null);
          return (
            <Lines
              key={i}
              guess={isCurrentGuess ? currentGuess : guess ?? ""}
              isFinal={!currentGuess && guess !== null}
              solution={solution}
            />
          );
        })}
      </div>
    </>
  );
}

export default App;
