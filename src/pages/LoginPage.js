import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Login from '../components/Login/Login';
import { selectUser } from '../redux/userSlice';
import Home from './Home';

const LoginPage = () => {
  return <Login />;
};

export default LoginPage;
