import React from 'react';
import { Link } from 'react-router-dom';

import { CgHashtag, CgList } from 'react-icons/cg';

import { FiMail } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import { BsBookmark, BsPerson, BsBell } from 'react-icons/bs';

const SidebarLinks = () => {
  return (
    <>
      <Link className="sidebar__link hoverAnimation" to="/home">
        <AiFillHome className="sidebar__linkIcon" />
        <span className="sidebar__linkText">Home</span>
      </Link>
      <Link className="sidebar__link hoverAnimation" to="/home">
        <CgHashtag className="sidebar__linkIcon" />
        <span className="sidebar__linkText">Explore</span>
      </Link>
      <Link className="sidebar__link hoverAnimation" to="/home">
        <BsBell className="sidebar__linkIcon" />
        <span className="sidebar__linkText">Notifications</span>
      </Link>
      <Link className="sidebar__link hoverAnimation" to="/home">
        <FiMail className="sidebar__linkIcon" />
        <span className="sidebar__linkText">Messages</span>
      </Link>
      <Link className="sidebar__link hoverAnimation" to="/home">
        <BsBookmark className="sidebar__linkIcon" />
        <span className="sidebar__linkText">Bookmarks</span>
      </Link>
      <Link className="sidebar__link hoverAnimation" to="/home">
        <CgList className="sidebar__linkIcon" />
        <span className="sidebar__linkText">Lists</span>
      </Link>
      <Link className="sidebar__link hoverAnimation" to="/home">
        <BsPerson className="sidebar__linkIcon" />
        <span className="sidebar__linkText">Profile</span>
      </Link>
    </>
  );
};

export default SidebarLinks;
