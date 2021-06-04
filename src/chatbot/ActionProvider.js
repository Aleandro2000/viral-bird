class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage("Hello friend!");
    this.addMessageToState(message);
  };

  handleoptions = () => {
    const message = this.createChatBotMessage(
      "Fantastic! Here is your answer.",
      {
        widget: "options",
      }
    );

    this.addMessageToState(message);
  };

  fine = () => {
    const message = this.createChatBotMessage("Fine!");
    this.addMessageToState(message);
  };

  presentation = () => {
    const message = this.createChatBotMessage("I am the Chatbot!");
    this.addMessageToState(message);
  };

  auth = () => {
    const message = this.createChatBotMessage("You may login or register using these forms!");
    this.addMessageToState(message);
  };

  description = () => {
    const message = this.createChatBotMessage("It is a social media paltform based on messages posts! This platform is the best opportunity to become popular thanks to a good post!");
    this.addMessageToState(message);
  };

  random1 = () => {
    const message = this.createChatBotMessage("Write clearly!");
    this.addMessageToState(message);
  };

  random2 = () => {
    const message = this.createChatBotMessage("I do not understand!");
    this.addMessageToState(message);
  };

  random3 = () => {
    const message = this.createChatBotMessage("Please rephrase!");
    this.addMessageToState(message);
  };

  random4 = () => {
    const message = this.createChatBotMessage("I try to process!");
    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
