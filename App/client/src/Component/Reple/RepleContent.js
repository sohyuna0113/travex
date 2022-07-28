import React, { useState, useEffect, useRef } from 'react'
import { RepleContentDiv, RepleUploadDiv } from '../../Style/RepleCSS'
import { useSelector } from 'react-redux'

import Avatar from 'react-avatar'
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/ko'

function RepleContent(props) {
    const [ModalFlag, setModalFlag] = useState(false);
    const [EditFlag, setEditFlag] = useState(false);
    const [Reple, setReple] = useState(props.reple.reple);

    const user = useSelector(state => state.user);
    const ref = useRef();
    useOnClickOutside(ref, () => setModalFlag(false))

    const SetTime = (a, b) => {
        if (a !== b) {
            return moment(b).format('YYYY-MM-DD HH:mm') + "(edited)";
        } else {
            return moment(a).format('YYYY-MM-DD HH:mm');
        }
    }

    const SubmitHandler = (e) => {
        e.preventDefault();
        let body = {
            uid: user.uid,
            reple: Reple,
            postId: props.reple.postId,
            repleId: props.reple._id,
        }

        axios.post('/api/reple/edit', body).then((response) => {
            if (response.data.success) {
                alert("Successfully edited")
            } else {
                alert("Failed to edit")
            }
            return window.location.reload()
        })
    }

    const DeleteHandler = (e) => {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this reple?")) {
            let body = { 
                repleId: props.reple._id,
                postId: props.reple.postId,
            }
            axios
                .post('/api/reple/delete', body)
                .then((response) => {
                    if (response.data.success) {
                        alert("Successfully deleted")
                        window.location.reload()
                    } else {
                        alert("Failed to delete")
                    }
                })
                .catch((error) => {
                    alert("Failed to delete")
                })
                
        } 
    }

    return (
        <RepleContentDiv>
          <div className='author'>
            <div className='userInfo'>
              <Avatar 
                  size="30"
                  round={true}
                  src={props.reple.author.photoURL}
                  style={{ border: "1px solid #c6c6c6" }} />
                  <p>{props.reple.author.displayName}</p>
            </div>
            {props.reple.author.uid === user.uid && (
              <div className='modalControl'>
                <span onClick={() => setModalFlag(true)}>···</span>
                 {ModalFlag && (
                    <div className='modalDiv' ref={ref}>
                      <p 
                        onClick={() => {
                          setEditFlag(true)
                          setModalFlag(false)
                        }}
                      >
                        Edit
                      </p>
                      <p className='delete' onClick={(e) => DeleteHandler(e)}>
                        Delete
                      </p>
                    </div>
                 )}
              </div>
            )}
          </div>
        {EditFlag ? (
            <RepleUploadDiv>
              <form>
                <input
                  type="text"
                  value={Reple}
                  onChange={(e) => {
                    setReple(e.currentTarget.value);
                  }}
                />
                <button
                  onClick={(e) => {
                    SubmitHandler(e);
                  }}
                >
                  Register
                </button>
              </form>
              <div className="cancel">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setEditFlag(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </RepleUploadDiv>
          ) : (
            <p>{props.reple.reple}</p>
          )}
        </RepleContentDiv>
    )
}

function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [ref, handler]);
  }

export default RepleContent;