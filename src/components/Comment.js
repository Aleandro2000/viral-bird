import { useContext, useState, useEffect } from "react";
import firebase from "./config/config";
import { AuthContext } from "./Auth";
import ShowComments from "./ShowComments";

const Comment = (props) =>{
    const { currentUser } = useContext(AuthContext);
    const [comments, setComments] = useState([]);
    const [render, setRender] = useState(0);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const comment = e.target.comment.value;
        try {
            if(currentUser){
                firebase.database().ref("users/"+currentUser.uid).on("value", (snapshot) => {
                    const result = snapshot.val();
                    if(result) {    
                        firebase.database().ref("comments/"+props.postID).push().set({
                            username: result.username,
                            comment: comment
                        });
                    }
                });
            }
        } catch (error) {
            alert(error);
        }
    };
    useEffect(() => {
        try{
            if(currentUser){
                const list = [];
                firebase.database().ref("comments/"+props.postID).on("value", (snapshot) => {
                    snapshot.forEach((data) => {
                        firebase.database().ref().child("comments/"+props.postID+"/"+data.key).on("value", (snapshot) => {
                            list.push(snapshot.val());
                        });
                    });
                });
                setComments(list);
            }
        } catch(error){
            alert(error);
        }
        setTimeout(() => {
            setRender(prev => prev + 1)
        }, 3000);
    },[render]);
    return(
        <>
            <form onSubmit={handleSubmit}>
                <center>
                    <textarea name="comment" placeholder="Write a comment here..." required/>
                    <br/><br/>
                    <button className="button">POST</button>
                </center>
            </form>
            <ShowComments comments={comments}/>
        </>
    );
}

export default Comment;