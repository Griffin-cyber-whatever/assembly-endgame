export function Input({ target, input }) {
  const renderBlocks = () => {
    const blocks = [];

    for (let i = 0; i < target.length; i++) {
      const letter = input[i];
      const shouldShowLetter = letter && letter !== "_";

      blocks.push(
        <div
          key={i}
          className="w-12 h-12 border-2 border-gray-400 rounded-lg flex items-center justify-center bg-white shadow-md font-mono font-bold text-lg text-gray-800"
        >
          {shouldShowLetter ? letter : ""}
        </div>
      );
    }

    return blocks;
  };

  return (
    <div className="flex justify-center gap-2 p-4 my-6">{renderBlocks()}</div>
  );
}
