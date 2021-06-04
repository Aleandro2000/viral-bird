import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import Options from "./components/Options/Options";
import Answer from "./components/answer/Answer";

const config = {
  botName: "Chatbot",
  initialMessages: [
    createChatBotMessage(`Hello! What is your question?`, {
      widget: "option",
    }),
  ],
  widgets: [
    {
      widgetName: "option",
      widgetFunc: (props) => <Options {...props} />,
    },
    {
      widgetName: "options",
      widgetFunc: (props) => <Answer {...props} />,
      props: {
        questions: [
          {
            question: "Click here to show answer!",
            answer:
              "It is a social media paltform based on messages posts!",
            id: 1,
          },
          {
            question: "Click here to show answer!",
            answer:
              "This platform is the best opportunity to become popular thanks to a good post!",
            id: 2,
          },
        ],
      },
    },
  ],
};

export default config;
