import React, {useState} from "react";
import { Redirect, Link } from "react-router-dom";
import firebase from "./config/config";
import logo from "../resources/logo.png";

const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();    
    const { username, email, password } = e.target.elements;
    try {
      firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((data) => {
          firebase.database().ref().child("users/"+data.user.uid).set({
            username: username.value,
            imageURL: 0
          });
          setCurrentUser(data.user);
        });
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <>
      <p align="right">
        <Link to="/">
          <button className="button"><i className="fa fa-home"/> Home</button>
        </Link>
      </p>
      <p align="right">
        <Link to="/login">
          <button className="button"><i className="fa fa-sign-in"/> Log In</button>
        </Link>
      </p>
      <center className="card">
        <img alt="" src={logo}/>
        <h1>
          <span className="blue-text-box">VIRAL <span className="black-text-box">BIRD</span></span>
        </h1>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <br/>
          <input type="text" name="username" placeholder="Username" required />
          <br/><br/><br/>
          <input type="email" name="email" placeholder="Email" required />
          <br/><br/><br/>
          <input type="password" name="password" placeholder="Password" required />
          <br/><br/>
          <button className="button" type="submit"><i className="fa fa-plus"/> Sign Up</button>
        </form>
      </center>
    </>
  );
};

export default SignUp;