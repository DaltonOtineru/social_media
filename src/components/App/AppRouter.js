import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';

import { useRecoilState } from 'recoil';
import { postIdState, postPageState } from '../../atoms/modalAtom';
import PostPage from '../../pages/PostPage';
import RegisterPage from '../../pages/RegisterPage';
import LoginPage from '../../pages/LoginPage';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/userSlice';

const AppRouter = () => {
  const [postId, setPostId] = useRecoilState(postIdState);
  const [postPage, setPostPage] = useRecoilState(postPageState);
  const user = useSelector(selectUser);

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<LoginPage />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/register" element={<RegisterPage />} />
          <Route exact path={`/:${postId}`} element={<PostPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
