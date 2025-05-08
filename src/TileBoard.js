import React from 'react';
import './TileBoard.css';

function TileBoard({ guesses, currentInput, colors }) {
  const rows = 6;
  const columns = 5;
  const board = [];

  for (let row = 0; row < rows; row++) {
    let rowLetters = '';

    if (row < guesses.length) {
      rowLetters = guesses[row];
    } else if (row === guesses.length && currentInput) {
      rowLetters = currentInput;
    }

    // Pad each row to 5 characters
    rowLetters = rowLetters.padEnd(columns, ' ');
    board.push(rowLetters);
  }

  return (
    <div className="tile-board">
      {board.map((word, rowIdx) => (
        <div className="tile-row" key={rowIdx}>
          {word.split('').map((char, colIdx) => {
            const bgColor =
              rowIdx < guesses.length
                ? colors?.[rowIdx]?.[colIdx] || '#ccc'
                : 'white';

            return (
              <div
                className="tile"
                key={colIdx}
                style={{
                  backgroundColor: bgColor,
                  borderColor: bgColor !== 'white' ? bgColor : '#ccc',
                  color: bgColor !== 'white' ? 'white' : 'black',
                }}
              >
                {char}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default TileBoard;
