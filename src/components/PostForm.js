import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebase from "./config/config";
import logo from "../resources/logo.png";

const PostForm = () => {
    const { currentUser } = useContext(AuthContext);
    const [userName, setUserName] = useState(null);
    const [status, setStatus] = useState(false);
    const [image, setImage] = useState("");
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
        const post = e.target.post.value;
        try {
            if(currentUser) {
                firebase.database()
                    .ref()
                    .child("posts/"+currentUser.uid)
                    .push()
                    .then((snapshot) => {
                        if(image&&currentUser) {
                            firebase.storage().ref("images/posts/"+snapshot.key+"/"+image.name).put(image).then((result) => {
                                firebase.storage().ref("images/posts/"+snapshot.key+"/"+image.name).getDownloadURL().then((result) => {
                                    firebase.database().ref().child("posts/"+currentUser.uid+"/"+snapshot.key).set({
                                        userID: currentUser.uid,
                                        postID: snapshot.key,
                                        username: userName,
                                        time: new Date(Date.now()).toUTCString(),
                                        post: post,
                                        imageURL: result,
                                        likes: 1,
                                        dislikes: 0,
                                        usersList: [currentUser.uid]
                                    });
                                });
                            });
                        }
                        else if(currentUser) {
                            firebase.database().ref().child("posts/"+currentUser.uid+"/"+snapshot.key).set({
                                userID: currentUser.uid,
                                postID: snapshot.key,
                                username: userName,
                                time: new Date(Date.now()).toUTCString(),
                                post: post,
                                imageURL: 0,
                                profileURL: 0,
                                likes: 1,
                                dislikes: 0,
                                usersList: [currentUser.uid]
                            });
                        }
                    });
                setStatus(true);
            }
        } catch (error) {
            alert(error);
        }
    };
    useEffect(() => {
        try{
            if(currentUser){
                firebase.database().ref("users/"+currentUser.uid).on("value", (snapshot) => {
                    const result = snapshot.val();
                    if(result) {
                        setUserName(result.username);
                    }
                });
            }
        } catch(error){
            alert(error);
        }
    });
    if (!currentUser) {
        return <Redirect to="/login" />;
    }
    if(status){
        return <Redirect to="/dashboard" />;
    }
    return(
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
                <img alt="" src={logo}/>
            </center>
            <br/><br/>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <center>
                        <input onChange={handleChange} className="hidden" type="file" id="file" accept=".jpg,.jpeg,.jpe,.png,.tiff,.gif,.ico" name="file"/>
                        <br/><br/>
                        <textarea name="post" placeholder="Write a post here..." required/>
                        <br/><br/>
                        <label onClick={() => uploadedImage("upload")} id="upload" className="normal-box" style={{cursor: "pointer"}} for="file">
                            <b>
                                <i className="fa fa-image"/> UPLOAD IMAGE
                            </b>
                        </label>
                        <br/><br/>
                        <button className="button"><i className="fa fa-paper-plane"/> POST</button>
                    </center>
                </form>
            </div>
            <br/><br/>
        </>
    );
}

export default PostForm;