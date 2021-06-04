import React, { useState } from "react";

import FlashCard from "./FlashCard";

const Answer = (props) => {
  console.log(props);
  let [questionIndex, setQuestionIndex] = useState(0);

  const incrementIndex = () => setQuestionIndex((prev) => (prev += 1));

  const currentQuestion = props.questions[questionIndex];

  if (!currentQuestion) {
    return <p>Another question?</p>;
  }

  return (
    <FlashCard
      question={currentQuestion.question}
      answer={currentQuestion.answer}
      incrementIndex={incrementIndex}
    />
  );
};

export default Answer;
