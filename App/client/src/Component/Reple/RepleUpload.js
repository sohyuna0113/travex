import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'

import { RepleUploadDiv } from '../../Style/RepleCSS.js'

function RepleUpload(props) {
    const [Reple, setReple] = useState('');
    const user = useSelector(state => state.user)

    const SubmitHandler = (e) => {
        e.preventDefault();

        if(!Reple) {
            return alert("Please write reply content")
        }
        let body = {
            reple: Reple,
            uid: user.uid,
            postId: props.postId
        }

        axios.post('/api/reple/submit', body).then((response) => {
            if (response.data.success) {
                alert("Successfully submitted")
                window.location.reload()
            } else {
                alert("Failed to submit")
            }
        })
    }

    return (
    <RepleUploadDiv>
        <form>
            <input 
            type="text" 
            value={Reple} 
            onChange={(e) => 
                setReple(e.currentTarget.value)} 
            />
            <button
            onClick={(e) => {
                SubmitHandler(e)
            }}
            >
            OK
        </button>
        </form>
    </RepleUploadDiv>

  )
}

export default RepleUpload