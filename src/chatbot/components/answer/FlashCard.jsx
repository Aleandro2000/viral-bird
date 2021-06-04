import React, { useState, useEffect } from "react";

import "./Answer.css";

const FlashCard = ({ question, answer, incrementIndex }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => setShowAnswer(false), [question]);

  return (
    <>
      <div
        className="flashcard-container"
        onClick={() => setShowAnswer(!showAnswer)}
      >
        {!showAnswer && question}
        {showAnswer && answer}
      </div>
      {showAnswer && (
        <button onClick={incrementIndex} className="flashcard-button">
          SKIP
        </button>
      )}
    </>
  );
};

export default FlashCard;
