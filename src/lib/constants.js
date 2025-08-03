import { MAX_WORD_LENGTH, MIN_WORD_LENGTH} from "../App.jsx"

// Game state constants
const GAME = {
  UNFINISHED: "UNFINISHED",
  WIN: "WIN",
  LOSE: "LOSE",
};

// Language names array
const LANGUAGE_NAMES = [
  "HTML",
  "CSS",
  "Javascript",
  "React",
  "Typescript",
  "Node.js",
  "Python",
  "Ruby",
  "Assembly",
];

// Letter array for keyboard
const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

// Key status options
const KEY_STATUS = {
  UNCLICKED: "unclicked",
  CORRECT: "correct",
  WRONG: "wrong",
};

const initial_status = LANGUAGE_NAMES.map((language, index) => ({
  language,
  isAlive: true,
  id: index + 1,
}));

const keycap_data = LETTERS.map((letter, index) => ({
  letter,
  id: index + 1,
  row: index < 10 ? 1 : index < 20 ? 2 : 3,
  status: KEY_STATUS.UNCLICKED,
}));


// Function to generate a random word
function generateRandomWord() {
  const words = [

    "CODING",

    "PYTHON",

    "JAVASCRIPT",

    "REACT",

    "NODEJS",

    "GITHUB",

    "ARRAY",

    "OBJECT",

    "FUNCTION",

    "VARIABLE",

    "LOOP",

    "CLASS",

    "METHOD",

    "STRING",

    "NUMBER",

    "BOOLEAN",

    "ASYNC",

    "AWAIT",

    "IMPORT",

    "EXPORT",

    "MODULE",

    "COMPONENT",

    "PROPS",

    "STATE",

  ];

  const filteredWords = words.filter(
    (word) => word.length >= MIN_WORD_LENGTH && word.length <= MAX_WORD_LENGTH
  );

  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

export {
    generateRandomWord,
    keycap_data,
    initial_status,
    KEY_STATUS,
    LANGUAGE_NAMES,
    GAME
}