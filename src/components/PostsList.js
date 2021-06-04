import { useContext } from "react";
import firebase from "./config/config";
import { AuthContext } from "./Auth";
import defaultProfile from "../resources/default-profile.jpg";
import Comment from "./Comment";

function PostsList(props){
  const { currentUser } = useContext(AuthContext);
  function likeSubmit(item) {
    if(!item.usersList.includes(currentUser.uid)) {
      firebase.database().ref("posts/"+item.userID+"/"+item.postID).update({
        likes: item.likes + 1,
        usersList: [...item.usersList,currentUser.uid]
      });
    }
  }
  function dislikeSubmit(item) {
    if(!item.usersList.includes(currentUser.uid)) {
      firebase.database().ref("posts/"+item.userID+"/"+item.postID).update({
        dislikes: item.dislikes + 1,
        usersList: [...item.usersList,currentUser.uid]
      });
    }
  }
  function getProfileURL(userID) {
    let result = 0;
    firebase.database().ref().child("users/"+userID).on("value", (snapshot) => {
      result = snapshot.val().imageURL;
    });
    return result;
  }
  function open(id)
  {
    if (document.getElementById(id).style.display==='block')
      document.getElementById(id).style.display='none';
    else
      document.getElementById(id).style.display='block';
  }
  const userPost = props.postItem.map((item) =>
    <>
      <br/><br/>
      <div className="content">
        { getProfileURL(item.userID) ? (<a href={getProfileURL(item.userID)}><img className="profile-image" src={getProfileURL(item.userID)}/></a>) : (<img className="profile-image" src={defaultProfile}/>)}
        <h2>
          {item.username}
        </h2>
        <h5>
          {item.time}
        </h5>
        <p>
          {item.post}
        </p>
        <center>
          { item.imageURL ? (<a href={item.imageURL}><img className="post-image" src={item.imageURL}/></a>) : (<></>)}
        </center>
        <h2 align="right">
          <button onClick={() => likeSubmit(item)} className="post-button"><i style={{color: "#0d9ed1"}} className="fa fa-thumbs-up">{item.likes}</i></button> <button onClick={() => dislikeSubmit(item)} className="post-button"><i style={{color: "red"}} className="fa fa-thumbs-down">{item.dislikes}</i></button> <button className="post-button" onClick={() => open(item.postID)}><i className="fa fa-comment"></i></button>
        </h2>
        <div className="hidden" id={item.postID}>
          <Comment postID={item.postID}/>
        </div>
      </div>
    </>
  );
  return(
    <>
      {userPost}
    </>
  );
}

export default PostsList;