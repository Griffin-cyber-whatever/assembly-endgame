import { Card } from "./Card.jsx";

export function Status({ status }) {
  return (
    <div className="flex flex-wrap gap-2 p-5 justify-center max-w-2xl mx-auto">
      {status.map((languageObj) => (
        <Card
          key={languageObj.id}
          name={languageObj.language}
          isAlive={languageObj.isAlive}
        />
      ))}
    </div>
  );
}
