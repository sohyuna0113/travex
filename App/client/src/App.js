import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, clearUser } from './Reducer/userSlice';

import firebase from './firebase';

import './App.css';
import Heading from './Component/Heading';
import Upload from './Component/Post/Upload';
import Edit from './Component/Post/Edit';
import MainPage from './Component/MainPage';
import PostArea from './Component/Post/PostArea';

import Login from './Component/User/Login'
import Register from './Component/User/Register'
import MyPage from './Component/User/MyPage';

import TravMap from './Component/TravMap';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(userInfo => {
      if (userInfo !== null) {
        dispatch(loginUser(userInfo.multiFactor.user));
      } else {
        dispatch(clearUser());
      }
    });
  })

  return (
    <>
      <Heading />
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* Post, Reple */}
        <Route path="/upload" element={<Upload />}/>
        <Route path="/post/:postNum" element={<PostArea />} />
        <Route path="/edit/:postNum" element={<Edit />} />
        
        {/* User */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mypage" element={<MyPage />} />

        <Route path="/travMap" element={<TravMap />} />
      </Routes>
    </>
  );
}

export default App;
