import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase-config';
import { login } from '../../redux/userSlice';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginToApp = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
        setEmail('');
        setPassword('');
        navigate('/');
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <section className="login">
      <form className="login__form">
        <div className="login__formInner">
          <h3 className="login__header">Sign In</h3>
          <div className="login__formGroup__Inputs">
            <input
              required
              type="email"
              placeholder="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login__inputField login__email"
            />
            <input
              required
              type="password"
              placeholder="Password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login__inputField login__password"
            />
          </div>
          <div className="login__formGroup__btn">
            <button
              onClick={loginToApp}
              className={`${
                !email || !password ? 'login__btn__disabled' : 'login__btn'
              }`}
            >
              Submit
            </button>
            <p className="login__notUser">
              Don't have an account?
              <Link to="/register" className="login__link">
                <span className="login__signUp">Sign up</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Login;
