import React, { useState, useEffect } from 'react'
import { Spinner } from "react-bootstrap"
import { SpinnerDiv } from "../../Style/PostDetailCSS.js"
import { useParams } from 'react-router-dom'

import Detail from './Detail';
import axios from 'axios'
import RepleArea from '../Reple/RepleArea'

function PostArea() {
    const [PostInfo, setPostInfo] = useState({});
    const [Flag, setFlag] = useState(false);

    let params = useParams();
    
    useEffect(() => {
        let body = {
            postNum : params.postNum
        }
        axios
            .post("/api/post/delete", body)
            .then((response) => {
                if(response.data.success) {
                    setPostInfo(response.data.post)
                    setFlag(true)
                }
            })
            .catch((error) => {
                alert("Failed to delete post")
            })
    })
  return (
    <div>
        {Flag ? (
            <>
                <Detail postInfo={PostInfo} />
                <RepleArea postId={PostInfo._id} />
            </>
        ) : (
            <SpinnerDiv>
                <Spinner animation="border" variant="status">
                    <span className='visually-hidden'>Loading</span>
                </Spinner>
            </SpinnerDiv>
        )}
    </div>
  )
}

export default PostArea