import React, { useEffect, useRef } from 'react';

function UserInput({
  targetWord,
  guesses,
  setGuesses,
  input,
  setInput,
  colors,
  setColors,
  setGameOver,
  setHasWon,
  gameOver,
}) {
  const focusRef = useRef(null);

  // Refocus on load and after game restarts
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  }, [gameOver]);

  // Refocus when clicking anywhere on the page
  useEffect(() => {
    const handleClick = () => {
      if (focusRef.current) {
        focusRef.current.focus();
      }
    };
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  const handleKeyDown = (e) => {
    if (gameOver) return;

    if (e.key === 'Backspace') {
      setInput((prev) => prev.slice(0, -1));
    } else if (e.key === 'Enter' && input.length === 5) {
      submitGuess();
    } else if (/^[a-zA-Z]$/.test(e.key) && input.length < 5) {
      setInput((prev) => prev + e.key.toUpperCase());
    }
  };

  const submitGuess = () => {
    const newGuesses = [...guesses, input];
    const result = Array(5).fill('gray');
    const wordArray = targetWord.split('');
    const guessArray = input.split('');
    const used = Array(5).fill(false);

    // First pass: green letters
    for (let i = 0; i < 5; i++) {
      if (guessArray[i] === wordArray[i]) {
        result[i] = 'green';
        used[i] = true;
      }
    }

    // Second pass: orange letters
    for (let i = 0; i < 5; i++) {
      if (result[i] === 'green') continue;
      for (let j = 0; j < 5; j++) {
        if (!used[j] && guessArray[i] === wordArray[j]) {
          result[i] = 'orange';
          used[j] = true;
          break;
        }
      }
    }

    setGuesses(newGuesses);
    setColors((prev) => [...prev, result]);
    setInput('');

    if (input === targetWord) {
      setHasWon(true);
      setGameOver(true);
    } else if (newGuesses.length >= 6) {
      setHasWon(false);
      setGameOver(true);
    }
  };

  return (
    <div
      ref={focusRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ outline: 'none' }}
    />
  );
}

export default UserInput;
