import React, { useState, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom';
import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS.js"
import { useSelector } from 'react-redux';

import ImageUpload from './ImageUpload.js';
import axios from 'axios';

function Upload(props) {
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [Image, setImage] = useState('');

    let navigate = useNavigate();
    const user = useSelector((state) => state.user)
  
    useEffect(() => {
        if(!user.accessToken) {
            alert('Login to upload a post');
            navigate('/login');
        }
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        if(Title === "" || Content === "") {
            return alert("Please fill in all fields");
        }

        let body = {
            title: Title,
            content: Content,
            image: Image,
            uid: user.uid,
        }

        axios
            .post("/api/post/submit", body)
            .then((response) => {
                if(response.data.success) {
                    alert("Post submitted successfully");
                    navigate("/");
                } else {
                    alert("Failed to submit post");
                }
            }).catch((error) => {
                console.log(error);
            })
        };

  return (
    <UploadDiv>
        <UploadForm>
            <lable htmlFor="label">Title</lable>
            <input
                id="title"
                type="text"
                value={Title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value);
                }}
            />
            <ImageUpload setImage={setImage} />
            <lable htmlFor="content">Content</lable>
            <textarea
                id="content"
                value={Content}
                onChange={(e) => {
                    setContent(e.currentTarget.value);
                }}
            />
            <UploadButtonDiv>
                <button
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                    >
                    제출
                </button>
            </UploadButtonDiv>
        </UploadForm>
    </UploadDiv>
  )
}

export default Upload