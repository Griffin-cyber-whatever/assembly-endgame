import { KeyCap } from "./KeyCap.jsx";

export function Keyboard({ handleKeyClick, keycap_data }) {
  // Group keys by row
  const row1 = keycap_data.filter((key) => key.row === 1);
  const row2 = keycap_data.filter((key) => key.row === 2);
  const row3 = keycap_data.filter((key) => key.row === 3);

  return (
    <div className="flex flex-col items-center gap-2 p-4 max-w-2xl mx-auto">
      {/* First row */}
      <div className="flex gap-2">
        {row1.map((key) => (
          <KeyCap
            key={key.id}
            letter={key.letter}
            status={key.status}
            onClick={handleKeyClick}
          />
        ))}
      </div>

      {/* Second row */}
      <div className="flex gap-2">
        {row2.map((key) => (
          <KeyCap
            key={key.id}
            letter={key.letter}
            status={key.status}
            onClick={handleKeyClick}
          />
        ))}
      </div>

      {/* Third row */}
      <div className="flex gap-2">
        {row3.map((key) => (
          <KeyCap
            key={key.id}
            letter={key.letter}
            status={key.status}
            onClick={handleKeyClick}
          />
        ))}
      </div>
    </div>
  );
}
