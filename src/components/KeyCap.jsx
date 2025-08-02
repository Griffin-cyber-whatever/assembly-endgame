import { Button } from "./ui/button.jsx";

export function KeyCap({ letter, status, onClick }) {
  const getStatusClasses = (status) => {
    switch (status) {
      case "correct":
        return "bg-green-500 hover:bg-green-600 text-white";
      case "wrong":
        return "bg-red-500 hover:bg-red-600 text-white";
      case "unclicked":
      default:
        return "bg-yellow-500 hover:bg-yellow-600 text-white";
    }
  };

  return (
    <Button
      onClick={() => onClick(letter)}
      className={`${getStatusClasses(
        status
      )} font-bold text-lg w-12 h-12 rounded-lg shadow-md transition-all duration-150 hover:scale-105 active:scale-95`}
    >
      {letter}
    </Button>
  );
}
