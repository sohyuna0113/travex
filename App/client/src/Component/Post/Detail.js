import React from 'react'
import { Link } from 'react-router-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PostDiv, Post, BtnDiv } from '../../Style/PostDetailCSS.js'
import axios from 'axios'
import Avatar from 'react-avatar'

function Detail(props) {
    let params = useParams();
    const user = useSelector((state) => state.user)
    
    let navigate = useNavigate();

    const DeleteHandler = () => {
        if(window.confirm("Really want to delete?")) {
            let body = {
                postNum : params.postNum
            }
            axios
                .post("/api/post/delete", body)
                .then((response) => {
                    if(response.data.success) {
                        alert("Post deleted successfully")
                        navigate("/")
                    } else {
                        alert("Failed to delete post")
                    }
                })
                .catch((error) => {
                    alert("Failed to delete post")
                })
    }}

  return (
    <PostDiv>
            <Post>
                <h1>{props.PostInfo.title}</h1>
                <p className="author">
                    <Avatar 
                        size="40"
                        round={true}
                        src={props.PostInfo.author.photoURL}
                        style={{ border: "1px solid #c6c6c6" }} />
                    {props.PostInfo.author}
                </p>
                {props.PostInfo.image ? (
                    <img 
                        src={props.PostInfo.image} 
                        alt="" 
                        style={{ width: "100%", height: "auto" }} 
                    />
                ) : null}
                <p>{props.PostInfo.content}</p>
            </Post>
            {user.uid === props.PostInfo.author.uid && (
                <BtnDiv>
                    <Link to={`/edit/${props.PostInfo.postNum}`}>
                        <button className="edit">Edit</button>
                    </Link>
                    <button className="delete" onClick={() => DeleteHandler()}>Delete</button>
                </BtnDiv>
            )}
    </PostDiv>
  )
}

export default Detail
