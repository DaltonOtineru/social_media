import React, { useState } from 'react';
import avatar from '../../assets/avatar.jpeg';
import './Sidebar.scss';
import SidebarLinks from './SidebarLinks';
import { BsTwitter, BsThreeDots } from 'react-icons/bs';
import { AiOutlineCheck } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const logoutOfApp = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/');
  };

  return (
    <section className="sidebar">
      <div className="sidebar__logoWrap ">
        <BsTwitter className="sidebar__logo" />
      </div>
      <div className="sidebar__linksWrap">
        <SidebarLinks classname="sidebar__links" />
      </div>
      <button className="sidebar__button ">Tweet</button>

      {user && (
        <div className="sidebar__imgWrap">
          <img
            src={user.photoUrl}
            alt=""
            className="sidebar__img"
            onClick={() => setShowPopup(!showPopup)}
          />
          <div
            className={`${
              showPopup ? 'sidebar__popup__active' : 'sidebar__popup'
            }`}
          >
            <div className="sidebar__popupInner">
              <div className="popup__userInfo">
                <img
                  src={user.photoUrl}
                  alt="user-photo"
                  className="sidebar__img"
                />
                <div className="popup__userDetails">
                  <h4 className="popup__username">{user.displayName}</h4>
                  <p className="popup__userHandle">{user.email}</p>
                </div>
                <AiOutlineCheck className="popup__check" />
              </div>
              <div className="popup__userActions">
                <button className="popup__otherAcct" onClick={logoutOfApp}>
                  Sign into another account
                </button>
                <button className="popup__logout" onClick={logoutOfApp}>
                  Log out {user.email}{' '}
                </button>
              </div>
            </div>
          </div>
          <div
            className="sidebar__userInfo"
            onClick={() => setShowPopup(!showPopup)}
          >
            <h4 className="sidebar__username">{user.displayName}</h4>
            <p className="sidebar__userHandle">{user.email}</p>
          </div>
          <div
            className="sidebar__dotsWrap"
            onClick={() => setShowPopup(!showPopup)}
          >
            <BsThreeDots className="sidebar__dots" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
