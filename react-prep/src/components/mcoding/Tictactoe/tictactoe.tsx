import { useEffect, useState } from "react";


type Cell = "X" | "O" | null;

const TicTac = () => {
  const [matrix, setMatrix] = useState<Cell[]>(Array(9).fill(null));
  const [xTurn, setXTurn] = useState<boolean>(true);
  const [won, setWon] = useState<Cell>(null);

  const checkWinner = () => {
    const winPatterns: number[][] = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of winPatterns) {
      if (matrix[a] && matrix[a] === matrix[b] && matrix[b] === matrix[c]) {
        setWon(matrix[a]);
        return;
      }
    }
  };

  useEffect(() => {
    checkWinner();
  }, [matrix]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const pos = Number(target.id);

    if (isNaN(pos)) return;
    if (matrix[pos] || won) return;

    const newMatrix = [...matrix];
    newMatrix[pos] = xTurn ? "X" : "O";

    setMatrix(newMatrix);
    setXTurn((prev) => !prev);
  };

  const resetGame = () => {
    setMatrix(Array(9).fill(null));
    setXTurn(true);
    setWon(null);
  };

  return (
    <div className="main">
      <div className="board" onClick={handleClick}>
        {matrix.map((value, index) => (
          <div key={index} id={String(index)} className="box">
            {value}
          </div>
        ))}
      </div>

      <button onClick={resetGame}>Reset</button>

      {!won && <div>Player Turn: {xTurn ? "X" : "O"}</div>}
      {won && <div className="winner">🎉 Player {won} wins!</div>}
    </div>
  );
};

export default TicTac;
