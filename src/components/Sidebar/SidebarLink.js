import React from 'react';
import { Link } from 'react-router-dom';

const SidebarLink = ({ text, Icon, path }) => {
  return (
    <div className="sidebar__linkWrap">
      <Link to={path} className="sidebar__link">
        <Icon className="sidebar__linkIcon" />
        <span className="sidebar__linkText">{text}</span>
      </Link>
    </div>
  );
};

export default SidebarLink;
