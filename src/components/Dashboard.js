import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import PostsList from "./PostsList";
import { AuthContext } from "./Auth";
import firebase from "./config/config";
import logo from "../resources/logo.png";

const Dashboard = () => {
  const { currentUser } = useContext(AuthContext);
  const [userName, setUserName] = useState(null);
  const [dashboardPosts, setDashboardPosts] = useState([]);
  const [render, setRender] = useState(0);
  useEffect(() => {
    try {
      if(currentUser) {
        firebase.database().ref("users/"+currentUser.uid).on("value", (snapshot) => {
          const result = snapshot.val();
          if(result) {
            setUserName(result.username);
          }
        });
        const list = [];
        firebase.database().ref().child("posts").on("value", (snapshot) => {
          snapshot.forEach((data) => {
            firebase.database().ref().child("posts/"+data.key).on("value", (snapshot) => {
              snapshot.forEach((dataChild) => {
                firebase.database().ref().child("posts/"+data.key+"/"+dataChild.key).on("value", (snapshot) => {
                  list.push(snapshot.val());
                });
              });
            });
          });
        });
        setDashboardPosts(list);
      }
    } catch(error) {
      alert(error);
    }
    setTimeout(() => {
      setRender(prev => prev + 1)
    }, 3000);
  },[render]);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <p align="right">
        <Link to="/dashboard/profile">
          <button className="button"><i className="fa fa-user"/> {userName}'s profile</button>
        </Link>
      </p>
      <p align="right">
        <Link to="/dashboard/postform">
          <button className="button"><i className="fa fa-edit"/> Make a Post</button>
        </Link>
      </p>
      <p align="right">
        <button className="button" onClick={() => firebase.auth().signOut()}><i className="fa fa-sign-out"/> Sign out</button>
      </p>
      <center>
        <img alt="" src={logo}/>
      </center>
      <br/><br/>
      <PostsList postItem={dashboardPosts}/>
      <br/><br/>
    </>
  );
};

export default Dashboard;