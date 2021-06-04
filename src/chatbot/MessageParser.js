class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    const lowercase = message.toLowerCase();

    let understood=false;

    if(lowercase.includes("good day")||lowercase.includes("good night")||lowercase.includes("nice night")||lowercase.includes("nice day")||lowercase.includes("good evening")||lowercase.includes("good afternoon")||lowercase.includes("good morning")||lowercase.includes("hey")||lowercase.includes("hello")||lowercase.includes("hi")||lowercase.includes("bonjour")||lowercase.includes("salut")||lowercase.includes("ciau")||lowercase.includes("ciao")||lowercase.includes("hallo")) {
      understood=true;
      this.actionProvider.greet();
    }

    if(lowercase.includes("who")&&lowercase.includes("are")&&lowercase.includes("you")){
      understood=true;
      this.actionProvider.presentation();
    }

    if(lowercase.includes("how")&&lowercase.includes("are")&&lowercase.includes("you")){
      understood=true;
      this.actionProvider.fine();
    }

    if(lowercase.includes("register")||lowercase.includes("login")||lowercase.includes("sign in")||lowercase.includes("sign up")) {
      understood=true;
      this.actionProvider.auth();
    }

    if(lowercase.includes("viral")||lowercase.includes("bird")||lowercase.includes("what")) {
      understood=true;
      this.actionProvider.description();
    }
    
    if(!understood)
      switch(Math.round(Math.random())%4+1)
      {
        case 1:
          this.actionProvider.random1();
          break;
        case 2:
          this.actionProvider.random2();
          break;
        case 3:
          this.actionProvider.random3();
          break;
        case 4:
          this.actionProvider.random4();
          break;
        default:
          break;
      }
  }
}

export default MessageParser;
