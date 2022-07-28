import React, { useState } from 'react'
import { LoginDiv } from '../../Style/UserCSS.js'

import firebase from '../../firebase.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [PW, setPW] = useState('')
    const [PWConfirm, setPWConfirm] = useState('')
    const [NameInfo, setNameInfo] = useState('')
    const [Flag, setFlag] = useState(false)
    const [NameCheck, setNameCheck] = useState(false)

    let navigate = useNavigate();

    const RegisterFunc = async (e) => {
        setFlag(true)
        e.preventDefault()
        if(!(Name && Email && PW && PWConfirm)) {
            return alert('Please fill in all the fields')
        }
        if(PW !== PWConfirm) {
            return alert('Passwords do not match')
        }
        if(!NameCheck) {
            return alert('Name already exists')
        }
        let createdUser = await firebase
            .auth()
            .createUserWithEmailAndPassword(Email, PW)

        await createdUser.user.updateProfile({
            displayName: Name,
            photoURL: 'https://kr.object.ncloudstorage.com/react-community-post/post/1658396052073.jpeg',
        })

        let body = {
            email : createdUser.user.multiFactor.user.email,
            displayName : createdUser.user.multiFactor.user.displayName,
            uid : createdUser.user.multiFactor.user.uid,
            photoURL: 
                'https://kr.object.ncloudstorage.com/react-community-post/post/1658396052073.jpeg',
        }
        axios.post('/api/user/register', body ).then((response) => {
            setFlag(false)
            if(response.data.success) {
                alert('Registered successfully')
                navigate('/login')
            } else {
                return alert('Something went wrong')
            }
        })
    }

    const NameCheckFunc = (e) => {
        e.preventDefault();
        if(!Name) {
            return alert('Please fill in your name')
        }
        let body = {
            displayName : Name,
        }
        axios.post('/api/user/namecheck').then((response) => {
            if(response.data.success) {
                if(response.data.check) {
                    setNameCheck(true)
                    setNameInfo('Name available')
                } else {
                    setNameInfo('Name already exists')
                }
            }
        })
    }

  return (
    <LoginDiv>
        <form>
            <label>Nickname</label>
                <input 
                    type="name"
                    value={Name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    disabled={NameCheck}
                    />
            {NameInfo}
            <button onClick={(e) => NameCheckFunc(e)}>Check for Availability</button>
            <label>Email</label>
                <input 
                    type="email" 
                    value={Email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    />
            <label>Password</label>
                <input 
                    type="password" 
                    value={PW}
                    minLength={8}
                    onChange={(e) => setPW(e.currentTarget.value)}
                    />
            <label>Re-Password</label>
                <input 
                    type="password" 
                    value={PWConfirm}
                    minLength={8}
                    onChange={(e) => setPWConfirm(e.currentTarget.value)}
                    />
            <button disabled={Flag} onClick={(e) => RegisterFunc(e)}>Join</button>
        </form>
    </LoginDiv>
  )
}

export default Register