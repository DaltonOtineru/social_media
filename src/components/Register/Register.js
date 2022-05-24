import React, { useState } from 'react';
import './Register.scss';
import { useDispatch } from 'react-redux';
import { auth } from '../../firebase-config';
import { BsTwitter } from 'react-icons/bs';
import { login } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: name,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
              })
            );
            setName('');
            setEmail('');
            setPassword('');
            navigate('/');
          });
      })
      .catch((error) => console.log(error.message));
  };

  return (
    <section className="register">
      <form className="register__form">
        <div className="register__iconWrap">
          <BsTwitter className="register__icon" />
        </div>
        <div className="register__formInner">
          <h3 className="register__header">Join Today</h3>
          <div className="register__formGroup__Inputs">
            <input
              required
              type="name"
              placeholder="Full Name"
              defaultValue={name}
              onChange={(e) => setName(e.target.value)}
              className="register__inputField register__email"
            />
            <input
              required
              type="email"
              placeholder="Email"
              defaultValue={email}
              onChange={(e) => setEmail(e.target.value)}
              className="register__inputField register__email"
            />
            <input
              required
              type="password"
              placeholder="Password"
              defaultValue={password}
              onChange={(e) => setPassword(e.target.value)}
              className="register__inputField register__password"
            />
          </div>
          <div className="register__formGroup__btn">
            <button
              onClick={registerUser}
              className={`${
                !email || !password || !name
                  ? 'register__btn__disabled'
                  : 'register__btn'
              }`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Register;
