import React, { useContext, useEffect, useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { AuthContext } from "./Auth";
import PostsList from "./PostsList";
import firebase from "./config/config";
import defaultProfile from "../resources/default-profile.jpg";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [dashboardPosts, setDashboardPosts] = useState([]);
  const [render, setRender] = useState(0);
  const [image, setImage] = useState("");
  const [profile, setProfile] = useState(null);
  function uploadedImage(id) {
    const element = document.getElementById(id);
    element.style.backgroundColor = "green";
    element.innerHTML = "<b>UPLOADED</b>";
  }
  const handleChange = async (e) => {
    e.preventDefault();
    const fileName=document.getElementById('file').value.toLowerCase();
    if(e.target.files[0]&&(fileName.endsWith(".jpg")||fileName.endsWith(".jpe")||fileName.endsWith(".jpeg")||fileName.endsWith(".png")||fileName.endsWith(".tiff")||fileName.endsWith(".gif"))) {
      setImage(e.target.files[0]);
    }
    else
    {
      alert("Error to upload image!")
      return false;
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(currentUser) {
        firebase.storage().ref("images/profiles/"+currentUser.uid+"/"+image.name).put(image).then((result) => {
          firebase.storage().ref("images/profiles/"+currentUser.uid+"/"+image.name).getDownloadURL().then((result) => {
            firebase.database().ref().child("users/"+currentUser.uid).update({
              imageURL: result
            });
          });
        });
      }
    } catch(error) {
      alert(error);
    }
  };
  useEffect(() => {
    try {
      if(currentUser) {
        const list = [];
        firebase.database().ref().child("posts/"+currentUser.uid).on("value", (snapshot) => {
          snapshot.forEach((data) => {
            firebase.database().ref().child("posts/"+currentUser.uid+"/"+data.key).on("value", (snapshot) => {
              list.push(snapshot.val());
            });
          });
        });
        firebase.database().ref().child("users/"+currentUser.uid).on("value", (snapshot) => {
          setProfile(snapshot.val().imageURL);
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
        <Link to="/dashboard">
          <button className="button"><i className="fa fa-dashboard"/> Dashboard</button>
        </Link>
      </p>
      <p align="right">
        <button className="button" onClick={() => firebase.auth().signOut()}><i className="fa fa-sign-out"/> Sign out</button>
      </p>
      <center>
        { profile ? (<a href={profile}><img className="profile" alt="" src={profile}/></a>) : (<img className="profile" alt="" src={defaultProfile}/>) }
        <form style={{marginTop: "50px"}} onSubmit={handleSubmit}>
          <input onChange={handleChange} className="hidden" type="file" id="profile" name="profile" accept=".jpg,.jpeg,.jpe,.png,.tiff,.gif,.ico" required />
          <label onClick={() => uploadedImage("upload")} id="upload" className="normal-box" style={{cursor: "pointer"}} for="profile">
            <i className="fa fa-image"/> UPLOAD PROFILE PHOTO
          </label>
          <br/><br/>
          <button className="button"><i className="fa fa-edit"/> CHANGE</button>
        </form>
      </center>
      <PostsList style={{marginTop: "50px"}} postItem={dashboardPosts}/>
      <br/><br/>
    </>
  );
};

export default Profile;