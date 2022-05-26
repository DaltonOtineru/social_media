import React from 'react';
import { CgHashtag, CgList } from 'react-icons/cg';
import { FiMail } from 'react-icons/fi';
import { AiFillHome } from 'react-icons/ai';
import { BsBookmark, BsPerson, BsBell } from 'react-icons/bs';
import SidebarLink from './SidebarLink';

const SidebarLinks = () => {
  return (
    <>
      <SidebarLink text="Home" Icon={AiFillHome} path="/" active />
      <SidebarLink text="Explore" Icon={CgHashtag} path="/" />
      <SidebarLink text="Notifications" Icon={BsBell} path="/" />
      <SidebarLink text="Messages" Icon={FiMail} path="/" />
      <SidebarLink text="Bookmarks" Icon={BsBookmark} path="/" />
      <SidebarLink text="Lists" Icon={CgList} path="/" />
      <SidebarLink text="Profile" Icon={BsPerson} path="/" />
    </>
  );
};

export default SidebarLinks;
