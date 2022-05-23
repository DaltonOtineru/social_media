import React from 'react';
import avatar from '../../assets/avatar.jpeg';
import './Sidebar.scss';
import SidebarLinks from './SidebarLinks';
import { BsTwitter } from 'react-icons/bs';
import { BsThreeDots } from 'react-icons/bs';

const Sidebar = () => {
  return (
    <section className="sidebar">
      <div className="sidebar__logoWrap ">
        <BsTwitter className="sidebar__logo" />
      </div>
      <div className="sidebar__linksWrap">
        <SidebarLinks classname="sidebar__links" />
      </div>
      <button className="sidebar__button ">Tweet</button>
      <div className="sidebar__imgWrap ">
        <img src={avatar} alt="" className="sidebar__img " />
        {/* <BsTwitter className="sidebar__img" /> */}
        <div className="sidebar__userInfo">
          <h4 className="sidebar__username">Dalton Otineru</h4>
          <p className="sidebar__userHandle">@obey.giant</p>
        </div>
        <div className="sidebar__dotsWrap">
          <BsThreeDots className="sidebar__dots" />
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
