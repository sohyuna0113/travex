import React, { useEffect, useState } from 'react'
import { useNavigate  } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ImageUpload from "./ImageUpload.js";

import { UploadDiv, UploadForm, UploadButtonDiv } from "../../Style/UploadCSS.js"

function Edit() {
    let params = useParams();
    let navigate = useNavigate();

    const [PostInfo, setPostInfo] = useState({});
    const [Flag, setFlag] = useState(false);
    const [Title, setTitle] = useState('');
    const [Content, setContent] = useState('');
    const [Image, setImage] = useState("");

    useEffect(() => {
        let body = {
            postNum : params.postNum
        }
        axios
            .post("/api/post/detail", body)
            .then((response) => {
                if(response.data.success) {
                    setPostInfo(response.data.post);
                    setFlag(true);
                }
            })
            .catch((error) => {
                console.log(error)
            })
    },[])

    useEffect(() => {
        setTitle(PostInfo.title)
        setContent(PostInfo.content)
        setImage(PostInfo.image)
    }, [PostInfo])

    const onSubmit = (e) => {
        e.preventDefault();

        if(Title === "" || Content === "") {
            return alert("Please fill in all fields");
        }

        let body = {
            title: Title,
            content: Content,
            postNum: params.postNum,
            image: Image,
        }

        axios
            .post('/api/post/edit', body)
            .then((response) => {
            if(response.data.success) {
                alert("Post submitted successfully");
                navigate(`/post/${params.postNum}`);
            } else {
                alert("Failed to submit post");
            }
        }).catch((error) => {
            console.log(error);
        })
    };

  return (
    <UploadDiv>
        {Flag && (
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
            <button className='cancel'
                    onClick={(e) => {
                        e.preventDefault();
                        navigate(-1);
                    }}
                    >
                    Cancel
                </button>
                <button
                    onClick={(e) => {
                        onSubmit(e);
                    }}
                    >
                    Submit
                </button>
            </UploadButtonDiv>
        </UploadForm>
        )}
    </UploadDiv>
  )
}

export default Edit