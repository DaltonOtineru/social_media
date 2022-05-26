import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { useRecoilState } from 'recoil';
import { postIdState, postPageState } from '../../atoms/modalAtom';
import PostPage from '../../pages/PostPage';

const AppRouter = () => {
  const [postId, setPostId] = useRecoilState(postIdState);
  const [postPage, setPostPage] = useRecoilState(postPageState);

  console.log(postId);
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path={`/:${postId}`} element={<PostPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default AppRouter;
