import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import { Input } from "./components/Input.jsx";
import { Keyboard } from "./components/Keyboard.jsx";
import { Status } from "./components/Status.jsx";
import "./App.css";
import {
    generateRandomWord,
    keycap_data,
    initial_status,
    KEY_STATUS,
    LANGUAGE_NAMES,
    GAME
} from "./lib/constants.js"

export const MAX_WORD_LENGTH = 8;
export const MIN_WORD_LENGTH = 5;

function App() {
  const [target, setTarget] = useState(() => generateRandomWord());
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(initial_status);
  const [keyboard, setKeyboard] = useState(keycap_data);
  const [isShaking, setIsShaking] = useState(false);

  // Initialize input with underscores when target changes
  useEffect(() => {
    setInput("_".repeat(target.length));
  }, [target]);

  const handleKeyClick = (letter) => {
    setKeyboard(
      keyboard.map((keycap) => {
        if (keycap.letter == letter) {
          const target_letter_number = countChar(target, letter);
          const input_letter_number = countChar(input, letter);
          // correct guess
          if (target_letter_number > input_letter_number) {
            const index = nthLetter(target, letter, input_letter_number + 1);
            setInput(input.slice(0, index) + letter + input.slice(index + 1));
            return { ...keycap, status: KEY_STATUS.CORRECT };
            // wrong guess
          } else if (keycap.status == KEY_STATUS.UNCLICKED) {
            eliminate_language();
            return { ...keycap, status: KEY_STATUS.WRONG };
          }
        }
        return keycap;
      })
    );
  };


  function eliminate_language() {
    for (const languageObj of status) {
      const language = languageObj.language;
      const isAlive = languageObj.isAlive;

      if (language == LANGUAGE_NAMES[8]) {
        // Assembly is the last language
        // App.jsx will handle it for us
        break;
      } else if (isAlive) {
        setStatus((prev) => {
          const newStatus = [...prev];
          newStatus[languageObj.id - 1] = { ...languageObj, isAlive: false };
          return newStatus;
        });
        break;
      }
    }
  }

  function countChar(str, char) {
    return str.split(char).length - 1;
  }

  function nthLetter(str, char, n) {
    let idx = -1;
    for (let i = 0; i < n; i++) {
      idx = str.indexOf(char, idx + 1);
      if (idx === -1) return -1;
    }
    return idx;
  }

  // Determine game state
  let game_state = GAME.UNFINISHED;
  let message = "";

  if (input == target) {
    game_state = GAME.WIN;
    message = "You win! Well done! 🎉";
  } else {
    for (const languageObj of status) {
      const language = languageObj.language;
      const isAlive = languageObj.isAlive;

      if (language == LANGUAGE_NAMES[8]) {
        // Assembly
        game_state = GAME.LOSE;
        message = "Game over! You lose! Better start learning Assembly 😭";
        break;
      }
      if (isAlive) {
        break;
      }
      message += language + " & ";
    }
  }

  function shake_the_screen() {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 500);
  }

  function restartGame() {
    const newTarget = generateRandomWord();
    setTarget(newTarget);
    setInput("_".repeat(newTarget.length));
    setStatus(initial_status);
    setKeyboard(keycap_data);
  }

  return (
    <div
      className={`min-h-screen w-full bg-gray-800 text-white ${
        isShaking ? "animate-pulse" : ""
      }`}
      style={{ backgroundColor: "#282726" }}
    >
      {game_state === GAME.WIN && (
        <Confetti recycle={false} numberOfPieces={200} />
      )}

      <style jsx global>{`
        body,
        html {
          margin: 0;
          padding: 0;
          background-color: #282726 !important;
          min-height: 100vh;
        }
        * {
          box-sizing: border-box;
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-5px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(5px);
          }
        }
        .shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      <div
        className={`flex flex-col items-center justify-center min-h-screen w-full p-8 ${
          isShaking ? "shake" : ""
        }`}
        style={{ backgroundColor: "#282726" }}
      >
        <h1 className="text-4xl font-bold text-white mb-4">
          Assembly: Endgame
        </h1>
        <h2 className="text-lg text-gray-300 mb-8 text-center max-w-md">
          Guess the word in under 8 attempts to keep the programming world safe
          from Assembly!
        </h2>

        {/* Message Display */}
        {message && game_state === GAME.WIN && (
          <div className="bg-green-500 text-white px-6 py-3 rounded-lg mb-6 font-bold">
            You win!
            <br />
            Well done! 🎉
          </div>
        )}

        {message && game_state === GAME.LOSE && (
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg mb-6 font-bold text-center">
            Game over!
            <br />
            You lose! Better start learning Assembly 😭
          </div>
        )}

        {message && game_state === GAME.UNFINISHED && message.trim() && (
          <div className="bg-purple-500 text-white px-6 py-3 rounded-lg mb-6 font-bold text-center">
            "Farewell {message.slice(0, -3)}" 💀
          </div>
        )}

        <Status status={status} />
        <Input target={target} input={input} />
        <Keyboard
          handleKeyClick={
            game_state !== GAME.UNFINISHED ? shake_the_screen : handleKeyClick
          }
          keycap_data={keyboard}
        />

        {game_state !== GAME.UNFINISHED && (
          <button
            onClick={() => {
              setTimeout(restartGame, 300);
            }}
            className={`bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg mt-6 text-lg ${
              isShaking ? game_state === GAME.WIN ? "ring-4 ring-green-500 ring-opacity-75": "ring-4 ring-red-500 ring-opacity-75" : ""
            }`}
          >
            New Game
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
