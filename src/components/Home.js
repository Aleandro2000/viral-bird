import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Chatbot from "react-chatbot-kit";
import config from "../chatbot/config";
import ActionProvider from "../chatbot/ActionProvider";
import MessageParser from "../chatbot/MessageParser";

import { AuthContext } from "./Auth";
import logo from "../resources/logo.png";
import robot from "../resources/chat-icon.png"

const Home = () => {
  function open(id)
  {
    if (document.getElementById(id).style.display==='block')
      document.getElementById(id).style.display='none';
    else
      document.getElementById(id).style.display='block';
  }
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="card">
      <center>
        <img alt="" src={logo}/>
        <h1>
          <span className="blue-text-box">VIRAL <span className="black-text-box">BIRD</span></span>
        </h1>
        <h2>
          Join us today!
        </h2>
        {currentUser ? (
          <p>
            You are logged - <Link class="button" to="/dashboard">View Dashboard</Link>
          </p>
        ) : (
          <p>
            <Link class="button" to="/login"><i className="fa fa-sign-in"/> Log In</Link> <br/><br/> <Link class="button" to="/signup"><i className="fa fa-plus"/> Sign Up</Link> 
          </p>
        )}
        <div className="bot">
          <br/><br/><br/>
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      </center>
      <span className="chatbutton" onClick={()=>open('chatbot')}>
        <img alt="" src={robot} alt="" className="open-button"/>
        <span className="active"></span>
      </span>
      
      <div className="chat" id={'chatbot'}>
        <div style={{ maxWidth: "300px" }}>
          <span className="close-button" onClick={()=>open('chatbot')} style={{marginBottom: '-6px'}}>
            <b>
              &times;
            </b>
          </span>
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      </div>

    </div>
  );
};

export default Home;