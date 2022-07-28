import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RepleContent from './RepleContent'

import { RepleListDiv, RepleContentDiv } from '../../Style/RepleCSS.js'

function RepleList(props) {
    const [RepleList, setRepleList] = useState([]);
    
    useEffect(() => {
        let body = {
            postId: props.postId,
        }
        axios.post('/api/reple/list', body).then((response) => {
            if(response.data.success) {
                setRepleList([...response.data.repleList])
            }
        });
    }, [])

  return (
    <RepleListDiv>
        {RepleList.map((reple, idx) => {
            return <RepleContent reple={reple} key={idx} />
        })}
    </RepleListDiv>
  )
}

export default RepleList