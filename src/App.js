import React, { useEffect, useState } from 'react';
import './App.css';
import TileBoard from './TileBoard';
import UserInput from './UserInput';
import logo from './logo.svg';

function App() {
  const [randomWord, setRandomWord] = useState('');
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState('');
  const [colors, setColors] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  // Load a random 5-letter word
  const getNewRandomWord = () => {
    fetch('/words.txt')
      .then((res) => res.text())
      .then((text) => {
        const words = text
          .split('\n')
          .map((w) => (w ? w.trim().toUpperCase() : ''))
          .filter((w) => w.length === 5);
        if (words.length > 0) {
          const randomIndex = Math.floor(Math.random() * words.length);
          setRandomWord(words[randomIndex]);
        } else {
          console.error('No valid words found.');
        }
      });
  };

  // Initial word load
  useEffect(() => {
    getNewRandomWord();
  }, []);

  // Restart everything
  const restartGame = () => {
    setGuesses([]);
    setColors([]);
    setInput('');
    setGameOver(false);
    setHasWon(false);
    getNewRandomWord();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Worlde Replica!</p>
      </header>

      {randomWord && (
        <>
          <TileBoard
            guesses={guesses}
            currentInput={input}
            colors={colors}
          />
          <UserInput
            targetWord={randomWord}
            guesses={guesses}
            setGuesses={setGuesses}
            input={input}
            setInput={setInput}
            colors={colors}
            setColors={setColors}
            setGameOver={setGameOver}
            setHasWon={setHasWon}
            gameOver={gameOver}
          />
        </>
      )}

      {gameOver && (
        <div style={{ marginTop: '20px' }}>
          <p>
            {hasWon ? "🎉 You guessed the word!" : "❌ You're out of tries."}  
          </p>
          <p>The word was: <strong>{randomWord}</strong></p>
          <button onClick={restartGame}>Play Again</button>
        </div>
      )}

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>Rules:</li>
          <li>Guess the word in 6 tries.</li>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>After each guess, the color of the tiles will change to show how close your guess was to the word.</li>
          <li>Green means correct letter and position.</li>
          <li>Yellow means correct letter but wrong position.</li>
          <li>Gray means letter not in the word.</li>
        </ul>
      </div>
  );
}

export default App;
