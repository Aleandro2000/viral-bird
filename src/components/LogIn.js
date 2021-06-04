import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebase from "./config/config";
import logo from "../resources/logo.png";

const LogIn = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);
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
        <Link to="/signup">
          <button className="button"><i className="fa fa-plus"/> Sign Up</button>
        </Link>
      </p>
      <center className="card">
        <img alt="" src={logo}/>
        <h1>
          <span className="blue-text-box">VIRAL <span className="black-text-box">BIRD</span></span>
        </h1>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
          <br/>
          <input type="email" name="email" placeholder="Email" required />
          <br/><br/><br/>
          <input type="password" name="password" placeholder="Password" required />
          <br/><br/>
          <button className="button" type="submit"><i className="fa fa-sign-in"/> Login</button>
        </form>
      </center>
    </>
  );
};

export default LogIn;