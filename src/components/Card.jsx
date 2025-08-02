export function Card({ name, isAlive }) {
  const getColorClasses = (name, isAlive) => {
    const baseClasses = isAlive ? "" : "brightness-50"; // Make dead languages darker

    // Color mapping based on the image
    switch (name) {
      case "HTML":
        return `bg-orange-600 text-white ${baseClasses}`;
      case "CSS":
        return `bg-blue-500 text-white ${baseClasses}`;
      case "Javascript":
        return `bg-yellow-400 text-black ${baseClasses}`;
      case "React":
        return `bg-cyan-400 text-black ${baseClasses}`;
      case "Typescript":
        return `bg-blue-700 text-white ${baseClasses}`;
      case "Node.js":
        return `bg-green-600 text-white ${baseClasses}`;
      case "Python":
        return `bg-orange-500 text-white ${baseClasses}`;
      case "Ruby":
        return `bg-red-600 text-white ${baseClasses}`;
      case "Assembly":
        return `bg-blue-800 text-white ${baseClasses}`;
      default:
        return `bg-gray-500 text-white ${baseClasses}`;
    }
  };

  return (
    <div className="relative">
      {/* Bottom layer - original card */}
      <div
        className={`${getColorClasses(
          name,
          isAlive
        )} px-3 py-2 rounded font-mono font-bold text-sm inline-flex items-center justify-center`}
        style={{ minWidth: `${Math.max(name.length * 8 + 16, 60)}px` }}
      >
        {name}
      </div>

      {/* Top layer - skeleton overlay for dead languages */}
      {!isAlive && (
        <div className="absolute inset-0 rounded flex items-center justify-center">
          <div className="text-lg">💀</div>
        </div>
      )}
    </div>
  );
}
